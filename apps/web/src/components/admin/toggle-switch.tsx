'use client';

import { Switch } from '@/components/ui/switch';
import { useAdminMutation } from '@/hooks/use-admin-mutation';
import { api } from '@/lib/api';

interface ToggleSwitchProps {
  /** PATCH endpoint, e.g. `/admin/circulars/:id`. */
  endpoint: string;
  field: string;
  checked: boolean;
  label: string;
  successMessage: (next: boolean) => string;
}

/** Inline switch that PATCHes a single boolean field (publish, feature, …). */
export function ToggleSwitch({
  endpoint,
  field,
  checked,
  label,
  successMessage,
}: ToggleSwitchProps) {
  const mutation = useAdminMutation<boolean>({
    mutationFn: (next) => api.patch(endpoint, { [field]: next }),
    successMessage: (_result, next) => successMessage(next),
  });
  return (
    <Switch
      checked={mutation.isPending ? Boolean(mutation.variables) : checked}
      disabled={mutation.isPending}
      aria-label={label}
      onCheckedChange={(next) => mutation.mutate(next)}
    />
  );
}
