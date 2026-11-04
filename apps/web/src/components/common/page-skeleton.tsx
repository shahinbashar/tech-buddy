import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

/** Route-level loading placeholder: header block plus a card grid. */
export function PageSkeleton({ cards = 6, className }: { cards?: number; className?: string }) {
  return (
    <div className={cn('space-y-6', className)} aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>
      <div className="space-y-2">
        <Skeleton className="h-8 w-64 max-w-full" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: cards }, (_, i) => (
          <Skeleton key={i} className="h-36 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
