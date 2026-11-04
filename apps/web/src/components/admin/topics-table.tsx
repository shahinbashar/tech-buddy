'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { DeleteButton } from '@/components/admin/delete-button';
import { FilterSelect } from '@/components/admin/filter-select';
import { SearchInput } from '@/components/admin/search-input';
import { ToggleSwitch } from '@/components/admin/toggle-switch';
import { AccessBadge } from '@/components/common/access-badge';
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
import { useSubjectOptions } from '@/hooks/use-admin-options';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/query-keys';
import type { AdminTopicRow, Paginated } from '@/types/api';

export function TopicsTable() {
  const [search, setSearch] = useState('');
  const [subjectId, setSubjectId] = useState<string>();
  const [page, setPage] = useState(1);
  const subjectOptions = useSubjectOptions();
  const debouncedSearch = useDebouncedValue(search);
  const params = { search: debouncedSearch, subjectId, page, pageSize: 20 };

  const { data, error, isPending, refetch } = useQuery({
    queryKey: queryKeys.admin.topics(params),
    queryFn: () => api.get<Paginated<AdminTopicRow>>('/admin/topics', params),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <SearchInput
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          placeholder="Search topics…"
        />
        <FilterSelect
          value={subjectId}
          onChange={(value) => {
            setSubjectId(value);
            setPage(1);
          }}
          options={subjectOptions}
          allLabel="All subjects"
        />
      </div>
      {isPending ? (
        <ListSkeleton />
      ) : error ? (
        <ErrorState error={error} onRetry={() => void refetch()} />
      ) : data.items.length === 0 ? (
        <EmptyState
          title="No topics found"
          description="Create a topic to start organising notes and questions."
        />
      ) : (
        <Card className="py-2">
          <CardContent className="px-2 sm:px-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Topic</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Access</TableHead>
                  <TableHead className="text-right">Notes</TableHead>
                  <TableHead className="text-right">Questions</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((topic) => (
                  <TableRow key={topic.id}>
                    <TableCell className="max-w-72">
                      <p className="truncate font-medium">
                        {topic.parent && (
                          <span className="text-muted-foreground">{topic.parent.title} › </span>
                        )}
                        {topic.title}
                      </p>
                    </TableCell>
                    <TableCell>{topic.subject.name}</TableCell>
                    <TableCell>
                      <AccessBadge level={topic.accessLevel} />
                    </TableCell>
                    <TableCell className="text-right">{topic._count.notes}</TableCell>
                    <TableCell className="text-right">{topic._count.questions}</TableCell>
                    <TableCell>
                      <ToggleSwitch
                        endpoint={`/admin/topics/${topic.id}`}
                        field="isPublished"
                        checked={topic.isPublished}
                        label={`Publish ${topic.title}`}
                        successMessage={(next) => (next ? 'Topic published' : 'Topic unpublished')}
                      />
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        aria-label={`Edit ${topic.title}`}
                      >
                        <Link href={`/admin/topics/${topic.id}`}>
                          <Pencil />
                        </Link>
                      </Button>
                      <DeleteButton
                        endpoint={`/admin/topics/${topic.id}`}
                        itemLabel="Topic"
                        description="Its subtopics and notes will be deleted. Questions stay in the bank without a topic."
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
