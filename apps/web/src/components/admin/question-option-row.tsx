'use client';

import type { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { QuestionFormValues } from '@/lib/admin-schemas';
import { cn } from '@/lib/utils';

interface QuestionOptionRowProps {
  control: Control<QuestionFormValues>;
  index: number;
  letter: string;
  isCorrect: boolean;
  onMarkCorrect: () => void;
}

export function QuestionOptionRow({
  control,
  index,
  letter,
  isCorrect,
  onMarkCorrect,
}: QuestionOptionRowProps) {
  return (
    <div
      className={cn(
        'grid gap-2 rounded-lg border p-3 md:grid-cols-[auto_1fr_1fr]',
        isCorrect && 'border-success bg-success/5',
      )}
    >
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input
          type="radio"
          name="correctOptionIndex"
          value={index}
          checked={isCorrect}
          onChange={onMarkCorrect}
          className="size-4 accent-[var(--success)]"
          aria-label={`Mark option ${letter} as correct`}
        />
        {letter}
      </label>
      <FormField
        control={control}
        name={`options.${index}.text`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="sr-only">Option {letter}</FormLabel>
            <FormControl>
              <Input {...field} placeholder={`Option ${letter}`} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`options.${index}.textBn`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="sr-only">Option {letter} (Bangla)</FormLabel>
            <FormControl>
              <Input {...field} value={field.value ?? ''} placeholder="Bangla (optional)" />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
