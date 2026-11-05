import { describe, expect, it } from 'vitest';
import { buildDeadlineIcs } from './ics';

const event = {
  uid: 'circular-abc@techbuddy',
  title: 'Assistant Programmer, BCC',
  description: 'Apply online; pay the fee within 72 hours.\nBring your admit card.',
  url: 'https://techbuddy.example/circulars/assistant-programmer',
  deadline: '2026-11-09T11:00:00.000Z',
};

describe('buildDeadlineIcs', () => {
  const ics = buildDeadlineIcs(event, new Date('2026-11-05T00:00:00.000Z'));
  const lines = ics.split('\r\n');

  it('ends the event at the deadline and starts it 30 minutes earlier (UTC)', () => {
    expect(lines).toContain('DTEND:20261109T110000Z');
    expect(lines).toContain('DTSTART:20261109T103000Z');
    expect(lines).toContain('DTSTAMP:20261105T000000Z');
  });

  it('reminds a day and two hours before', () => {
    expect(lines).toContain('TRIGGER:-P1D');
    expect(lines).toContain('TRIGGER:-PT2H');
  });

  it('escapes commas, semicolons and newlines in text', () => {
    expect(lines).toContain('SUMMARY:Apply: Assistant Programmer\\, BCC');
    expect(lines).toContain(
      'DESCRIPTION:Apply online\\; pay the fee within 72 hours.\\nBring your admit card.',
    );
  });

  it('uses CRLF line endings and a stable UID', () => {
    expect(ics.startsWith('BEGIN:VCALENDAR\r\n')).toBe(true);
    expect(lines).toContain(`UID:${event.uid}`);
  });
});
