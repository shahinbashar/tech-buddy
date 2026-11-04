import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { type User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { type JwtPayload } from '../../common/types/auth-user';
import { UsersService, type PublicUser } from '../users/users.service';
import { type ChangePasswordDto } from './dto/change-password.dto';
import { type LoginDto } from './dto/login.dto';
import { type RegisterDto } from './dto/register.dto';
import { hashPassword, verifyPassword } from './password';

export interface AuthResult {
  user: PublicUser;
  accessToken: string;
}

type TokenSubject = Pick<User, 'id' | 'role' | 'sessionVersion'>;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResult> {
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
    return this.issue(user);
  }

  async login(dto: LoginDto): Promise<AuthResult> {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    const valid = await verifyPassword(dto.password, user?.passwordHash);
    if (!user || !valid) throw new UnauthorizedException('Invalid email or password');
    if (!user.isActive) throw new UnauthorizedException('This account has been deactivated');

    await this.prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
    return this.issue(user);
  }

  /** Changes the password and revokes every other session; returns a fresh session for this one. */
  async changePassword(userId: string, dto: ChangePasswordDto): Promise<AuthResult> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    if (!(await verifyPassword(dto.currentPassword, user.passwordHash))) {
      throw new UnauthorizedException('Current password is incorrect');
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

  private async issue(user: TokenSubject): Promise<AuthResult> {
    const payload: JwtPayload = { sub: user.id, role: user.role, sv: user.sessionVersion };
    const [accessToken, profile] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.usersService.getProfile(user.id),
    ]);
    return { user: profile, accessToken };
  }
}
