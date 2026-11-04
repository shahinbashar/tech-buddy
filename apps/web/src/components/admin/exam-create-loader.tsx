'use client';

import { useQuery } from '@tanstack/react-query';
import { ExamCreateForm } from '@/components/admin/exam-create-form';
import { ErrorState } from '@/components/common/error-state';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/query-keys';
import type { ExamSettings } from '@/types/api';

export function ExamCreateLoader() {
  const { data, error, isPending, refetch } = useQuery({
    queryKey: queryKeys.admin.examSettings,
    queryFn: () => api.get<ExamSettings>('/admin/exams/settings'),
  });
  if (isPending) return <ListSkeleton rows={4} />;
  if (error) return <ErrorState error={error} onRetry={() => void refetch()} />;
  return <ExamCreateForm settings={data} />;
}
