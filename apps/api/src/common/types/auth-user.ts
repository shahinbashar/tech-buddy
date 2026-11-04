import { type Role } from '@prisma/client';

/** The authenticated principal attached to `request.user` by the JWT guard. */
export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: Role;
}

export interface JwtPayload {
  sub: string;
  role: Role;
  /** User.sessionVersion at issue time; a mismatch means the session was revoked. */
  sv: number;
  /** Present only on refresh tokens, which must never be accepted as access tokens. */
  typ?: 'refresh';
}

export const AUTH_COOKIE_NAME = 'tb_access_token';
