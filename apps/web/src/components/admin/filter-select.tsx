'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SelectOption } from '@/components/admin/form-fields';

const ALL = '__all__';

interface FilterSelectProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  options: SelectOption[];
  allLabel: string;
  className?: string;
}

export function FilterSelect({
  value,
  onChange,
  options,
  allLabel,
  className = 'w-full sm:w-48',
}: FilterSelectProps) {
  return (
    <Select
      value={value ?? ALL}
      onValueChange={(next) => onChange(next === ALL ? undefined : next)}
    >
      <SelectTrigger className={className} aria-label={allLabel}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>{allLabel}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
