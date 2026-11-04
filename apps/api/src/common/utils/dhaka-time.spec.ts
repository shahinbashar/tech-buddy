import { dhakaDate, endOfDhakaDay, parseIsoDate, toIsoDate } from './dhaka-time';

describe('dhaka-time', () => {
  it('maps late UTC evening to the next Dhaka calendar day', () => {
    // 2026-11-04 19:00 UTC = 2026-11-05 01:00 in Dhaka
    expect(toIsoDate(dhakaDate(new Date('2026-11-04T19:00:00Z')))).toBe('2026-11-05');
    expect(toIsoDate(dhakaDate(new Date('2026-11-04T17:59:59Z')))).toBe('2026-11-04');
  });

  it('computes the end of the Dhaka day as 18:00 UTC', () => {
    expect(endOfDhakaDay(new Date('2026-11-04T10:00:00Z')).toISOString()).toBe(
      '2026-11-04T18:00:00.000Z',
    );
  });

  it('round-trips ISO dates', () => {
    expect(toIsoDate(parseIsoDate('2026-02-28'))).toBe('2026-02-28');
  });
});
