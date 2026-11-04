'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { ApiError, errorMessage } from '@/lib/api-error';
import { queryKeys } from '@/lib/query-keys';
import type { User } from '@/types/api';

async function fetchMe(): Promise<User | null> {
  try {
    return await api.get<User>('/auth/me');
  } catch (error) {
    if (error instanceof ApiError && error.isUnauthorized) return null;
    throw error;
  }
}

/** Current user (seeded from the server-rendered layout, so no loading flash). */
export function useCurrentUser() {
  return useQuery({ queryKey: queryKeys.me, queryFn: fetchMe, staleTime: 5 * 60_000 });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: () => api.post<void>('/auth/logout'),
    onSuccess: () => {
      queryClient.clear();
      queryClient.setQueryData(queryKeys.me, null);
      toast.success('You have been logged out');
      router.push('/');
      router.refresh();
    },
    onError: (error) => toast.error(errorMessage(error)),
  });
}
