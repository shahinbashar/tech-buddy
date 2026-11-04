/** Answers arriving slightly after expiry (network latency) are still accepted. */
export const SUBMISSION_GRACE_MS = 15_000;

export function isWithinAttemptWindow(expiresAt: Date, now: number = Date.now()): boolean {
  return now <= expiresAt.getTime() + SUBMISSION_GRACE_MS;
}

/** Exams a given user may see or attempt: published and either public or their own practice set. */
export function examVisibleTo(userId: string) {
  return { isPublished: true, OR: [{ ownerId: null }, { ownerId: userId }] };
}

/** Public exams only (excludes private practice sets). */
export const PUBLIC_EXAM_WHERE = { isPublished: true, ownerId: null } as const;
