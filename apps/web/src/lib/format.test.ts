import { describe, expect, it } from 'vitest';
import {
  deadlineInfo,
  formatClock,
  fromDhakaInputValue,
  toDhakaInputValue,
  todayInDhaka,
} from './format';

const now = new Date('2026-11-04T10:00:00Z');
const circular = (deadline: string, status: 'open' | 'upcoming' | 'closed' = 'open') => ({
  status,
  applicationStartDate: '2026-11-01T00:00:00Z',
  applicationDeadline: deadline,
});

describe('deadlineInfo', () => {
  it('flags circulars closing within a day as urgent', () => {
    expect(deadlineInfo(circular('2026-11-04T15:30:00Z'), now)).toEqual({
      label: 'Closes in 6h',
      tone: 'destructive',
    });
  });

  it('warns when three or fewer days remain', () => {
    expect(deadlineInfo(circular('2026-11-06T11:00:00Z'), now)).toEqual({
      label: '2 days left',
      tone: 'warning',
    });
  });

  it('shows remaining days for comfortable deadlines', () => {
    expect(deadlineInfo(circular('2026-11-20T11:00:00Z'), now).tone).toBe('success');
  });

  it('labels closed and upcoming circulars', () => {
    expect(deadlineInfo(circular('2026-11-01T11:00:00Z', 'closed'), now).label).toBe('Closed');
    expect(deadlineInfo(circular('2026-11-20T11:00:00Z', 'upcoming'), now).label).toMatch(/^Opens/);
  });
});

describe('Dhaka datetime inputs', () => {
  it('round-trips through datetime-local values', () => {
    expect(toDhakaInputValue('2026-11-30T11:00:00.000Z')).toBe('2026-11-30T17:00');
    expect(fromDhakaInputValue('2026-11-30T17:00')).toBe('2026-11-30T11:00:00.000Z');
  });

  it('computes the Dhaka calendar date', () => {
    expect(todayInDhaka(new Date('2026-11-04T19:00:00Z'))).toBe('2026-11-05');
  });
});

describe('formatClock', () => {
  it('formats countdowns', () => {
    expect(formatClock(1199)).toBe('19:59');
    expect(formatClock(3725)).toBe('1:02:05');
    expect(formatClock(-5)).toBe('00:00');
  });
});
