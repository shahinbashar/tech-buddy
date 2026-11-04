import { DAY_MS } from '../../common/utils/time';

export type CircularStatus = 'draft' | 'upcoming' | 'open' | 'closed';

interface CircularDates {
  isPublished: boolean;
  applicationStartDate: Date;
  applicationDeadline: Date;
}

/** A circular is "running" when published and its deadline has not passed (upcoming + open). */
export function isRunning(circular: CircularDates, now: Date = new Date()): boolean {
  return circular.isPublished && circular.applicationDeadline >= now;
}

export function circularStatus(circular: CircularDates, now: Date = new Date()): CircularStatus {
  if (!circular.isPublished) return 'draft';
  if (circular.applicationDeadline < now) return 'closed';
  if (circular.applicationStartDate > now) return 'upcoming';
  return 'open';
}

/** Whole days remaining until the deadline (0 = closes within 24h); negative when closed. */
export function daysUntilDeadline(deadline: Date, now: Date = new Date()): number {
  return Math.floor((deadline.getTime() - now.getTime()) / DAY_MS);
}
