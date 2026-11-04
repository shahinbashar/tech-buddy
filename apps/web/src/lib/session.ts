import 'server-only';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { serverApiOrNull } from './api-server';
import type { User } from '@/types/api';

/** Current user for this request (deduplicated across layouts and pages). */
export const getSessionUser = cache(async (): Promise<User | null> => {
  try {
    return await serverApiOrNull<User>('/auth/me');
  } catch (error) {
    // The API being unreachable must not take the whole site down; treat as signed out.
    console.error('Failed to resolve session user:', error);
    return null;
  }
});

export async function requireUser(nextPath: string): Promise<User> {
  const user = await getSessionUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  return user;
}

export async function requireAdmin(): Promise<User> {
  const user = await requireUser('/admin');
  if (user.role !== 'ADMIN') redirect('/dashboard');
  return user;
}
