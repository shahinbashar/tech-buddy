import { NextResponse, type NextRequest } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/lib/constants';

/**
 * UX-level guard: redirects visitors without a session cookie to the login page.
 * Real authorization (validity, roles, premium) is enforced by the API.
 */
export function middleware(request: NextRequest) {
  if (request.cookies.has(AUTH_COOKIE_NAME)) return NextResponse.next();
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('next', `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/exams/:path*',
    '/profile/:path*',
    '/onboarding/:path*',
    '/admin/:path*',
  ],
};
