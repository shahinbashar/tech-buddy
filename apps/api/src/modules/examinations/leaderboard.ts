export interface RankedAttempt {
  userId: string;
  fullName: string;
  obtainedMarks: number;
  percentage: number;
  timeSpentSeconds: number;
}

/** "Rahim Uddin" → "Rahim U." — enough to recognise yourself, without exposing full names. */
export function displayName(fullName: string): string {
  const [first, ...rest] = fullName.trim().split(/\s+/);
  const last = rest.at(-1);
  return last ? `${first} ${last[0].toUpperCase()}.` : first;
}

/**
 * Competition ranking ("1, 2, 2, 4") by marks desc, then time asc. Input must already be
 * sorted that way. Ties on both marks and time share a rank.
 */
export function rankAttempts<T extends RankedAttempt>(
  sorted: readonly T[],
): (T & { rank: number })[] {
  return sorted.map((attempt, index) => {
    let rank = index + 1;
    for (let i = index - 1; i >= 0; i--) {
      const prev = sorted[i];
      if (
        prev.obtainedMarks === attempt.obtainedMarks &&
        prev.timeSpentSeconds === attempt.timeSpentSeconds
      )
        rank = i + 1;
      else break;
    }
    return { ...attempt, rank };
  });
}

/** "Top N%": the share of participants at or above this rank, rounded up. */
export function topPercent(rank: number, total: number): number {
  return total ? Math.max(1, Math.ceil((rank / total) * 100)) : 0;
}
