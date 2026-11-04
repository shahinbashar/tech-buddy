'use client';

import { DataTableCard } from '@/components/admin/data-table-card';
import { DeleteButton } from '@/components/admin/delete-button';
import { EditLinkButton } from '@/components/admin/edit-link-button';
import { FilterSelect } from '@/components/admin/filter-select';
import { SearchInput } from '@/components/admin/search-input';
import { ToggleSwitch } from '@/components/admin/toggle-switch';
import { DeadlineBadge } from '@/components/circulars/deadline-badge';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { useListQuery } from '@/hooks/use-list-query';
import { CIRCULAR_CATEGORY_LABELS } from '@/lib/constants';
import { formatDateTime } from '@/lib/format';
import { queryKeys } from '@/lib/query-keys';
import type { CircularSummary } from '@/types/api';

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

function CircularRow({ circular }: { circular: CircularSummary }) {
  const endpoint = `/admin/circulars/${circular.id}`;
  return (
    <TableRow>
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
          endpoint={endpoint}
          field="isPublished"
          checked={circular.isPublished}
          label={`Publish ${circular.title}`}
          successMessage={(next) => (next ? 'Circular published' : 'Circular unpublished')}
        />
      </TableCell>
      <TableCell>
        <ToggleSwitch
          endpoint={endpoint}
          field="isFeatured"
          checked={circular.isFeatured}
          label={`Feature ${circular.title}`}
          successMessage={(next) => (next ? 'Marked as featured' : 'Removed from featured')}
        />
      </TableCell>
      <TableCell className="text-right whitespace-nowrap">
        <EditLinkButton href={endpoint} label={`Edit ${circular.title}`} />
        <DeleteButton
          endpoint={endpoint}
          itemLabel="Circular"
          description="The circular and its attachments will be permanently deleted."
        />
      </TableCell>
    </TableRow>
  );
}

export function CircularsTable() {
  const list = useListQuery<CircularSummary>({
    endpoint: '/admin/circulars',
    queryKey: queryKeys.admin.circulars,
    pageSize: 15,
  });
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <SearchInput
          value={list.search}
          onChange={list.setSearch}
          placeholder="Search organization or title…"
        />
        <FilterSelect
          value={list.filters.status}
          onChange={list.setFilter('status')}
          options={STATUS_OPTIONS}
          allLabel="All statuses"
        />
        <FilterSelect
          value={list.filters.published}
          onChange={list.setFilter('published')}
          options={PUBLISHED_OPTIONS}
          allLabel="Any visibility"
        />
        <FilterSelect
          value={list.filters.category}
          onChange={list.setFilter('category')}
          options={CATEGORY_OPTIONS}
          allLabel="All categories"
        />
      </div>
      <DataTableCard
        query={list.query}
        onPageChange={list.setPage}
        emptyTitle="No circulars match"
        emptyDescription="Adjust the filters or create a new circular."
        columns={
          <>
            <TableHead>Circular</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </>
        }
      >
        {list.query.data?.items.map((circular) => (
          <CircularRow key={circular.id} circular={circular} />
        ))}
      </DataTableCard>
    </div>
  );
}
