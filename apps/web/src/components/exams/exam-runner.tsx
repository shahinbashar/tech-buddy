'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ErrorState } from '@/components/common/error-state';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { ActiveExam } from '@/components/exams/active-exam';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/query-keys';
import type { AttemptView } from '@/types/api';

export function ExamRunner({ attemptId }: { attemptId: string }) {
  const router = useRouter();
  const { data, error, isPending, refetch } = useQuery({
    queryKey: queryKeys.attempt(attemptId),
    queryFn: () => api.get<AttemptView>(`/attempts/${attemptId}`),
    // The runner owns local state after load; never refetch underneath it.
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data?.status === 'SUBMITTED') router.replace(`/exams/results/${attemptId}`);
  }, [data?.status, attemptId, router]);

  if (isPending) return <ListSkeleton rows={4} />;
  if (error) return <ErrorState error={error} onRetry={() => void refetch()} />;
  if (data.status === 'SUBMITTED') return <ListSkeleton rows={2} />;
  return <ActiveExam attempt={data} />;
}
