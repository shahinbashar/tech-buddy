'use client';

import { AlertTriangle, ChevronLeft, ChevronRight, Keyboard } from 'lucide-react';
import Link from 'next/link';
import { ExamStatusBar } from '@/components/exams/exam-status-bar';
import { QuestionNavigator } from '@/components/exams/question-navigator';
import { QuestionPanel } from '@/components/exams/question-panel';
import { SubmitExamDialog } from '@/components/exams/submit-exam-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useExamSession } from '@/hooks/use-exam-session';
import { useExamShortcuts } from '@/hooks/use-exam-shortcuts';
import type { InProgressAttempt } from '@/types/api';

export function ActiveExam({ attempt }: { attempt: InProgressAttempt }) {
  const session = useExamSession(attempt);
  const { question, currentIndex, total, answers, goTo, selectOption } = session;
  const isLast = currentIndex === total - 1;

  useExamShortcuts({
    optionCount: question.options.length,
    onSelect: (index) => selectOption(question.options[index].id),
    onPrevious: () => goTo(currentIndex - 1),
    onNext: () => goTo(currentIndex + 1),
  });

  return (
    <div className="space-y-4">
      <ExamStatusBar
        title={attempt.examTitle}
        answeredCount={session.answeredCount}
        total={total}
        hasUnsynced={session.hasUnsynced}
        secondsLeft={session.secondsLeft}
        isSubmitting={session.isSubmitting}
        onSubmit={session.submit}
      />

      {session.autoSubmitFailed && (
        <Alert variant="warning">
          <AlertTriangle />
          <AlertTitle>Time is up, but we couldn’t reach the server</AlertTitle>
          <AlertDescription>
            <p>Your saved answers will still be scored. Check your connection and try again.</p>
            <div className="mt-1 flex gap-2">
              <Button size="sm" onClick={session.submit} disabled={session.isSubmitting}>
                Retry submit
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href={`/exams/results/${attempt.id}`}>View result</Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          <QuestionPanel
            question={question}
            index={currentIndex}
            total={total}
            selectedOptionId={answers[question.answerId] ?? null}
            onSelect={selectOption}
          />
          <div className="flex justify-between gap-3">
            <Button
              variant="outline"
              disabled={currentIndex === 0}
              onClick={() => goTo(currentIndex - 1)}
            >
              <ChevronLeft /> Previous
            </Button>
            {isLast ? (
              <SubmitExamDialog
                unanswered={total - session.answeredCount}
                isSubmitting={session.isSubmitting}
                onSubmit={session.submit}
              />
            ) : (
              <Button onClick={() => goTo(currentIndex + 1)}>
                Next <ChevronRight />
              </Button>
            )}
          </div>
          <p className="text-muted-foreground hidden items-center gap-1.5 text-xs md:flex">
            <Keyboard className="size-3.5" aria-hidden />
            Shortcuts: <kbd className="rounded border px-1">A</kbd>–
            <kbd className="rounded border px-1">D</kbd> to answer,{' '}
            <kbd className="rounded border px-1">←</kbd>{' '}
            <kbd className="rounded border px-1">→</kbd> to move
          </p>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <QuestionNavigator
            questions={attempt.questions}
            answers={answers}
            currentIndex={currentIndex}
            onNavigate={goTo}
          />
        </aside>
      </div>
    </div>
  );
}
