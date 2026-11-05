/** Minimal iCalendar (RFC 5545) builder for circular deadline reminders. */

export interface DeadlineEvent {
  /** Stable id, so re-importing the file updates the event instead of duplicating it. */
  uid: string;
  title: string;
  description: string;
  url: string;
  /** ISO timestamp of the application deadline. */
  deadline: string;
}

const EVENT_MINUTES = 30;

/** 20261109T110000Z */
function icsDate(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
}

/** Escapes text values (RFC 5545 §3.3.11). */
function escapeText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/[,;]/g, (c) => `\\${c}`);
}

/**
 * A 30-minute event ending at the deadline, with reminders one day and two hours before —
 * enough time to finish an online application and pay the fee.
 */
export function buildDeadlineIcs(event: DeadlineEvent, now: Date = new Date()): string {
  const end = new Date(event.deadline);
  const start = new Date(end.getTime() - EVENT_MINUTES * 60_000);
  const alarm = (trigger: string) => [
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeText(`Deadline: ${event.title}`)}`,
    `TRIGGER:${trigger}`,
    'END:VALARM',
  ];
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tech Buddy//Circular deadlines//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${event.uid}`,
    `DTSTAMP:${icsDate(now)}`,
    `DTSTART:${icsDate(start)}`,
    `DTEND:${icsDate(end)}`,
    `SUMMARY:${escapeText(`Apply: ${event.title}`)}`,
    `DESCRIPTION:${escapeText(event.description)}`,
    `URL:${event.url}`,
    ...alarm('-P1D'),
    ...alarm('-PT2H'),
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}
