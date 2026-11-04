'use client';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { ApiError } from '@/lib/api-error';
import { queryKeys } from '@/lib/query-keys';
import type { User } from '@/types/api';

/**
 * Central handling for an expired/revoked session: any 401 while we believe the visitor is
 * signed in sends them to the login page (once), returning them to where they were.
 */
function handleUnauthorized(client: QueryClient, error: unknown) {
  if (!(error instanceof ApiError) || !error.isUnauthorized) return;
  if (!client.getQueryData<User | null>(queryKeys.me)) return; // signed-out flows (e.g. login)
  client.setQueryData(queryKeys.me, null);
  toast.error('Your session has ended. Please log in again.');
  const next = `${window.location.pathname}${window.location.search}`;
  window.location.assign(`/login?next=${encodeURIComponent(next)}`);
}

function createQueryClient(initialUser: User | null) {
  const client: QueryClient = new QueryClient({
    queryCache: new QueryCache({ onError: (error) => handleUnauthorized(client, error) }),
    mutationCache: new MutationCache({ onError: (error) => handleUnauthorized(client, error) }),
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) =>
          !(error instanceof ApiError && error.status >= 400 && error.status < 500) &&
          failureCount < 2,
      },
      mutations: { retry: false },
    },
  });
  client.setQueryData(queryKeys.me, initialUser);
  return client;
}

export function Providers({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: User | null;
}) {
  const [client] = useState(() => createQueryClient(initialUser));
  return (
    <QueryClientProvider client={client}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
