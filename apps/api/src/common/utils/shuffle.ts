import { randomInt } from 'node:crypto';

/** Fisher–Yates shuffle returning a new array. Uses a CSPRNG so order is not predictable. */
export function shuffle<T>(items: readonly T[], random: (max: number) => number = randomInt): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = random(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
