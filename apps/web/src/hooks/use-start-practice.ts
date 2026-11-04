'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { errorMessage } from '@/lib/api-error';
import type { PracticeCreated, PracticeMode } from '@/types/api';

export interface PracticeRequest {
  mode: PracticeMode;
  subjectId?: string;
  topicId?: string;
  questionCount: number;
}

/** Creates a private practice set and opens it in the exam runner. */
export function useStartPractice() {
  const router = useRouter();
  return useMutation({
    mutationFn: (request: PracticeRequest) => api.post<PracticeCreated>('/practice', request),
    onSuccess: ({ attemptId, questionCount }) => {
      toast.success(`Practice set ready — ${questionCount} questions`);
      router.push(`/exams/attempts/${attemptId}`);
    },
    onError: (error) => toast.error(errorMessage(error)),
  });
}
