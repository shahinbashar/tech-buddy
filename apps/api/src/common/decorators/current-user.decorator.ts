import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { type Request } from 'express';
import { type AuthUser } from '../types/auth-user';

/** Injects the authenticated user (or `undefined` on public routes without a session). */
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthUser | undefined => {
    const request = context.switchToHttp().getRequest<Request & { user?: AuthUser }>();
    return request.user;
  },
);
