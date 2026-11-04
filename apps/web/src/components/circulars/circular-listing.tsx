import { BriefcaseBusiness } from 'lucide-react';
import { CircularCard } from '@/components/circulars/circular-card';
import { CircularFilters } from '@/components/circulars/circular-filters';
import { CircularStatusTabs } from '@/components/circulars/circular-status-tabs';
import { EmptyState } from '@/components/common/empty-state';
import { LinkPagination } from '@/components/common/link-pagination';
import { PageHeader } from '@/components/common/page-header';
import { serverApi } from '@/lib/api-server';
import { PAGE_SIZE } from '@/lib/constants';
import type { CircularStats, CircularSummary, Paginated } from '@/types/api';

export type CircularSearchParams = Record<string, string | undefined>;

interface CircularListingProps {
  status: 'running' | 'archived';
  basePath: string;
  searchParams: CircularSearchParams;
}

/** Shared server-rendered listing for /circulars, /circulars/running and /circulars/archived. */
export async function CircularListing({ status, basePath, searchParams }: CircularListingProps) {
  const page = Math.max(1, Number(searchParams.page) || 1);
  const [data, stats] = await Promise.all([
    serverApi<Paginated<CircularSummary>>('/circulars', {
      status,
      page,
      pageSize: PAGE_SIZE,
      search: searchParams.search,
      category: searchParams.category,
      deadline: status === 'running' ? searchParams.deadline : undefined,
    }),
    serverApi<CircularStats>('/circulars/summary'),
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
      <PageHeader
        title={status === 'running' ? 'Running job circulars' : 'Archived job circulars'}
        description={
          status === 'running'
            ? 'Circulars still accepting applications, closing soonest first.'
            : 'Circulars whose deadline has passed — useful for researching exam patterns.'
        }
        actions={<CircularStatusTabs active={status} counts={stats} />}
      />
      <CircularFilters showDeadline={status === 'running'} />
      {data.items.length ? (
        <>
          <p className="text-muted-foreground text-sm">
            Showing {data.items.length} of {data.meta.total} circular
            {data.meta.total === 1 ? '' : 's'}
          </p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.items.map((circular) => (
              <CircularCard key={circular.id} circular={circular} />
            ))}
          </div>
          <LinkPagination
            page={data.meta.page}
            totalPages={data.meta.totalPages}
            basePath={basePath}
            searchParams={searchParams}
          />
        </>
      ) : (
        <EmptyState
          icon={BriefcaseBusiness}
          title="No circulars found"
          description="Try a different search term or clear the filters."
        />
      )}
    </div>
  );
}
