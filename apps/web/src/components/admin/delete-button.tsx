'use client';

import { Trash2 } from 'lucide-react';
import { ConfirmDialog } from '@/components/common/confirm-dialog';
import { Button } from '@/components/ui/button';
import { useAdminMutation } from '@/hooks/use-admin-mutation';
import { api } from '@/lib/api';

interface DeleteButtonProps {
  endpoint: string;
  itemLabel: string;
  description?: string;
  onDeleted?: () => void;
  variant?: 'icon' | 'button';
}

export function DeleteButton({
  endpoint,
  itemLabel,
  description,
  onDeleted,
  variant = 'icon',
}: DeleteButtonProps) {
  const mutation = useAdminMutation<void>({
    mutationFn: () => api.delete(endpoint),
    successMessage: `${itemLabel} deleted`,
    onSuccess: () => onDeleted?.(),
  });
  return (
    <ConfirmDialog
      title={`Delete ${itemLabel.toLowerCase()}?`}
      description={description ?? 'This action cannot be undone.'}
      confirmLabel="Delete"
      destructive
      onConfirm={() => mutation.mutate()}
      trigger={
        variant === 'icon' ? (
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Delete ${itemLabel}`}
            disabled={mutation.isPending}
          >
            <Trash2 className="text-destructive" />
          </Button>
        ) : (
          <Button variant="outline" disabled={mutation.isPending}>
            <Trash2 className="text-destructive" /> Delete
          </Button>
        )
      }
    />
  );
}
