'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, CloudOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { CountdownTimer } from '@/components/exams/countdown-timer';
import { QuestionNavigator } from '@/components/exams/question-navigator';
import { QuestionPanel } from '@/components/exams/question-panel';
import { SubmitExamDialog } from '@/components/exams/submit-exam-dialog';
import { Button } from '@/components/ui/button';
import { useCountdown } from '@/hooks/use-countdown';
import { api } from '@/lib/api';
import { errorMessage } from '@/lib/api-error';
import { queryKeys } from '@/lib/query-keys';
import type { InProgressAttempt, SubmittedAttempt } from '@/types/api';

type Answers = Record<string, string | null>;

export function ActiveExam({ attempt }: { attempt: InProgressAttempt }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(() =>
    Object.fromEntries(attempt.questions.map((q) => [q.answerId, q.selectedOptionId])),
  );
  const [unsaved, setUnsaved] = useState(false);
  const submittedRef = useRef(false);
  const secondsLeft = useCountdown(attempt.expiresAt, attempt.serverTime);

  const saveAnswer = useMutation({
    mutationFn: (payload: { answerId: string; selectedOptionId: string | null }) =>
      api.put(`/attempts/${attempt.id}/answers`, payload),
    onSuccess: () => setUnsaved(false),
    // The answer stays selected locally and is flushed again on submit.
    onError: () => setUnsaved(true),
  });

  const submit = useMutation({
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

  const handleSubmit = useCallback(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    submit.mutate(answers);
  }, [answers, submit]);

  // Auto-submit when the timer reaches zero.
  useEffect(() => {
    if (secondsLeft === 0 && !submittedRef.current) {
      toast.info('Time is up — submitting your exam');
      handleSubmit();
    }
  }, [secondsLeft, handleSubmit]);

  // Warn before leaving mid-exam (the timer keeps running server-side).
  useEffect(() => {
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!submittedRef.current) event.preventDefault();
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, []);

  const question = attempt.questions[currentIndex];
  const unanswered = attempt.questions.filter((q) => !answers[q.answerId]).length;
  const isLast = currentIndex === attempt.questions.length - 1;

  const selectOption = (optionId: string | null) => {
    setAnswers((prev) => ({ ...prev, [question.answerId]: optionId }));
    saveAnswer.mutate({ answerId: question.answerId, selectedOptionId: optionId });
  };

  return (
    <div className="space-y-4">
      <div className="bg-background/95 sticky top-0 z-30 -mx-4 flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="min-w-0">
          <h1 className="truncate font-semibold">{attempt.examTitle}</h1>
          <p className="text-muted-foreground text-xs">
            {attempt.totalQuestions - unanswered}/{attempt.totalQuestions} answered
            {unsaved && (
              <span className="text-warning-foreground ml-2 inline-flex items-center gap-1">
                <CloudOff className="size-3" aria-hidden /> Some answers not synced — they’ll be
                sent on submit
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <CountdownTimer secondsLeft={secondsLeft} />
          <SubmitExamDialog
            unanswered={unanswered}
            isSubmitting={submit.isPending}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          <QuestionPanel
            question={question}
            index={currentIndex}
            total={attempt.questions.length}
            selectedOptionId={answers[question.answerId] ?? null}
            onSelect={selectOption}
          />
          <div className="flex justify-between gap-3">
            <Button
              variant="outline"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((i) => i - 1)}
            >
              <ChevronLeft /> Previous
            </Button>
            {isLast ? (
              <SubmitExamDialog
                unanswered={unanswered}
                isSubmitting={submit.isPending}
                onSubmit={handleSubmit}
              />
            ) : (
              <Button onClick={() => setCurrentIndex((i) => i + 1)}>
                Next <ChevronRight />
              </Button>
            )}
          </div>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <QuestionNavigator
            questions={attempt.questions}
            answers={answers}
            currentIndex={currentIndex}
            onNavigate={setCurrentIndex}
          />
        </aside>
      </div>
    </div>
  );
}
