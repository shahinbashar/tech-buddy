import 'server-only';
import { cookies, headers } from 'next/headers';
import { ApiError, toApiError } from './api-error';
import { toQueryString } from './api';
import { AUTH_COOKIE_NAME } from './constants';

const API_URL = process.env.API_URL ?? 'http://localhost:4000';

/**
 * Server-side fetch to the API. Forwards:
 * - the visitor's auth cookie, so premium content and progress resolve for the signed-in user;
 * - the visitor's IP (X-Forwarded-For), so API rate limits apply per visitor rather than to
 *   the Next.js server as a whole.
 */
export async function serverApi<T>(
  path: string,
  query?: Record<string, string | number | boolean | undefined>,
): Promise<T> {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const forwardedFor = headerStore.get('x-forwarded-for');
  const response = await fetch(`${API_URL}/api${path}${toQueryString(query)}`, {
    headers: {
      ...(token ? { Cookie: `${AUTH_COOKIE_NAME}=${token}` } : {}),
      ...(forwardedFor ? { 'X-Forwarded-For': forwardedFor } : {}),
    },
    cache: 'no-store',
  });
  if (!response.ok) throw await toApiError(response);
  return (await response.json()) as T;
}

/** Like serverApi but returns null for 404 (to render notFound()) and 401. */
export async function serverApiOrNull<T>(path: string): Promise<T | null> {
  try {
    return await serverApi<T>(path);
  } catch (error) {
    if (error instanceof ApiError && (error.isNotFound || error.isUnauthorized)) return null;
    throw error;
  }
}
