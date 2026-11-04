'use client';

import { useEffect } from 'react';
import type { FieldPath, FieldValues, PathValue, UseFormReturn } from 'react-hook-form';
import { useWatch } from 'react-hook-form';
import type { SelectOption } from '@/components/admin/form-fields';

/** Clears a dependent select (e.g. topic) when its value is no longer among the available options. */
export function useDependentReset<T extends FieldValues>(
  form: UseFormReturn<T>,
  name: FieldPath<T>,
  options: SelectOption[],
  emptyValue: PathValue<T, FieldPath<T>>,
  enabled: boolean,
) {
  const value = useWatch({ control: form.control, name }) as unknown;
  useEffect(() => {
    if (!enabled || !value) return;
    if (!options.some((option) => option.value === value)) {
      form.setValue(name, emptyValue, { shouldDirty: true });
    }
  }, [enabled, value, options, form, name, emptyValue]);
}
