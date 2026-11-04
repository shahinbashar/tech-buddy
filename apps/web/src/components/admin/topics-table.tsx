'use client';

import { DataTableCard } from '@/components/admin/data-table-card';
import { DeleteButton } from '@/components/admin/delete-button';
import { EditLinkButton } from '@/components/admin/edit-link-button';
import { FilterSelect } from '@/components/admin/filter-select';
import { SearchInput } from '@/components/admin/search-input';
import { ToggleSwitch } from '@/components/admin/toggle-switch';
import { AccessBadge } from '@/components/common/access-badge';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { useSubjectOptions } from '@/hooks/use-admin-options';
import { useListQuery } from '@/hooks/use-list-query';
import { queryKeys } from '@/lib/query-keys';
import type { AdminTopicRow } from '@/types/api';

function TopicRow({ topic }: { topic: AdminTopicRow }) {
  return (
    <TableRow>
      <TableCell className="max-w-72">
        <p className="truncate font-medium">
          {topic.parent && <span className="text-muted-foreground">{topic.parent.title} › </span>}
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
        <EditLinkButton href={`/admin/topics/${topic.id}`} label={`Edit ${topic.title}`} />
        <DeleteButton
          endpoint={`/admin/topics/${topic.id}`}
          itemLabel="Topic"
          description="Its subtopics and notes will be deleted. Questions stay in the bank without a topic."
        />
      </TableCell>
    </TableRow>
  );
}

export function TopicsTable() {
  const subjectOptions = useSubjectOptions();
  const list = useListQuery<AdminTopicRow>({
    endpoint: '/admin/topics',
    queryKey: queryKeys.admin.topics,
  });
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <SearchInput value={list.search} onChange={list.setSearch} placeholder="Search topics…" />
        <FilterSelect
          value={list.filters.subjectId}
          onChange={list.setFilter('subjectId')}
          options={subjectOptions}
          allLabel="All subjects"
        />
      </div>
      <DataTableCard
        query={list.query}
        onPageChange={list.setPage}
        emptyTitle="No topics found"
        emptyDescription="Create a topic to start organising notes and questions."
        columns={
          <>
            <TableHead>Topic</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Access</TableHead>
            <TableHead className="text-right">Notes</TableHead>
            <TableHead className="text-right">Questions</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </>
        }
      >
        {list.query.data?.items.map((topic) => (
          <TopicRow key={topic.id} topic={topic} />
        ))}
      </DataTableCard>
    </div>
  );
}
