'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckCircle2, Circle, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { errorMessage } from '@/lib/api-error';
import { queryKeys } from '@/lib/query-keys';

interface CompleteTopicButtonProps {
  topicId: string;
  isCompleted: boolean;
  isSignedIn: boolean;
  disabled?: boolean;
  loginRedirect: string;
}

export function CompleteTopicButton({
  topicId,
  isCompleted,
  isSignedIn,
  disabled,
  loginRedirect,
}: CompleteTopicButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (complete: boolean) =>
      complete
        ? api.post(`/progress/topics/${topicId}/complete`)
        : api.delete(`/progress/topics/${topicId}/complete`),
    onSuccess: (_data, complete) => {
      toast.success(complete ? 'Topic marked as completed' : 'Topic marked as pending');
      void queryClient.invalidateQueries({ queryKey: queryKeys.progress });
      void queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
      router.refresh();
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  if (!isSignedIn) {
    return (
      <Button asChild variant="outline">
        <Link href={`/login?next=${encodeURIComponent(loginRedirect)}`}>
          <LogIn /> Log in to track progress
        </Link>
      </Button>
    );
  }

  return (
    <Button
      variant={isCompleted ? 'outline' : 'success'}
      disabled={disabled || mutation.isPending}
      onClick={() => mutation.mutate(!isCompleted)}
      aria-pressed={isCompleted}
    >
      {isCompleted ? <CheckCircle2 className="text-success" /> : <Circle />}
      {isCompleted ? 'Completed — mark as pending' : 'Mark as completed'}
    </Button>
  );
}
