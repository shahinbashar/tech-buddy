'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { errorMessage } from '@/lib/api-error';
import { queryKeys } from '@/lib/query-keys';

interface SaveCircularButtonProps {
  circularId: string;
  slug: string;
  initialSaved: boolean;
  isSignedIn: boolean;
}

/** Bookmark a circular to track its deadline from the dashboard. Optimistic toggle. */
export function SaveCircularButton({
  circularId,
  slug,
  initialSaved,
  isSignedIn,
}: SaveCircularButtonProps) {
  const queryClient = useQueryClient();
  const [saved, setSaved] = useState(initialSaved);
  const mutation = useMutation({
    mutationFn: (next: boolean) =>
      next ? api.put(`/circulars/${circularId}/save`) : api.delete(`/circulars/${circularId}/save`),
    onMutate: (next) => setSaved(next),
    onSuccess: (_data, next) => {
      toast.success(
        next
          ? 'Saved — we’ll highlight it on your dashboard as the deadline nears'
          : 'Removed from saved',
      );
      void queryClient.invalidateQueries({ queryKey: queryKeys.savedCirculars });
      void queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
    onError: (error, next) => {
      setSaved(!next);
      toast.error(errorMessage(error));
    },
  });

  if (!isSignedIn) {
    return (
      <Button asChild variant="outline">
        <Link href={`/login?next=${encodeURIComponent(`/circulars/${slug}`)}`}>
          <Bookmark /> Log in to save
        </Link>
      </Button>
    );
  }
  return (
    <Button
      variant={saved ? 'secondary' : 'outline'}
      aria-pressed={saved}
      disabled={mutation.isPending}
      onClick={() => mutation.mutate(!saved)}
    >
      {saved ? <BookmarkCheck className="text-primary" /> : <Bookmark />}
      {saved ? 'Saved' : 'Save circular'}
    </Button>
  );
}
