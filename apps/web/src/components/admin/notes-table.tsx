'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Paperclip, Pencil } from 'lucide-react';
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
import { useSubjectOptions, useTopicOptions } from '@/hooks/use-admin-options';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/format';
import { queryKeys } from '@/lib/query-keys';
import type { AdminNoteRow, Paginated } from '@/types/api';

export function NotesTable() {
  const [search, setSearch] = useState('');
  const [subjectId, setSubjectId] = useState<string>();
  const [topicId, setTopicId] = useState<string>();
  const [page, setPage] = useState(1);
  const subjectOptions = useSubjectOptions();
  const topics = useTopicOptions(subjectId);
  const debouncedSearch = useDebouncedValue(search);
  const params = { search: debouncedSearch, subjectId, topicId, page, pageSize: 20 };

  const { data, error, isPending, refetch } = useQuery({
    queryKey: queryKeys.admin.notes(params),
    queryFn: () => api.get<Paginated<AdminNoteRow>>('/admin/notes', params),
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
          placeholder="Search notes…"
        />
        <FilterSelect
          value={subjectId}
          onChange={(value) => {
            setSubjectId(value);
            setTopicId(undefined);
            setPage(1);
          }}
          options={subjectOptions}
          allLabel="All subjects"
        />
        {subjectId && (
          <FilterSelect
            value={topicId}
            onChange={(value) => {
              setTopicId(value);
              setPage(1);
            }}
            options={topics.options}
            allLabel="All topics"
          />
        )}
      </div>
      {isPending ? (
        <ListSkeleton />
      ) : error ? (
        <ErrorState error={error} onRetry={() => void refetch()} />
      ) : data.items.length === 0 ? (
        <EmptyState
          title="No notes found"
          description="Write your first note to publish study material."
        />
      ) : (
        <Card className="py-2">
          <CardContent className="px-2 sm:px-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Note</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Access</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((note) => (
                  <TableRow key={note.id}>
                    <TableCell className="max-w-64">
                      <p className="flex items-center gap-1.5 truncate font-medium">
                        {note.title}
                        {note._count.attachments > 0 && (
                          <Paperclip
                            className="text-muted-foreground size-3.5"
                            aria-label="Has attachments"
                          />
                        )}
                      </p>
                    </TableCell>
                    <TableCell className="max-w-48">
                      <p className="truncate">{note.topic.title}</p>
                      <p className="text-muted-foreground text-xs">{note.topic.subject.name}</p>
                    </TableCell>
                    <TableCell>
                      <AccessBadge level={note.accessLevel} />
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatDate(note.updatedAt)}
                    </TableCell>
                    <TableCell>
                      <ToggleSwitch
                        endpoint={`/admin/notes/${note.id}`}
                        field="isPublished"
                        checked={note.isPublished}
                        label={`Publish ${note.title}`}
                        successMessage={(next) => (next ? 'Note published' : 'Note unpublished')}
                      />
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      <Button asChild variant="ghost" size="icon" aria-label={`Edit ${note.title}`}>
                        <Link href={`/admin/notes/${note.id}`}>
                          <Pencil />
                        </Link>
                      </Button>
                      <DeleteButton endpoint={`/admin/notes/${note.id}`} itemLabel="Note" />
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
