'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useCountdown } from '@/hooks/use-countdown';
import { api } from '@/lib/api';
import { errorMessage } from '@/lib/api-error';
import { queryKeys } from '@/lib/query-keys';
import type { InProgressAttempt, SubmittedAttempt } from '@/types/api';

export type Answers = Record<string, string | null>;

const WARNINGS = [
  { atSeconds: 300, message: '5 minutes left' },
  { atSeconds: 60, message: '1 minute left — review your answers' },
];

/**
 * All state and side effects of a running exam, kept out of the UI:
 * - answers are saved one request at a time per attempt (no out-of-order writes);
 * - unsynced answers are tracked and flushed with the submission;
 * - auto-submit fires exactly once at 00:00 and never loops on failure;
 * - time warnings, and a leave-page guard until submission.
 */
export function useExamSession(attempt: InProgressAttempt) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(() =>
    Object.fromEntries(attempt.questions.map((q) => [q.answerId, q.selectedOptionId])),
  );
  const [unsyncedIds, setUnsyncedIds] = useState<ReadonlySet<string>>(new Set());
  const [autoSubmitFailed, setAutoSubmitFailed] = useState(false);
  const submittedRef = useRef(false);
  const autoSubmittedRef = useRef(false);
  const warnedRef = useRef(new Set<number>());
  const secondsLeft = useCountdown(attempt.expiresAt, attempt.serverTime);

  const markSynced = (answerId: string, synced: boolean) =>
    setUnsyncedIds((prev) => {
      const next = new Set(prev);
      if (synced) next.delete(answerId);
      else next.add(answerId);
      return next;
    });

  const { mutate: saveMutate } = useMutation({
    // One scope per attempt: TanStack runs these sequentially, so the last click wins.
    scope: { id: `attempt-${attempt.id}` },
    mutationFn: (payload: { answerId: string; selectedOptionId: string | null }) =>
      api.put(`/attempts/${attempt.id}/answers`, payload),
    onSuccess: (_data, payload) => markSynced(payload.answerId, true),
    onError: (_error, payload) => markSynced(payload.answerId, false),
  });

  const { mutate: submitMutate, isPending: isSubmitting } = useMutation({
    mutationFn: (finalAnswers: Answers) =>
      api.post<SubmittedAttempt>(`/attempts/${attempt.id}/submit`, {
        answers: Object.entries(finalAnswers).map(([answerId, selectedOptionId]) => ({
          answerId,
          selectedOptionId,
        })),
      }),
    onSuccess: (result) => {
      queryClient.setQueryData(queryKeys.attempt(attempt.id), result);
      void queryClient.invalidateQueries({ queryKey: ['exams'] });
      void queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
      void queryClient.invalidateQueries({ queryKey: ['attempts', 'history'] });
      router.replace(`/exams/results/${attempt.id}`);
    },
    onError: (error) => {
      submittedRef.current = false;
      toast.error(errorMessage(error));
    },
  });

  const answersRef = useRef(answers);
  answersRef.current = answers;

  const submit = useCallback(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    submitMutate(answersRef.current);
  }, [submitMutate]);

  // Auto-submit exactly once when time runs out. If it fails (e.g. offline), the user gets a
  // manual retry; the server also finalizes expired attempts on its own.
  useEffect(() => {
    if (secondsLeft > 0 || autoSubmittedRef.current) return;
    autoSubmittedRef.current = true;
    toast.info('Time is up — submitting your exam');
    submittedRef.current = true;
    submitMutate(answersRef.current, { onError: () => setAutoSubmitFailed(true) });
  }, [secondsLeft, submitMutate]);

  useEffect(() => {
    for (const warning of WARNINGS) {
      if (
        secondsLeft <= warning.atSeconds &&
        secondsLeft > 0 &&
        !warnedRef.current.has(warning.atSeconds)
      ) {
        warnedRef.current.add(warning.atSeconds);
        // Don't warn for thresholds already passed when the page was opened late.
        if (secondsLeft > warning.atSeconds - 5) toast.warning(warning.message);
      }
    }
  }, [secondsLeft]);

  useEffect(() => {
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!submittedRef.current) event.preventDefault();
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, []);

  const total = attempt.questions.length;
  const question = attempt.questions[currentIndex];

  const selectOption = useCallback(
    (optionId: string | null) => {
      if (submittedRef.current) return;
      setAnswers((prev) => ({ ...prev, [question.answerId]: optionId }));
      saveMutate({ answerId: question.answerId, selectedOptionId: optionId });
    },
    [question.answerId, saveMutate],
  );

  const goTo = useCallback(
    (index: number) => setCurrentIndex(Math.min(Math.max(index, 0), total - 1)),
    [total],
  );

  return {
    question,
    currentIndex,
    total,
    answers,
    answeredCount: attempt.questions.filter((q) => answers[q.answerId]).length,
    hasUnsynced: unsyncedIds.size > 0,
    secondsLeft,
    isSubmitting,
    autoSubmitFailed,
    selectOption,
    goTo,
    submit,
  };
}
