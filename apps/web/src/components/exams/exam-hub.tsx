'use client';

import { useQuery } from '@tanstack/react-query';
import { ClipboardList, Dumbbell } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { EmptyState } from '@/components/common/empty-state';
import { ErrorState } from '@/components/common/error-state';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { Pager } from '@/components/common/pager';
import { ExamSummaryCard } from '@/components/exams/exam-summary-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
    return (
      <EmptyState
        title="No earlier exams yet"
        description="Each day’s exam appears here after the day ends."
      />
    );
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

function PracticeCta() {
  return (
    <Card className="bg-accent/40 border-accent gap-0 py-4">
      <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">Want more practice?</p>
          <p className="text-muted-foreground text-sm">
            Build a set by subject or topic, or drill the questions you got wrong.
          </p>
        </div>
        <Button asChild variant="success">
          <Link href="/exams/practice">
            <Dumbbell /> Practice mode
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function ExamHub() {
  return (
    <div className="space-y-8">
      {/* Today's exam is the main job of this page, so it comes first. */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Today</h2>
        <TodayExams />
      </section>
      <PracticeCta />
      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold">Previous days</h2>
          <p className="text-muted-foreground text-sm">Missed a day? Every past exam stays open.</p>
        </div>
        <RecentExams />
      </section>
    </div>
  );
}
