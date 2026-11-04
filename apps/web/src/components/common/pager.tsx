'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PagerProps {
  page: number;
  totalPages: number;
  total?: number;
  onPageChange: (page: number) => void;
}

/** State-driven pagination for client-side tables. */
export function Pager({ page, totalPages, total, onPageChange }: PagerProps) {
  return (
    <div className="flex items-center justify-between gap-3 pt-2 text-sm">
      <span className="text-muted-foreground">
        {total !== undefined && `${total} item${total === 1 ? '' : 's'}`}
      </span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft />
        </Button>
        <span className="text-muted-foreground">
          {page} / {Math.max(1, totalPages)}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
