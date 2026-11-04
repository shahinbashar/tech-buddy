import { canAccess, entitlementStatus } from './premium-access';

const now = new Date('2026-11-04T10:00:00Z');

describe('entitlementStatus', () => {
  const base = { startsAt: new Date('2026-11-01T00:00:00Z'), expiresAt: null, revokedAt: null };

  it('is active within its window or without expiry', () => {
    expect(entitlementStatus(base, now)).toBe('active');
    expect(entitlementStatus({ ...base, expiresAt: new Date('2026-12-01T00:00:00Z') }, now)).toBe(
      'active',
    );
  });

  it('is expired, scheduled or revoked outside its window', () => {
    expect(entitlementStatus({ ...base, expiresAt: new Date('2026-11-04T09:00:00Z') }, now)).toBe(
      'expired',
    );
    expect(entitlementStatus({ ...base, startsAt: new Date('2026-11-05T00:00:00Z') }, now)).toBe(
      'scheduled',
    );
    expect(entitlementStatus({ ...base, revokedAt: new Date('2026-11-02T00:00:00Z') }, now)).toBe(
      'revoked',
    );
  });
});

describe('canAccess', () => {
  it('allows free content for everyone and premium content only with access', () => {
    expect(canAccess('FREE', false)).toBe(true);
    expect(canAccess('PREMIUM', false)).toBe(false);
    expect(canAccess('PREMIUM', true)).toBe(true);
  });
});
