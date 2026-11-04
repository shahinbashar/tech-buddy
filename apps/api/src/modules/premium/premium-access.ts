import { type AccessLevel, Prisma } from '@prisma/client';

/** Prisma filter selecting entitlements that are active at `now`. */
export function activeEntitlementWhere(now: Date): Prisma.PremiumEntitlementWhereInput {
  return {
    revokedAt: null,
    startsAt: { lte: now },
    OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
  };
}

interface EntitlementWindow {
  startsAt: Date;
  expiresAt: Date | null;
  revokedAt: Date | null;
}

export type EntitlementStatus = 'active' | 'scheduled' | 'expired' | 'revoked';

export function entitlementStatus(
  entitlement: EntitlementWindow,
  now: Date = new Date(),
): EntitlementStatus {
  if (entitlement.revokedAt) return 'revoked';
  if (entitlement.startsAt > now) return 'scheduled';
  if (entitlement.expiresAt && entitlement.expiresAt <= now) return 'expired';
  return 'active';
}

/** True when content at `level` may be shown to a caller with `hasPremium`. */
export function canAccess(level: AccessLevel, hasPremium: boolean): boolean {
  return level === 'FREE' || hasPremium;
}
