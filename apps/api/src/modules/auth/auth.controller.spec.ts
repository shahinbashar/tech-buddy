import { durationToMs } from './auth.controller';

describe('durationToMs', () => {
  it('parses JWT-style durations', () => {
    expect(durationToMs('7d')).toBe(7 * 86_400_000);
    expect(durationToMs('12h')).toBe(12 * 3_600_000);
    expect(durationToMs('3600')).toBe(3_600_000);
  });

  it('rejects unsupported formats', () => {
    expect(() => durationToMs('1w')).toThrow('Unsupported duration');
  });
});
