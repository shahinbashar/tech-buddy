'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { DeleteButton } from '@/components/admin/delete-button';
import { FilterSelect } from '@/components/admin/filter-select';
import { SearchInput } from '@/components/admin/search-input';
import { ToggleSwitch } from '@/components/admin/toggle-switch';
import { DeadlineBadge } from '@/components/circulars/deadline-badge';
import { EmptyState } from '@/components/common/empty-state';
import { ErrorState } from '@/components/common/error-state';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { Pager } from '@/components/common/pager';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { api } from '@/lib/api';
import { CIRCULAR_CATEGORY_LABELS } from '@/lib/constants';
import { formatDateTime } from '@/lib/format';
import { queryKeys } from '@/lib/query-keys';
import type { CircularSummary, Paginated } from '@/types/api';

const STATUS_OPTIONS = [
  { value: 'running', label: 'Running' },
  { value: 'archived', label: 'Archived' },
];
const PUBLISHED_OPTIONS = [
  { value: 'true', label: 'Published' },
  { value: 'false', label: 'Unpublished' },
];
const CATEGORY_OPTIONS = Object.entries(CIRCULAR_CATEGORY_LABELS).map(([value, label]) => ({
  value,
  label,
}));

export function CircularsTable() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>();
  const [published, setPublished] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebouncedValue(search);
  const params = {
    search: debouncedSearch,
    status: status ?? 'all',
    published,
    category,
    page,
    pageSize: 15,
  };

  const { data, error, isPending, refetch } = useQuery({
    queryKey: queryKeys.admin.circulars(params),
    queryFn: () => api.get<Paginated<CircularSummary>>('/admin/circulars', params),
    placeholderData: keepPreviousData,
  });

  const resetPage =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      setPage(1);
    };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <SearchInput
          value={search}
          onChange={resetPage(setSearch)}
          placeholder="Search organization or title…"
        />
        <FilterSelect
          value={status}
          onChange={resetPage(setStatus)}
          options={STATUS_OPTIONS}
          allLabel="All statuses"
        />
        <FilterSelect
          value={published}
          onChange={resetPage(setPublished)}
          options={PUBLISHED_OPTIONS}
          allLabel="Any visibility"
        />
        <FilterSelect
          value={category}
          onChange={resetPage(setCategory)}
          options={CATEGORY_OPTIONS}
          allLabel="All categories"
        />
      </div>
      {isPending ? (
        <ListSkeleton />
      ) : error ? (
        <ErrorState error={error} onRetry={() => void refetch()} />
      ) : data.items.length === 0 ? (
        <EmptyState
          title="No circulars match"
          description="Adjust the filters or create a new circular."
        />
      ) : (
        <Card className="py-2">
          <CardContent className="px-2 sm:px-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Circular</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((circular) => (
                  <TableRow key={circular.id}>
                    <TableCell className="max-w-72">
                      <p className="truncate font-medium">{circular.title}</p>
                      <p className="text-muted-foreground truncate text-xs">
                        {circular.organizationName} · {CIRCULAR_CATEGORY_LABELS[circular.category]}
                      </p>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatDateTime(circular.applicationDeadline)}
                    </TableCell>
                    <TableCell>
                      <DeadlineBadge circular={circular} />
                    </TableCell>
                    <TableCell>
                      <ToggleSwitch
                        endpoint={`/admin/circulars/${circular.id}`}
                        field="isPublished"
                        checked={circular.isPublished}
                        label={`Publish ${circular.title}`}
                        successMessage={(next) =>
                          next ? 'Circular published' : 'Circular unpublished'
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <ToggleSwitch
                        endpoint={`/admin/circulars/${circular.id}`}
                        field="isFeatured"
                        checked={circular.isFeatured}
                        label={`Feature ${circular.title}`}
                        successMessage={(next) =>
                          next ? 'Marked as featured' : 'Removed from featured'
                        }
                      />
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        aria-label={`Edit ${circular.title}`}
                      >
                        <Link href={`/admin/circulars/${circular.id}`}>
                          <Pencil />
                        </Link>
                      </Button>
                      <DeleteButton
                        endpoint={`/admin/circulars/${circular.id}`}
                        itemLabel="Circular"
                        description="The circular and its attachments will be permanently deleted."
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="px-2">
              <Pager
                page={data.meta.page}
                totalPages={data.meta.totalPages}
                total={data.meta.total}
                onPageChange={setPage}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
