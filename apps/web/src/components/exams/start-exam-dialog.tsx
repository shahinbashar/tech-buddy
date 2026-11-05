'use client';

import { Clock, ListOrdered, MinusCircle, Save, Timer } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { formatNumber } from '@/lib/format';
import type { ExamCard } from '@/types/api';

/**
 * The timer starts the moment an attempt is created, so the candidate sees the rules first
 * and starts deliberately — not by an accidental tap.
 */
export function StartExamDialog({
  exam,
  trigger,
  onStart,
}: {
  exam: ExamCard;
  trigger: React.ReactNode;
  onStart: () => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ready to start?</AlertDialogTitle>
          <AlertDialogDescription>{exam.title}</AlertDialogDescription>
        </AlertDialogHeader>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <ListOrdered className="text-primary size-4" aria-hidden />
            {exam.questionCount} questions · {formatNumber(exam.marksPerQuestion)} mark each
          </li>
          <li className="flex items-center gap-2">
            <Clock className="text-primary size-4" aria-hidden />
            {exam.durationMinutes} minutes
          </li>
          <li className="flex items-center gap-2">
            <MinusCircle className="text-primary size-4" aria-hidden />
            {exam.negativeMarking > 0
              ? `−${formatNumber(exam.negativeMarking)} for each wrong answer — skip if unsure`
              : 'No negative marking — answer every question'}
          </li>
          <li className="flex items-center gap-2">
            <Timer className="text-primary size-4" aria-hidden />
            The timer keeps running if you leave; it submits automatically at zero
          </li>
          <li className="flex items-center gap-2">
            <Save className="text-primary size-4" aria-hidden />
            Answers save as you go
          </li>
        </ul>
        <AlertDialogFooter>
          <AlertDialogCancel>Not now</AlertDialogCancel>
          <AlertDialogAction onClick={onStart}>Start now</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
