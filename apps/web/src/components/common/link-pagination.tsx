import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface LinkPaginationProps {
  page: number;
  totalPages: number;
  basePath: string;
  searchParams: Record<string, string | undefined>;
}

function hrefFor(
  basePath: string,
  searchParams: LinkPaginationProps['searchParams'],
  page: number,
) {
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(
    ([key, value]) => value && key !== 'page' && params.set(key, value),
  );
  if (page > 1) params.set('page', String(page));
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

/** URL-driven pagination for server-rendered lists. */
export function LinkPagination({ page, totalPages, basePath, searchParams }: LinkPaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <nav className="flex items-center justify-center gap-3 pt-4" aria-label="Pagination">
      <Button
        asChild
        variant="outline"
        size="sm"
        aria-disabled={page <= 1}
        className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
      >
        <Link href={hrefFor(basePath, searchParams, page - 1)}>
          <ChevronLeft /> Previous
        </Link>
      </Button>
      <span className="text-muted-foreground text-sm">
        Page {page} of {totalPages}
      </span>
      <Button
        asChild
        variant="outline"
        size="sm"
        aria-disabled={page >= totalPages}
        className={page >= totalPages ? 'pointer-events-none opacity-50' : ''}
      >
        <Link href={hrefFor(basePath, searchParams, page + 1)}>
          Next <ChevronRight />
        </Link>
      </Button>
    </nav>
  );
}
