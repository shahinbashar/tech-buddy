'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { errorMessage } from '@/lib/api-error';

/** Starts (or resumes) an attempt and opens the exam runner. */
export function useStartExam() {
  const router = useRouter();
  return useMutation({
    mutationFn: (examId: string) =>
      api.post<{ attemptId: string; resumed: boolean }>(`/exams/${examId}/attempts`),
    onSuccess: ({ attemptId, resumed }) => {
      if (resumed) toast.info('Resuming your attempt in progress');
      router.push(`/exams/attempts/${attemptId}`);
    },
    onError: (error) => toast.error(errorMessage(error)),
  });
}
