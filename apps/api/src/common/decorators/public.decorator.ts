import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Marks a route as accessible without authentication.
 * If a valid token is present, `request.user` is still populated (used to unlock premium content).
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
