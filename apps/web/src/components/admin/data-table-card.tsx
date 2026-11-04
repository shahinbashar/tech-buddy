'use client';

import type { UseQueryResult } from '@tanstack/react-query';
import { EmptyState } from '@/components/common/empty-state';
import { ErrorState } from '@/components/common/error-state';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { Pager } from '@/components/common/pager';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableHeader, TableRow } from '@/components/ui/table';
import type { Paginated } from '@/types/api';

interface DataTableCardProps<T> {
  query: UseQueryResult<Paginated<T>>;
  /** <TableHead> cells. */
  columns: React.ReactNode;
  /** <TableRow>s built by the caller from `query.data.items`. */
  children: React.ReactNode;
  emptyTitle: string;
  emptyDescription?: string;
  onPageChange: (page: number) => void;
}

/** Standard admin list body: loading, error, empty and paginated table states. */
export function DataTableCard<T>({
  query,
  columns,
  children,
  emptyTitle,
  emptyDescription,
  onPageChange,
}: DataTableCardProps<T>) {
  if (query.isPending) return <ListSkeleton />;
  if (query.isError) return <ErrorState error={query.error} onRetry={() => void query.refetch()} />;
  if (query.data.items.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }
  const { meta } = query.data;
  return (
    <Card className="py-2" aria-busy={query.isFetching}>
      <CardContent className="px-2 sm:px-4">
        <Table>
          <TableHeader>
            <TableRow>{columns}</TableRow>
          </TableHeader>
          <TableBody>{children}</TableBody>
        </Table>
        <div className="px-2">
          <Pager
            page={meta.page}
            totalPages={meta.totalPages}
            total={meta.total}
            onPageChange={onPageChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
