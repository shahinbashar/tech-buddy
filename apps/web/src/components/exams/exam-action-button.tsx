'use client';

import { Crown, Loader2, Play, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { StartExamDialog } from '@/components/exams/start-exam-dialog';
import { Button } from '@/components/ui/button';
import { useStartExam } from '@/hooks/use-start-exam';
import type { ExamCard } from '@/types/api';

/** Chooses the right primary action for an exam: start, resume, retake, view result or upgrade. */
export function ExamActionButton({
  exam,
  size = 'default',
}: {
  exam: ExamCard;
  size?: 'default' | 'sm' | 'lg';
}) {
  const start = useStartExam();

  if (exam.isLocked) {
    return (
      <Button asChild size={size} variant="outline">
        <Link href="/premium">
          <Crown /> Unlock with Premium
        </Link>
      </Button>
    );
  }
  if (exam.inProgressAttemptId) {
    return (
      <Button asChild size={size}>
        <Link href={`/exams/attempts/${exam.inProgressAttemptId}`}>
          <Play /> Resume exam
        </Link>
      </Button>
    );
  }
  if (exam.canStart) {
    const isRetake = exam.attemptCount > 0;
    return (
      <StartExamDialog
        exam={exam}
        onStart={() => start.mutate(exam.id)}
        trigger={
          <Button size={size} disabled={start.isPending} variant={isRetake ? 'outline' : 'default'}>
            {start.isPending ? (
              <Loader2 className="animate-spin" />
            ) : isRetake ? (
              <RotateCcw />
            ) : (
              <Play />
            )}
            {isRetake ? 'Retake exam' : 'Start exam'}
          </Button>
        }
      />
    );
  }
  if (exam.lastAttemptId) {
    return (
      <Button asChild size={size} variant="outline">
        <Link href={`/exams/results/${exam.lastAttemptId}`}>View result</Link>
      </Button>
    );
  }
  return (
    <Button size={size} disabled variant="outline">
      Not available
    </Button>
  );
}
