import { CalendarDays, Clock, ListOrdered, MinusCircle } from 'lucide-react';
import { formatIsoDate, formatNumber } from '@/lib/format';
import type { ExamCard } from '@/types/api';

export function ExamMeta({ exam }: { exam: ExamCard }) {
  return (
    <ul className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-sm">
      <li className="flex items-center gap-1.5">
        <CalendarDays className="size-4" aria-hidden /> {formatIsoDate(exam.examDate)}
      </li>
      <li className="flex items-center gap-1.5">
        <ListOrdered className="size-4" aria-hidden /> {exam.questionCount} questions
      </li>
      <li className="flex items-center gap-1.5">
        <Clock className="size-4" aria-hidden /> {exam.durationMinutes} minutes
      </li>
      {exam.negativeMarking > 0 && (
        <li className="flex items-center gap-1.5">
          <MinusCircle className="size-4" aria-hidden /> −{formatNumber(exam.negativeMarking)} per
          wrong answer
        </li>
      )}
    </ul>
  );
}
