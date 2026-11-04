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
import { Badge } from '@/components/ui/badge';
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
import { ACCESS_LEVEL_OPTIONS, DIFFICULTY_LABELS, DIFFICULTY_OPTIONS } from '@/lib/constants';
import { queryKeys } from '@/lib/query-keys';
import type { AdminQuestion, Paginated } from '@/types/api';

const PUBLISHED_OPTIONS = [
  { value: 'true', label: 'Published' },
  { value: 'false', label: 'Unpublished' },
];

export function QuestionsTable() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string | undefined>>({});
  const [page, setPage] = useState(1);
  const subjectOptions = useSubjectOptions();
  const topics = useTopicOptions(filters.subjectId);
  const debouncedSearch = useDebouncedValue(search);
  const params = { search: debouncedSearch, ...filters, page, pageSize: 20 };

  const { data, error, isPending, refetch } = useQuery({
    queryKey: queryKeys.admin.questions(params),
    queryFn: () => api.get<Paginated<AdminQuestion>>('/admin/questions', params),
    placeholderData: keepPreviousData,
  });

  const setFilter = (key: string) => (value: string | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key === 'subjectId' ? { topicId: undefined } : {}),
    }));
    setPage(1);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <SearchInput
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          placeholder="Search question text…"
        />
        <FilterSelect
          value={filters.subjectId}
          onChange={setFilter('subjectId')}
          options={subjectOptions}
          allLabel="All subjects"
        />
        {filters.subjectId && (
          <FilterSelect
            value={filters.topicId}
            onChange={setFilter('topicId')}
            options={topics.options}
            allLabel="All topics"
          />
        )}
        <FilterSelect
          value={filters.difficulty}
          onChange={setFilter('difficulty')}
          options={DIFFICULTY_OPTIONS}
          allLabel="Any difficulty"
          className="w-full sm:w-40"
        />
        <FilterSelect
          value={filters.accessLevel}
          onChange={setFilter('accessLevel')}
          options={ACCESS_LEVEL_OPTIONS}
          allLabel="Any access"
          className="w-full sm:w-36"
        />
        <FilterSelect
          value={filters.published}
          onChange={setFilter('published')}
          options={PUBLISHED_OPTIONS}
          allLabel="Any status"
          className="w-full sm:w-40"
        />
      </div>
      {isPending ? (
        <ListSkeleton />
      ) : error ? (
        <ErrorState error={error} onRetry={() => void refetch()} />
      ) : data.items.length === 0 ? (
        <EmptyState
          title="No questions found"
          description="Create questions one by one or import a CSV file."
        />
      ) : (
        <Card className="py-2">
          <CardContent className="px-2 sm:px-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Subject / topic</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Access</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell className="max-w-80">
                      <p className="line-clamp-2 font-medium whitespace-normal">{question.text}</p>
                      {!!question._count?.examQuestions && (
                        <p className="text-muted-foreground text-xs">
                          Used in {question._count.examQuestions} exam(s)
                        </p>
                      )}
                    </TableCell>
                    <TableCell className="max-w-48">
                      <p className="truncate">{question.subject.name}</p>
                      {question.topic && (
                        <p className="text-muted-foreground truncate text-xs">
                          {question.topic.title}
                        </p>
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
                        successMessage={(next) =>
                          next ? 'Question published' : 'Question unpublished'
                        }
                      />
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      <Button asChild variant="ghost" size="icon" aria-label="Edit question">
                        <Link href={`/admin/questions/${question.id}`}>
                          <Pencil />
                        </Link>
                      </Button>
                      <DeleteButton
                        endpoint={`/admin/questions/${question.id}`}
                        itemLabel="Question"
                        description="Questions used in exams cannot be deleted — unpublish them instead."
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
