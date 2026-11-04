import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { paginate, type Paginated, toSkipTake } from '../../common/utils/pagination';
import { type GrantEntitlementDto } from './dto/grant-entitlement.dto';
import { type ListEntitlementsQueryDto } from './dto/list-entitlements.dto';
import {
  activeEntitlementWhere,
  entitlementStatus,
  type EntitlementStatus,
} from './premium-access';

const DAY_MS = 24 * 60 * 60 * 1000;

const entitlementInclude = {
  plan: { select: { id: true, name: true, code: true } },
  user: { select: { id: true, fullName: true, email: true } },
  grantedBy: { select: { id: true, fullName: true } },
} satisfies Prisma.PremiumEntitlementInclude;

type EntitlementWithRelations = Prisma.PremiumEntitlementGetPayload<{
  include: typeof entitlementInclude;
}>;
export type EntitlementView = EntitlementWithRelations & { status: EntitlementStatus };

@Injectable()
export class PremiumService {
  constructor(private readonly prisma: PrismaService) {}

  listActivePlans() {
    return this.prisma.premiumPlan.findMany({
      where: { isActive: true },
      orderBy: { priceBdt: 'asc' },
    });
  }

  async getMyAccess(userId: string) {
    const now = new Date();
    const entitlements = await this.prisma.premiumEntitlement.findMany({
      where: { userId },
      include: entitlementInclude,
      orderBy: { createdAt: 'desc' },
    });
    const active = await this.prisma.premiumEntitlement.findFirst({
      where: { userId, ...activeEntitlementWhere(now) },
      // Lifetime (null) sorts last in DESC with NULLS FIRST, so pick explicitly.
      orderBy: { expiresAt: { sort: 'desc', nulls: 'first' } },
    });
    return {
      hasPremium: Boolean(active),
      activeUntil: active ? active.expiresAt : null,
      entitlements: entitlements.map((e) => this.toView(e, now)),
    };
  }

  async listEntitlements(query: ListEntitlementsQueryDto): Promise<Paginated<EntitlementView>> {
    const now = new Date();
    const where: Prisma.PremiumEntitlementWhereInput = {
      ...(query.userId ? { userId: query.userId } : {}),
      ...(query.search
        ? {
            user: {
              OR: [
                { email: { contains: query.search, mode: 'insensitive' } },
                { fullName: { contains: query.search, mode: 'insensitive' } },
              ],
            },
          }
        : {}),
      ...(query.status === 'active' ? activeEntitlementWhere(now) : {}),
      ...(query.status === 'inactive' ? { NOT: activeEntitlementWhere(now) } : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.premiumEntitlement.findMany({
        where,
        include: entitlementInclude,
        orderBy: { createdAt: 'desc' },
        ...toSkipTake(query.page, query.pageSize),
      }),
      this.prisma.premiumEntitlement.count({ where }),
    ]);
    return paginate(
      items.map((e) => this.toView(e, now)),
      total,
      query.page,
      query.pageSize,
    );
  }

  async grant(dto: GrantEntitlementDto, adminId: string): Promise<EntitlementView> {
    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
      select: { id: true },
    });
    if (!user) throw new NotFoundException('User not found');

    const startsAt = dto.startsAt ? new Date(dto.startsAt) : new Date();
    let expiresAt = dto.expiresAt ? new Date(dto.expiresAt) : null;

    if (dto.planId) {
      const plan = await this.prisma.premiumPlan.findUnique({ where: { id: dto.planId } });
      if (!plan) throw new NotFoundException('Plan not found');
      if (!expiresAt && plan.durationDays) {
        expiresAt = new Date(startsAt.getTime() + plan.durationDays * DAY_MS);
      }
    }
    if (expiresAt && expiresAt <= startsAt) {
      throw new BadRequestException('Expiry date must be after the start date');
    }

    const created = await this.prisma.premiumEntitlement.create({
      data: {
        userId: dto.userId,
        planId: dto.planId,
        startsAt,
        expiresAt,
        note: dto.note,
        source: 'ADMIN_GRANT',
        grantedById: adminId,
      },
      include: entitlementInclude,
    });
    return this.toView(created, new Date());
  }

  async revoke(id: string): Promise<EntitlementView> {
    const existing = await this.prisma.premiumEntitlement.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Entitlement not found');
    if (existing.revokedAt) throw new BadRequestException('Entitlement is already revoked');
    const updated = await this.prisma.premiumEntitlement.update({
      where: { id },
      data: { revokedAt: new Date() },
      include: entitlementInclude,
    });
    return this.toView(updated, new Date());
  }

  private toView(entitlement: EntitlementWithRelations, now: Date): EntitlementView {
    return { ...entitlement, status: entitlementStatus(entitlement, now) };
  }
}
