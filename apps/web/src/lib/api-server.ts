import 'server-only';
import { cookies } from 'next/headers';
import { ApiError, toApiError } from './api-error';
import { toQueryString } from './api';
import { AUTH_COOKIE_NAME } from './constants';

const API_URL = process.env.API_URL ?? 'http://localhost:4000';

/**
 * Server-side fetch to the API that forwards the visitor's auth cookie, so premium
 * content and progress flags are resolved for the signed-in user during SSR.
 */
export async function serverApi<T>(
  path: string,
  query?: Record<string, string | number | boolean | undefined>,
): Promise<T> {
  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
  const response = await fetch(`${API_URL}/api${path}${toQueryString(query)}`, {
    headers: token ? { Cookie: `${AUTH_COOKIE_NAME}=${token}` } : undefined,
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
