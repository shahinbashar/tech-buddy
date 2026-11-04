import { cn } from '@/lib/utils';
import type { SnapshotOption } from '@/types/api';

export const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

interface OptionButtonProps {
  option: SnapshotOption;
  index: number;
  selected: boolean;
  onSelect: () => void;
}

export function OptionButton({ option, index, selected, onSelect }: OptionButtonProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        'flex w-full items-start gap-3 rounded-lg border p-4 text-left transition-colors',
        selected
          ? 'border-primary bg-primary/5 ring-primary/20 ring-2'
          : 'bg-card hover:border-primary/40 hover:bg-muted/40',
      )}
    >
      <span
        className={cn(
          'flex size-7 shrink-0 items-center justify-center rounded-full border text-sm font-semibold',
          selected ? 'bg-primary text-primary-foreground border-primary' : 'text-muted-foreground',
        )}
      >
        {OPTION_LETTERS[index]}
      </span>
      <span className="pt-0.5">
        {option.text}
        {option.textBn && (
          <span className="text-muted-foreground block text-sm">{option.textBn}</span>
        )}
      </span>
    </button>
  );
}
