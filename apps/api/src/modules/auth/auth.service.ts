import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { type User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { type JwtPayload } from '../../common/types/auth-user';
import { type AppConfig } from '../../config/env.validation';
import { UsersService, type PublicUser } from '../users/users.service';
import { type ChangePasswordDto } from './dto/change-password.dto';
import { type LoginDto } from './dto/login.dto';
import { type RegisterDto } from './dto/register.dto';
import { hashPassword, verifyPassword } from './password';

export interface AuthResult {
  user: PublicUser;
  accessToken: string;
  /** Issued only for token-based (mobile) clients. */
  refreshToken?: string;
}

export interface IssueOptions {
  withRefreshToken?: boolean;
}

type TokenSubject = Pick<User, 'id' | 'role' | 'sessionVersion'>;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly config: ConfigService<AppConfig, true>,
  ) {}

  async register(dto: RegisterDto, options: IssueOptions = {}): Promise<AuthResult> {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: { id: true },
    });
    if (existing) throw new ConflictException('An account with this email already exists');

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        fullName: dto.fullName,
        phone: dto.phone,
        passwordHash: await hashPassword(dto.password),
        role: 'USER',
        lastLoginAt: new Date(),
      },
    });
    return this.issue(user, options);
  }

  async login(dto: LoginDto, options: IssueOptions = {}): Promise<AuthResult> {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    const valid = await verifyPassword(dto.password, user?.passwordHash);
    if (!user || !valid) throw new UnauthorizedException('Invalid email or password');
    if (!user.isActive) throw new UnauthorizedException('This account has been deactivated');

    await this.prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
    return this.issue(user, options);
  }

  /**
   * Exchanges a valid refresh token for a new access + refresh pair (rotation).
   * Fails if the token is invalid/expired, the account is inactive, or the session
   * was revoked (password change, deactivation).
   */
  async refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    let payload: JwtPayload;
    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken);
    } catch {
      throw new UnauthorizedException('Refresh token is invalid or expired');
    }
    if (payload.typ !== 'refresh') throw new UnauthorizedException('Not a refresh token');
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, role: true, sessionVersion: true, isActive: true },
    });
    if (!user?.isActive || user.sessionVersion !== payload.sv) {
      throw new UnauthorizedException('Session has ended. Please log in again.');
    }
    const { accessToken, refreshToken: next } = await this.signTokens(user, true);
    return { accessToken, refreshToken: next! };
  }

  /** Changes the password and revokes every other session; returns a fresh session for this one. */
  async changePassword(userId: string, dto: ChangePasswordDto): Promise<AuthResult> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    // 400, not 401: the session is valid, only the submitted field is wrong.
    if (!(await verifyPassword(dto.currentPassword, user.passwordHash))) {
      throw new BadRequestException('Current password is incorrect');
    }
    if (dto.currentPassword === dto.newPassword) {
      throw new BadRequestException('New password must be different from the current password');
    }
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash: await hashPassword(dto.newPassword), sessionVersion: { increment: 1 } },
    });
    return this.issue(updated);
  }

  private async issue(user: TokenSubject, options: IssueOptions = {}): Promise<AuthResult> {
    const [tokens, profile] = await Promise.all([
      this.signTokens(user, Boolean(options.withRefreshToken)),
      this.usersService.getProfile(user.id),
    ]);
    return { user: profile, ...tokens };
  }

  private async signTokens(user: TokenSubject, withRefreshToken: boolean) {
    const payload: JwtPayload = { sub: user.id, role: user.role, sv: user.sessionVersion };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = withRefreshToken
      ? await this.jwtService.signAsync({ ...payload, typ: 'refresh' } satisfies JwtPayload, {
          expiresIn: this.config.get('REFRESH_TOKEN_EXPIRES_IN', { infer: true }),
        })
      : undefined;
    return { accessToken, refreshToken };
  }
}
