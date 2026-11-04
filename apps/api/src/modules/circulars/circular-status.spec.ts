import { circularStatus, daysUntilDeadline, isRunning } from './circular-status';

const now = new Date('2026-11-04T10:00:00Z');
const circular = (start: string, deadline: string, isPublished = true) => ({
  isPublished,
  applicationStartDate: new Date(start),
  applicationDeadline: new Date(deadline),
});

describe('circular status', () => {
  it('is open between start date and deadline', () => {
    const c = circular('2026-11-01T00:00:00Z', '2026-11-10T11:00:00Z');
    expect(circularStatus(c, now)).toBe('open');
    expect(isRunning(c, now)).toBe(true);
  });

  it('is upcoming (and still running) before applications open', () => {
    const c = circular('2026-11-06T00:00:00Z', '2026-11-20T11:00:00Z');
    expect(circularStatus(c, now)).toBe('upcoming');
    expect(isRunning(c, now)).toBe(true);
  });

  it('is closed (archived) once the deadline passes', () => {
    const c = circular('2026-10-01T00:00:00Z', '2026-11-04T09:59:59Z');
    expect(circularStatus(c, now)).toBe('closed');
    expect(isRunning(c, now)).toBe(false);
  });

  it('is a draft when unpublished, regardless of dates', () => {
    const c = circular('2026-11-01T00:00:00Z', '2026-11-10T11:00:00Z', false);
    expect(circularStatus(c, now)).toBe('draft');
    expect(isRunning(c, now)).toBe(false);
  });

  it('counts whole days until the deadline', () => {
    expect(daysUntilDeadline(new Date('2026-11-06T11:00:00Z'), now)).toBe(2);
    expect(daysUntilDeadline(new Date('2026-11-04T20:00:00Z'), now)).toBe(0);
  });
});
