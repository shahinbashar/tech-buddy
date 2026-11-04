import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';
import { type JwtPayload } from '../../common/types/auth-user';
import { UsersService, type PublicUser } from '../users/users.service';
import { type LoginDto } from './dto/login.dto';
import { type RegisterDto } from './dto/register.dto';

import { BCRYPT_ROUNDS } from '../users/users.service';

export interface AuthResult {
  user: PublicUser;
  accessToken: string;
}

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
        passwordHash: await hash(dto.password, BCRYPT_ROUNDS),
        role: 'USER',
        lastLoginAt: new Date(),
      },
    });
    return this.issue(user.id, user.role);
  }

  async login(dto: LoginDto): Promise<AuthResult> {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    // Same message for unknown email and wrong password to avoid account enumeration.
    const valid = user ? await compare(dto.password, user.passwordHash) : false;
    if (!user || !valid) throw new UnauthorizedException('Invalid email or password');
    if (!user.isActive) throw new UnauthorizedException('This account has been deactivated');

    await this.prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
    return this.issue(user.id, user.role);
  }

  private async issue(userId: string, role: JwtPayload['role']): Promise<AuthResult> {
    const payload: JwtPayload = { sub: userId, role };
    const [accessToken, user] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.usersService.getProfile(userId),
    ]);
    return { user, accessToken };
  }
}
