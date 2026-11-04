import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { compare, hash } from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';
import { paginate, toSkipTake } from '../../common/utils/pagination';
import { activeEntitlementWhere } from '../premium/premium-access';
import { PremiumAccessService } from '../premium/premium-access.service';
import { type ChangePasswordDto } from './dto/change-password.dto';
import { type ListUsersQueryDto } from './dto/list-users.dto';
import { type UpdateProfileDto } from './dto/update-profile.dto';

export const BCRYPT_ROUNDS = 12;

export const publicUserSelect = {
  id: true,
  email: true,
  fullName: true,
  phone: true,
  role: true,
  preparationGoal: true,
  isActive: true,
  lastLoginAt: true,
  createdAt: true,
} satisfies Prisma.UserSelect;

export type PublicUser = Prisma.UserGetPayload<{ select: typeof publicUserSelect }> & {
  hasPremium: boolean;
};

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly premiumAccess: PremiumAccessService,
  ) {}

  async getProfile(userId: string): Promise<PublicUser> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: publicUserSelect,
    });
    if (!user) throw new NotFoundException('User not found');
    return { ...user, hasPremium: await this.premiumAccess.hasPremiumAccess(user) };
  }

  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<PublicUser> {
    await this.prisma.user.update({ where: { id: userId }, data: dto });
    return this.getProfile(userId);
  }

  async changePassword(userId: string, dto: ChangePasswordDto): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    if (!(await compare(dto.currentPassword, user.passwordHash))) {
      throw new UnauthorizedException('Current password is incorrect');
    }
    if (dto.currentPassword === dto.newPassword) {
      throw new BadRequestException('New password must be different from the current password');
    }
    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash: await hash(dto.newPassword, BCRYPT_ROUNDS) },
    });
  }

  async list(query: ListUsersQueryDto) {
    const now = new Date();
    const where: Prisma.UserWhereInput = {
      ...(query.role ? { role: query.role } : {}),
      ...(query.search
        ? {
            OR: [
              { email: { contains: query.search, mode: 'insensitive' } },
              { fullName: { contains: query.search, mode: 'insensitive' } },
              { phone: { contains: query.search } },
            ],
          }
        : {}),
    };
    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        select: {
          ...publicUserSelect,
          _count: {
            select: {
              examAttempts: { where: { status: 'SUBMITTED' } },
              topicProgress: true,
              entitlements: { where: activeEntitlementWhere(now) },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        ...toSkipTake(query.page, query.pageSize),
      }),
      this.prisma.user.count({ where }),
    ]);
    const items = users.map(({ _count, ...user }) => ({
      ...user,
      hasPremium: user.role === 'ADMIN' || _count.entitlements > 0,
      examsTaken: _count.examAttempts,
      topicsCompleted: _count.topicProgress,
    }));
    return paginate(items, total, query.page, query.pageSize);
  }

  async setActive(actorId: string, userId: string, isActive: boolean): Promise<PublicUser> {
    if (actorId === userId)
      throw new BadRequestException('You cannot change your own account status');
    await this.prisma.user.update({ where: { id: userId }, data: { isActive } });
    return this.getProfile(userId);
  }
}
