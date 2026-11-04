import { CloudOff } from 'lucide-react';
import { CountdownTimer } from '@/components/exams/countdown-timer';
import { SubmitExamDialog } from '@/components/exams/submit-exam-dialog';

interface ExamStatusBarProps {
  title: string;
  answeredCount: number;
  total: number;
  hasUnsynced: boolean;
  secondsLeft: number;
  isSubmitting: boolean;
  onSubmit: () => void;
}

/** Sticky header: exam title, progress, sync status, countdown and submit. */
export function ExamStatusBar({
  title,
  answeredCount,
  total,
  hasUnsynced,
  secondsLeft,
  isSubmitting,
  onSubmit,
}: ExamStatusBarProps) {
  return (
    <div className="bg-background/95 sticky top-0 z-30 -mx-4 flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
      <div className="min-w-0">
        <h1 className="truncate font-semibold">{title}</h1>
        <p className="text-muted-foreground text-xs" aria-live="polite">
          {answeredCount}/{total} answered
          {hasUnsynced && (
            <span className="text-warning-foreground ml-2 inline-flex items-center gap-1">
              <CloudOff className="size-3" aria-hidden /> Some answers not synced yet — they’ll be
              sent on submit
            </span>
          )}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <CountdownTimer secondsLeft={secondsLeft} />
        <SubmitExamDialog
          unanswered={total - answeredCount}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
