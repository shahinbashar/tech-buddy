'use client';

import { useEffect, useState } from 'react';

/**
 * Seconds remaining until `expiresAt`, corrected for client clock drift using the
 * server time returned with the attempt.
 */
export function useCountdown(expiresAt: string, serverTime: string): number {
  const [offsetMs] = useState(() => new Date(serverTime).getTime() - Date.now());
  const compute = () =>
    Math.max(0, Math.floor((new Date(expiresAt).getTime() - (Date.now() + offsetMs)) / 1000));
  const [secondsLeft, setSecondsLeft] = useState(compute);

  useEffect(() => {
    const id = window.setInterval(() => setSecondsLeft(compute()), 1000);
    return () => window.clearInterval(id);
    // compute only depends on expiresAt and the fixed offset
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expiresAt]);

  return secondsLeft;
}
