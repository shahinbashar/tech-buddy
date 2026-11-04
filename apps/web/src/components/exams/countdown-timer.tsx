import { Timer } from 'lucide-react';
import { formatClock } from '@/lib/format';
import { cn } from '@/lib/utils';

export function CountdownTimer({ secondsLeft }: { secondsLeft: number }) {
  const urgent = secondsLeft <= 60;
  const warning = secondsLeft <= 300;
  return (
    <div
      role="timer"
      aria-live={urgent ? 'assertive' : 'off'}
      aria-label={`Time remaining ${formatClock(secondsLeft)}`}
      className={cn(
        'flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-lg font-semibold tabular-nums',
        urgent
          ? 'border-destructive bg-destructive/10 text-destructive animate-pulse'
          : warning
            ? 'border-warning bg-warning/15'
            : 'bg-card',
      )}
    >
      <Timer className="size-5" aria-hidden />
      {formatClock(secondsLeft)}
    </div>
  );
}
