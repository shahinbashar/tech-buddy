/** Normalized error for every failed API call. */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly details: string[] = [],
  ) {
    super(message);
    this.name = 'ApiError';
  }

  get isUnauthorized() {
    return this.status === 401;
  }

  get isForbidden() {
    return this.status === 403;
  }

  get isNotFound() {
    return this.status === 404;
  }
}

interface ErrorBody {
  message?: string | string[];
}

export async function toApiError(response: Response): Promise<ApiError> {
  let body: ErrorBody = {};
  try {
    body = (await response.json()) as ErrorBody;
  } catch {
    // Non-JSON error body (e.g. proxy error page) — fall back to status text.
  }
  const details = Array.isArray(body.message) ? body.message : [];
  const message =
    (Array.isArray(body.message) ? body.message[0] : body.message) ??
    (response.status >= 500
      ? 'Something went wrong on our side. Please try again.'
      : response.statusText);
  return new ApiError(response.status, message, details);
}

/** User-facing message for any thrown value. */
export function errorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 429) return 'Too many requests. Please wait a moment and try again.';
    return error.message;
  }
  if (error instanceof TypeError) return 'Network error. Check your connection and try again.';
  return 'Something went wrong. Please try again.';
}
