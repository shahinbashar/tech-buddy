import { dhakaDate } from '../../common/utils/dhaka-time';

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Consecutive Asia/Dhaka days with activity, ending today — or yesterday, so a streak
 * is not shown as broken before the candidate has had a chance to study today.
 */
export function currentStreak(activity: readonly Date[], now: Date = new Date()): number {
  const days = new Set(activity.map((instant) => dhakaDate(instant).getTime()));
  const today = dhakaDate(now).getTime();
  let cursor = days.has(today) ? today : today - DAY_MS;
  let streak = 0;
  while (days.has(cursor)) {
    streak++;
    cursor -= DAY_MS;
  }
  return streak;
}
