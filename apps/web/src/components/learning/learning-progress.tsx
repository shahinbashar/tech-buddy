'use client';

import { useQuery } from '@tanstack/react-query';
import { BookCheck, BookOpen, ListTodo } from 'lucide-react';
import { useState } from 'react';
import { ErrorState } from '@/components/common/error-state';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { StatCard } from '@/components/common/stat-card';
import { SubjectProgressCard } from '@/components/learning/subject-progress-card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/query-keys';
import type { ProgressOverview } from '@/types/api';

type Filter = 'all' | 'pending' | 'completed';

export function LearningProgress() {
  const [filter, setFilter] = useState<Filter>('all');
  const { data, error, isPending, refetch } = useQuery({
    queryKey: queryKeys.progress,
    queryFn: () => api.get<ProgressOverview>('/progress/topics'),
  });

  if (isPending) return <ListSkeleton rows={4} />;
  if (error) return <ErrorState error={error} onRetry={() => void refetch()} />;

  const subjects = data.subjects
    .map((subject) => ({
      ...subject,
      topics: subject.topics.filter(
        (t) => filter === 'all' || (filter === 'completed' ? t.isCompleted : !t.isCompleted),
      ),
    }))
    .filter((subject) => subject.topics.length > 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total topics" value={data.totalTopics} icon={BookOpen} />
        <StatCard label="Completed" value={data.completedTopics} icon={BookCheck} tone="success" />
        <StatCard
          label="Pending"
          value={data.totalTopics - data.completedTopics}
          icon={ListTodo}
          tone="warning"
        />
      </div>
      <Tabs value={filter} onValueChange={(value) => setFilter(value as Filter)}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>
      {subjects.length ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {subjects.map((subject) => (
            <SubjectProgressCard key={subject.id} subject={subject} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">No topics in this view.</p>
      )}
    </div>
  );
}
