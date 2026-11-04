/** Answers arriving slightly after expiry (network latency) are still accepted. */
export const SUBMISSION_GRACE_MS = 15_000;

export function isWithinAttemptWindow(expiresAt: Date, now: number = Date.now()): boolean {
  return now <= expiresAt.getTime() + SUBMISSION_GRACE_MS;
}
