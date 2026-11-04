import { CheckCircle2, XCircle } from 'lucide-react';
import { OPTION_LETTERS } from '@/components/exams/option-button';
import { cn } from '@/lib/utils';
import type { SnapshotOption } from '@/types/api';

interface ReviewOptionProps {
  option: SnapshotOption;
  index: number;
  isCorrect: boolean;
  isSelected: boolean;
}

export function ReviewOption({ option, index, isCorrect, isSelected }: ReviewOptionProps) {
  const isWrongPick = isSelected && !isCorrect;
  return (
    <li
      className={cn(
        'flex items-start gap-3 rounded-lg border p-3 text-sm',
        isCorrect && 'border-success bg-success/10',
        isWrongPick && 'border-destructive bg-destructive/5',
      )}
    >
      <span className="text-muted-foreground w-5 shrink-0 font-semibold">
        {OPTION_LETTERS[index]}.
      </span>
      <span className="flex-1">
        {option.text}
        {option.textBn && <span className="text-muted-foreground block">{option.textBn}</span>}
      </span>
      {isCorrect && (
        <CheckCircle2 className="text-success size-5 shrink-0" aria-label="Correct answer" />
      )}
      {isWrongPick && (
        <XCircle className="text-destructive size-5 shrink-0" aria-label="Your answer" />
      )}
      {isSelected && <span className="sr-only">(your answer)</span>}
    </li>
  );
}
