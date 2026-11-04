'use client';

import { useQuery } from '@tanstack/react-query';
import { ClipboardList } from 'lucide-react';
import { useState } from 'react';
import { EmptyState } from '@/components/common/empty-state';
import { ErrorState } from '@/components/common/error-state';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { Pager } from '@/components/common/pager';
import { ExamSummaryCard } from '@/components/exams/exam-summary-card';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/query-keys';
import type { ExamCard, Paginated } from '@/types/api';

function TodayExams() {
  const { data, error, isPending, refetch } = useQuery({
    queryKey: queryKeys.examsToday,
    queryFn: () => api.get<ExamCard[]>('/exams/today'),
  });
  if (isPending) return <ListSkeleton rows={1} />;
  if (error) return <ErrorState error={error} onRetry={() => void refetch()} />;
  if (!data.length) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="No exam published for today yet"
        description="Today’s exam will appear here as soon as it is published. Meanwhile, practise a previous day’s exam below."
      />
    );
  }
  return (
    <div className="space-y-3">
      {data.map((exam) => (
        <ExamSummaryCard key={exam.id} exam={exam} featured />
      ))}
    </div>
  );
}

function RecentExams() {
  const [page, setPage] = useState(1);
  const { data, error, isPending, refetch } = useQuery({
    queryKey: queryKeys.exams(page),
    queryFn: () => api.get<Paginated<ExamCard>>('/exams', { page, pageSize: 10 }),
  });
  if (isPending) return <ListSkeleton rows={3} />;
  if (error) return <ErrorState error={error} onRetry={() => void refetch()} />;
  if (!data.items.length)
    return <EmptyState title="No exams yet" description="Published exams will be listed here." />;
  return (
    <div className="space-y-3">
      {data.items.map((exam) => (
        <ExamSummaryCard key={exam.id} exam={exam} />
      ))}
      <Pager
        page={data.meta.page}
        totalPages={data.meta.totalPages}
        total={data.meta.total}
        onPageChange={setPage}
      />
    </div>
  );
}

export function ExamHub() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Today</h2>
        <TodayExams />
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">All exams</h2>
        <RecentExams />
      </section>
    </div>
  );
}
