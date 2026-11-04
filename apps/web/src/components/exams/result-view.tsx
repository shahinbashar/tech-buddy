'use client';

import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, History } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ErrorState } from '@/components/common/error-state';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { PageHeader } from '@/components/common/page-header';
import { LeaderboardCard } from '@/components/exams/leaderboard-card';
import { ResultNextSteps } from '@/components/exams/result-next-steps';
import { ResultSummary } from '@/components/exams/result-summary';
import { ReviewQuestionCard } from '@/components/exams/review-question-card';
import { SubjectBreakdownTable } from '@/components/exams/subject-breakdown-table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/lib/api';
import { formatDateTime } from '@/lib/format';
import { queryKeys } from '@/lib/query-keys';
import type { AttemptView, ResultQuestion } from '@/types/api';

type Filter = 'all' | 'correct' | 'incorrect' | 'unanswered';

const FILTERS: Record<Filter, (q: ResultQuestion) => boolean> = {
  all: () => true,
  correct: (q) => q.isCorrect === true,
  incorrect: (q) => q.isCorrect === false,
  unanswered: (q) => q.isCorrect === null,
};

export function ResultView({ attemptId }: { attemptId: string }) {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>('all');
  const { data, error, isPending, refetch } = useQuery({
    queryKey: queryKeys.attempt(attemptId),
    queryFn: () => api.get<AttemptView>(`/attempts/${attemptId}`),
  });

  useEffect(() => {
    if (data?.status === 'IN_PROGRESS') router.replace(`/exams/attempts/${attemptId}`);
  }, [data?.status, attemptId, router]);

  if (isPending) return <ListSkeleton rows={5} />;
  if (error) return <ErrorState error={error} onRetry={() => void refetch()} />;
  if (data.status !== 'SUBMITTED') return <ListSkeleton rows={2} />;

  const questions = data.questions.filter(FILTERS[filter]);
  const counts = {
    all: data.questions.length,
    correct: data.result.correctCount,
    incorrect: data.result.incorrectCount,
    unanswered: data.result.unansweredCount,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link href="/exams">
            <ArrowLeft /> Exams
          </Link>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link href="/dashboard/history">
            <History /> History
          </Link>
        </Button>
      </div>
      <PageHeader
        title={`Result: ${data.examTitle}`}
        description={`Submitted ${formatDateTime(data.submittedAt)}`}
      />
      <ResultSummary result={data.result} />
      <ResultNextSteps
        examId={data.exam.id}
        canRetake={Boolean(data.exam.allowMultipleAttempts)}
        hasMistakes={data.result.incorrectCount + data.result.unansweredCount > 0}
      />
      <div className="grid gap-4 xl:grid-cols-2">
        <SubjectBreakdownTable rows={data.subjectBreakdown} />
        {data.exam.type !== 'PRACTICE' && <LeaderboardCard examId={data.exam.id} />}
      </div>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Answer review</h2>
          <Tabs value={filter} onValueChange={(value) => setFilter(value as Filter)}>
            <TabsList>
              {(Object.keys(FILTERS) as Filter[]).map((key) => (
                <TabsTrigger key={key} value={key} className="capitalize">
                  {key} ({counts[key]})
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        {questions.length ? (
          questions.map((question) => (
            <ReviewQuestionCard
              key={question.answerId}
              question={question}
              index={question.order}
            />
          ))
        ) : (
          <p className="text-muted-foreground text-sm">No questions in this category.</p>
        )}
      </section>
    </div>
  );
}
