'use client';

import { useQuery } from '@tanstack/react-query';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AttachmentManager } from '@/components/admin/attachment-manager';
import { CircularForm } from '@/components/admin/circular-form';
import { DeleteButton } from '@/components/admin/delete-button';
import { ErrorState } from '@/components/common/error-state';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { PageHeader } from '@/components/common/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/query-keys';
import type { CircularDetail } from '@/types/api';

export function CircularEditor({ id }: { id: string }) {
  const router = useRouter();
  const { data, error, isPending, refetch } = useQuery({
    queryKey: queryKeys.admin.circular(id),
    queryFn: () => api.get<CircularDetail>(`/admin/circulars/${id}`),
  });
  if (isPending) return <ListSkeleton rows={6} />;
  if (error) return <ErrorState error={error} onRetry={() => void refetch()} />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit circular"
        description={`${data.title} — ${data.organizationName}`}
        actions={
          <>
            {data.isPublished && (
              <Button asChild variant="outline">
                <Link href={`/circulars/${data.slug}`} target="_blank">
                  View public page <ExternalLink />
                </Link>
              </Button>
            )}
            <DeleteButton
              endpoint={`/admin/circulars/${data.id}`}
              itemLabel="Circular"
              variant="button"
              onDeleted={() => router.push('/admin/circulars')}
            />
          </>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <CircularForm key={data.updatedAt} circular={data} />
        <Card className="h-fit gap-4">
          <CardHeader>
            <CardTitle className="text-base">Circular documents</CardTitle>
          </CardHeader>
          <CardContent>
            <AttachmentManager
              uploadEndpoint={`/admin/circulars/${data.id}/attachments`}
              attachments={data.attachments}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
