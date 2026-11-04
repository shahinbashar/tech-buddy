import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { type AuthUser } from '../../common/types/auth-user';
import { activeEntitlementWhere } from './premium-access';

/** Single source of truth for "can this caller see premium content?". */
@Injectable()
export class PremiumAccessService {
  constructor(private readonly prisma: PrismaService) {}

  async hasPremiumAccess(user: Pick<AuthUser, 'id' | 'role'> | undefined): Promise<boolean> {
    if (!user) return false;
    if (user.role === 'ADMIN') return true;
    const count = await this.prisma.premiumEntitlement.count({
      where: { userId: user.id, ...activeEntitlementWhere(new Date()) },
    });
    return count > 0;
  }
}
