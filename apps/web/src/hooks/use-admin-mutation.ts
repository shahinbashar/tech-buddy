'use client';

import { type QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { errorMessage } from '@/lib/api-error';
import { queryKeys } from '@/lib/query-keys';

interface AdminMutationOptions<TVariables, TResult> {
  mutationFn: (variables: TVariables) => Promise<TResult>;
  successMessage?: string | ((result: TResult, variables: TVariables) => string);
  /** Extra keys to invalidate; all admin queries are invalidated by default. */
  invalidate?: QueryKey[];
  onSuccess?: (result: TResult, variables: TVariables) => void;
}

/** Standard admin write: toast on success/failure and refresh admin caches. */
export function useAdminMutation<TVariables = void, TResult = unknown>({
  mutationFn,
  successMessage,
  invalidate = [],
  onSuccess,
}: AdminMutationOptions<TVariables, TResult>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: (result, variables) => {
      if (successMessage) {
        toast.success(
          typeof successMessage === 'function' ? successMessage(result, variables) : successMessage,
        );
      }
      [queryKeys.admin.all, ...invalidate].forEach(
        (queryKey) => void queryClient.invalidateQueries({ queryKey }),
      );
      onSuccess?.(result, variables);
    },
    onError: (error) => toast.error(errorMessage(error)),
  });
}
