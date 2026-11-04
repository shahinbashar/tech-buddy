'use client';

import { Paperclip } from 'lucide-react';
import { DataTableCard } from '@/components/admin/data-table-card';
import { DeleteButton } from '@/components/admin/delete-button';
import { EditLinkButton } from '@/components/admin/edit-link-button';
import { FilterSelect } from '@/components/admin/filter-select';
import { SearchInput } from '@/components/admin/search-input';
import { ToggleSwitch } from '@/components/admin/toggle-switch';
import { AccessBadge } from '@/components/common/access-badge';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { useSubjectOptions, useTopicOptions } from '@/hooks/use-admin-options';
import { useListQuery } from '@/hooks/use-list-query';
import { formatDate } from '@/lib/format';
import { queryKeys } from '@/lib/query-keys';
import type { AdminNoteRow } from '@/types/api';

function NoteRow({ note }: { note: AdminNoteRow }) {
  return (
    <TableRow>
      <TableCell className="max-w-64">
        <p className="flex items-center gap-1.5 truncate font-medium">
          {note.title}
          {note._count.attachments > 0 && (
            <Paperclip className="text-muted-foreground size-3.5" aria-label="Has attachments" />
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
      <TableCell className="whitespace-nowrap">{formatDate(note.updatedAt)}</TableCell>
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
        <EditLinkButton href={`/admin/notes/${note.id}`} label={`Edit ${note.title}`} />
        <DeleteButton endpoint={`/admin/notes/${note.id}`} itemLabel="Note" />
      </TableCell>
    </TableRow>
  );
}

export function NotesTable() {
  const list = useListQuery<AdminNoteRow>({
    endpoint: '/admin/notes',
    queryKey: queryKeys.admin.notes,
    dependents: { subjectId: ['topicId'] },
  });
  const subjectOptions = useSubjectOptions();
  const topics = useTopicOptions(list.filters.subjectId);
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <SearchInput value={list.search} onChange={list.setSearch} placeholder="Search notes…" />
        <FilterSelect
          value={list.filters.subjectId}
          onChange={list.setFilter('subjectId')}
          options={subjectOptions}
          allLabel="All subjects"
        />
        {list.filters.subjectId && (
          <FilterSelect
            value={list.filters.topicId}
            onChange={list.setFilter('topicId')}
            options={topics.options}
            allLabel="All topics"
          />
        )}
      </div>
      <DataTableCard
        query={list.query}
        onPageChange={list.setPage}
        emptyTitle="No notes found"
        emptyDescription="Write your first note to publish study material."
        columns={
          <>
            <TableHead>Note</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead>Access</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </>
        }
      >
        {list.query.data?.items.map((note) => (
          <NoteRow key={note.id} note={note} />
        ))}
      </DataTableCard>
    </div>
  );
}
