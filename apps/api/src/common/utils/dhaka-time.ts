/**
 * Business-day helpers. Bangladesh is UTC+6 with no DST, so a fixed offset is exact.
 */
const DHAKA_OFFSET_MS = 6 * 60 * 60 * 1000;

/** Returns the Asia/Dhaka calendar date of `instant` as a UTC-midnight Date (for @db.Date columns). */
export function dhakaDate(instant: Date = new Date()): Date {
  const shifted = new Date(instant.getTime() + DHAKA_OFFSET_MS);
  return new Date(Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate()));
}

/** Formats a @db.Date value as YYYY-MM-DD. */
export function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Parses YYYY-MM-DD into a UTC-midnight Date. */
export function parseIsoDate(value: string): Date {
  return new Date(`${value}T00:00:00.000Z`);
}

/** The instant at which the current Asia/Dhaka calendar day ends. */
export function endOfDhakaDay(instant: Date = new Date()): Date {
  return new Date(dhakaDate(instant).getTime() + 24 * 60 * 60 * 1000 - DHAKA_OFFSET_MS);
}
