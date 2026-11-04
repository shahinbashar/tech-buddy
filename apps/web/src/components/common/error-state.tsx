'use client';

import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { errorMessage } from '@/lib/api-error';

export function ErrorState({ error, onRetry }: { error: unknown; onRetry?: () => void }) {
  return (
    <div
      role="alert"
      className="border-destructive/30 bg-destructive/5 flex flex-col items-center rounded-xl border px-6 py-10 text-center"
    >
      <AlertTriangle className="text-destructive mb-2 size-8" aria-hidden />
      <h3 className="font-semibold">Couldn’t load this content</h3>
      <p className="text-muted-foreground mt-1 text-sm">{errorMessage(error)}</p>
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-4" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
