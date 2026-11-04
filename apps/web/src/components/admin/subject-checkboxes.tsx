'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useSubjectOptions } from '@/hooks/use-admin-options';

interface SubjectCheckboxesProps {
  value: string[];
  onChange: (value: string[]) => void;
}

/** Multi-select of subjects; an empty selection means "all subjects". */
export function SubjectCheckboxes({ value, onChange }: SubjectCheckboxesProps) {
  const options = useSubjectOptions();
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium">Subjects</legend>
      <p className="text-muted-foreground text-xs">
        Leave all unchecked to draw from every subject.
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const id = `subject-${option.value}`;
          const checked = value.includes(option.value);
          return (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox
                id={id}
                checked={checked}
                onCheckedChange={(next) =>
                  onChange(
                    next ? [...value, option.value] : value.filter((v) => v !== option.value),
                  )
                }
              />
              <Label htmlFor={id} className="font-normal">
                {option.label}
              </Label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
