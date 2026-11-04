'use client';

import { useQuery } from '@tanstack/react-query';
import { Bookmark } from 'lucide-react';
import Link from 'next/link';
import { CircularCard } from '@/components/circulars/circular-card';
import { EmptyState } from '@/components/common/empty-state';
import { ErrorState } from '@/components/common/error-state';
import { CardGridSkeleton } from '@/components/common/list-skeleton';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/query-keys';
import type { SavedCircular } from '@/types/api';

export function SavedCirculars() {
  const { data, error, isPending, refetch } = useQuery({
    queryKey: queryKeys.savedCirculars,
    queryFn: () => api.get<SavedCircular[]>('/circulars/saved'),
  });
  if (isPending) return <CardGridSkeleton cards={3} />;
  if (error) return <ErrorState error={error} onRetry={() => void refetch()} />;
  if (!data.length) {
    return (
      <EmptyState
        icon={Bookmark}
        title="No saved circulars yet"
        description="Save circulars you plan to apply for — we’ll keep their deadlines in front of you."
        action={
          <Button asChild>
            <Link href="/circulars">Browse circulars</Link>
          </Button>
        }
      />
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data.map((circular) => (
        <CircularCard key={circular.id} circular={circular} />
      ))}
    </div>
  );
}
