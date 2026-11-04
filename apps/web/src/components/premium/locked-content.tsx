import { Crown, Lock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LockedContentProps {
  title?: string;
  description?: string;
  isSignedIn: boolean;
  className?: string;
}

export function LockedContent({
  title = 'Premium content',
  description = 'Unlock detailed notes, premium questions and exams with an affordable premium plan.',
  isSignedIn,
  className,
}: LockedContentProps) {
  return (
    <div
      className={cn(
        'border-premium/40 bg-premium/5 flex flex-col items-center rounded-xl border border-dashed px-6 py-8 text-center',
        className,
      )}
    >
      <span className="bg-premium/15 mb-3 flex size-11 items-center justify-center rounded-full text-[oklch(0.5_0.13_65)]">
        <Lock className="size-5" aria-hidden />
      </span>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-1 max-w-md text-sm">{description}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <Button asChild size="sm">
          <Link href="/premium">
            <Crown /> View premium plans
          </Link>
        </Button>
        {!isSignedIn && (
          <Button asChild size="sm" variant="outline">
            <Link href="/login">Log in</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
