import { shuffle } from './shuffle';

describe('shuffle', () => {
  it('returns a permutation without mutating the input', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);
    expect(input).toEqual([1, 2, 3, 4, 5]);
    expect([...result].sort()).toEqual(input);
  });

  it('is deterministic with an injected random source', () => {
    expect(shuffle(['a', 'b', 'c', 'd'], () => 0)).toEqual(['b', 'c', 'd', 'a']);
  });

  it('places each element in each position roughly uniformly', () => {
    const runs = 20_000;
    const counts = [0, 0, 0, 0];
    for (let i = 0; i < runs; i++) counts[shuffle(['x', 'b', 'c', 'd']).indexOf('x')]++;
    for (const count of counts) {
      expect(count / runs).toBeGreaterThan(0.22);
      expect(count / runs).toBeLessThan(0.28);
    }
  });
});
