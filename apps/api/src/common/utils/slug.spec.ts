import { findAvailableSlug, slugify } from './slug';

describe('slug helpers', () => {
  it('slugifies latin text and falls back for non-latin text', () => {
    expect(slugify('  De Morgan’s Theorem! ')).toBe('de-morgan-s-theorem');
    expect(slugify('বাংলা')).toMatch(/^[0-9a-f]{8}$/);
  });

  it('finds the first free suffix', async () => {
    const taken = new Set(['boolean-algebra', 'boolean-algebra-2']);
    await expect(
      findAvailableSlug('Boolean Algebra', (s) => Promise.resolve(taken.has(s))),
    ).resolves.toBe('boolean-algebra-3');
  });
});
