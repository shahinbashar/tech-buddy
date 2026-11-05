'use client';

import { useQuery } from '@tanstack/react-query';
import { ClipboardList } from 'lucide-react';
import { ExamActionButton } from '@/components/exams/exam-action-button';
import { ExamMeta } from '@/components/exams/exam-meta';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';
import { formatPercent } from '@/lib/format';
import { queryKeys } from '@/lib/query-keys';
import type { ExamCard } from '@/types/api';

function statusLine(exam: ExamCard): string {
  if (exam.inProgressAttemptId) return 'You started this exam — the timer is running.';
  if (exam.bestPercentage !== null)
    return `Done today · you scored ${formatPercent(exam.bestPercentage)}.`;
  return 'A fresh set of questions for today. Keep your streak going.';
}

/** The day's main action, first on the dashboard: start, resume or review today's exam. */
export function TodayExamCard() {
  const { data, isPending, isError } = useQuery({
    queryKey: queryKeys.examsToday,
    queryFn: () => api.get<ExamCard[]>('/exams/today'),
  });

  if (isPending) return <Skeleton className="h-36 rounded-xl" />;
  const exam = data?.[0];
  if (isError || !exam) return null;

  return (
    <Card className="border-primary/40 bg-primary/5 gap-0 py-5">
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-1.5">
          <p className="text-primary flex items-center gap-2 text-sm font-semibold">
            <ClipboardList className="size-4" aria-hidden /> Today’s exam
          </p>
          <p className="text-lg font-semibold">{exam.title}</p>
          <p className="text-muted-foreground text-sm">{statusLine(exam)}</p>
          <ExamMeta exam={exam} />
        </div>
        <div className="shrink-0">
          <ExamActionButton exam={exam} size="lg" />
        </div>
      </CardContent>
    </Card>
  );
}
