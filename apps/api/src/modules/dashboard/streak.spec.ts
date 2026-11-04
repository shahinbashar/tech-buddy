import { currentStreak } from './streak';

const now = new Date('2026-11-04T10:00:00Z'); // 16:00 in Dhaka

describe('currentStreak', () => {
  it('counts consecutive days ending today', () => {
    const activity = ['2026-11-04T05:00:00Z', '2026-11-03T05:00:00Z', '2026-11-02T05:00:00Z'].map(
      (d) => new Date(d),
    );
    expect(currentStreak(activity, now)).toBe(3);
  });

  it('keeps a streak alive when the last activity was yesterday', () => {
    expect(currentStreak([new Date('2026-11-03T05:00:00Z')], now)).toBe(1);
  });

  it('is zero after a missed day', () => {
    expect(currentStreak([new Date('2026-11-02T05:00:00Z')], now)).toBe(0);
  });

  it('uses Dhaka calendar days, not UTC days', () => {
    // 2026-11-03T19:00Z is already 4 Nov in Dhaka.
    expect(currentStreak([new Date('2026-11-03T19:00:00Z')], now)).toBe(1);
    expect(
      currentStreak([new Date('2026-11-03T19:00:00Z'), new Date('2026-11-03T17:00:00Z')], now),
    ).toBe(2);
  });
});
