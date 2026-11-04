'use client';

import { type QueryKey, useQuery } from '@tanstack/react-query';
import { ErrorState } from '@/components/common/error-state';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { PageHeader } from '@/components/common/page-header';
import { api } from '@/lib/api';

interface ResourceEditorProps<T> {
  queryKey: QueryKey;
  endpoint: string;
  title: string;
  description?: (resource: T) => string;
  actions?: (resource: T) => React.ReactNode;
  children: (resource: T) => React.ReactNode;
}

/** Loads one admin resource and renders loading/error states around its editor. */
export function ResourceEditor<T>({
  queryKey,
  endpoint,
  title,
  description,
  actions,
  children,
}: ResourceEditorProps<T>) {
  const { data, error, isPending, refetch } = useQuery({
    queryKey,
    queryFn: () => api.get<T>(endpoint),
  });
  if (isPending) return <ListSkeleton rows={6} />;
  if (error) return <ErrorState error={error} onRetry={() => void refetch()} />;
  return (
    <div className="space-y-6">
      <PageHeader title={title} description={description?.(data)} actions={actions?.(data)} />
      {children(data)}
    </div>
  );
}
