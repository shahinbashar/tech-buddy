import { displayName, rankAttempts, topPercent } from './leaderboard';

const row = (userId: string, obtainedMarks: number, timeSpentSeconds: number) => ({
  userId,
  fullName: userId,
  obtainedMarks,
  percentage: obtainedMarks * 5,
  timeSpentSeconds,
});

describe('leaderboard', () => {
  it('ranks by marks then time, sharing ranks on exact ties', () => {
    const ranked = rankAttempts([
      row('a', 18, 600),
      row('b', 18, 600),
      row('c', 18, 700),
      row('d', 10, 300),
    ]);
    expect(ranked.map((r) => r.rank)).toEqual([1, 1, 3, 4]);
  });

  it('abbreviates names for privacy', () => {
    expect(displayName('Rahim Uddin Ahmed')).toBe('Rahim A.');
    expect(displayName('Karim')).toBe('Karim');
  });

  it('computes the top percentage', () => {
    expect(topPercent(1, 200)).toBe(1);
    expect(topPercent(30, 200)).toBe(15);
    expect(topPercent(0, 0)).toBe(0);
  });
});
