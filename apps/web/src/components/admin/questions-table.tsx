'use client';

import { DataTableCard } from '@/components/admin/data-table-card';
import { DeleteButton } from '@/components/admin/delete-button';
import { EditLinkButton } from '@/components/admin/edit-link-button';
import { FilterSelect } from '@/components/admin/filter-select';
import { SearchInput } from '@/components/admin/search-input';
import { ToggleSwitch } from '@/components/admin/toggle-switch';
import { AccessBadge } from '@/components/common/access-badge';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { useSubjectOptions, useTopicOptions } from '@/hooks/use-admin-options';
import { useListQuery } from '@/hooks/use-list-query';
import { ACCESS_LEVEL_OPTIONS, DIFFICULTY_LABELS, DIFFICULTY_OPTIONS } from '@/lib/constants';
import { queryKeys } from '@/lib/query-keys';
import type { AdminQuestion } from '@/types/api';

const PUBLISHED_OPTIONS = [
  { value: 'true', label: 'Published' },
  { value: 'false', label: 'Unpublished' },
];

function QuestionRow({ question }: { question: AdminQuestion }) {
  const usage = question._count?.examQuestions ?? 0;
  return (
    <TableRow>
      <TableCell className="max-w-80">
        <p className="line-clamp-2 font-medium whitespace-normal">{question.text}</p>
        {usage > 0 && <p className="text-muted-foreground text-xs">Used in {usage} exam(s)</p>}
      </TableCell>
      <TableCell className="max-w-48">
        <p className="truncate">{question.subject.name}</p>
        {question.topic && (
          <p className="text-muted-foreground truncate text-xs">{question.topic.title}</p>
        )}
      </TableCell>
      <TableCell>
        <Badge variant="outline">{DIFFICULTY_LABELS[question.difficulty]}</Badge>
      </TableCell>
      <TableCell>
        <AccessBadge level={question.accessLevel} />
      </TableCell>
      <TableCell>
        <ToggleSwitch
          endpoint={`/admin/questions/${question.id}`}
          field="isPublished"
          checked={question.isPublished}
          label="Publish question"
          successMessage={(next) => (next ? 'Question published' : 'Question unpublished')}
        />
      </TableCell>
      <TableCell className="text-right whitespace-nowrap">
        <EditLinkButton href={`/admin/questions/${question.id}`} label="Edit question" />
        {usage === 0 && (
          <DeleteButton endpoint={`/admin/questions/${question.id}`} itemLabel="Question" />
        )}
      </TableCell>
    </TableRow>
  );
}

export function QuestionsTable() {
  const list = useListQuery<AdminQuestion>({
    endpoint: '/admin/questions',
    queryKey: queryKeys.admin.questions,
    dependents: { subjectId: ['topicId'] },
  });
  const subjectOptions = useSubjectOptions();
  const topics = useTopicOptions(list.filters.subjectId);
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <SearchInput
          value={list.search}
          onChange={list.setSearch}
          placeholder="Search question text…"
        />
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
        <FilterSelect
          value={list.filters.difficulty}
          onChange={list.setFilter('difficulty')}
          options={DIFFICULTY_OPTIONS}
          allLabel="Any difficulty"
          className="w-full sm:w-40"
        />
        <FilterSelect
          value={list.filters.accessLevel}
          onChange={list.setFilter('accessLevel')}
          options={ACCESS_LEVEL_OPTIONS}
          allLabel="Any access"
          className="w-full sm:w-36"
        />
        <FilterSelect
          value={list.filters.published}
          onChange={list.setFilter('published')}
          options={PUBLISHED_OPTIONS}
          allLabel="Any status"
          className="w-full sm:w-40"
        />
      </div>
      <DataTableCard
        query={list.query}
        onPageChange={list.setPage}
        emptyTitle="No questions found"
        emptyDescription="Create questions one by one or import a CSV file."
        columns={
          <>
            <TableHead>Question</TableHead>
            <TableHead>Subject / topic</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Access</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </>
        }
      >
        {list.query.data?.items.map((question) => (
          <QuestionRow key={question.id} question={question} />
        ))}
      </DataTableCard>
    </div>
  );
}
