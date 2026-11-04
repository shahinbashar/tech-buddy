import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { type Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { AUTH_COOKIE_NAME, type AuthUser, type JwtPayload } from '../types/auth-user';

type AuthenticatedRequest = Request & { user?: AuthUser };

/**
 * Global guard: every route requires a valid JWT unless marked `@Public()`.
 * Accepts the token from the httpOnly cookie (browser) or a Bearer header (Swagger / API clients).
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractToken(request);

    if (!token) {
      if (isPublic) return true;
      throw new UnauthorizedException('Authentication required');
    }

    const user = await this.resolveUser(token);
    if (user) {
      request.user = user;
      return true;
    }
    if (isPublic) return true;
    throw new UnauthorizedException('Session expired or invalid. Please log in again.');
  }

  private extractToken(request: Request): string | undefined {
    const cookies = request.cookies as Record<string, string | undefined> | undefined;
    const cookieToken = cookies?.[AUTH_COOKIE_NAME];
    if (cookieToken) return cookieToken;
    const [scheme, value] = request.headers.authorization?.split(' ') ?? [];
    return scheme === 'Bearer' && value ? value : undefined;
  }

  private async resolveUser(token: string): Promise<AuthUser | null> {
    let payload: JwtPayload;
    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      if (payload.typ === 'refresh') return null;
    } catch {
      // Invalid/expired tokens are an expected condition, not an error to log.
      return null;
    }
    // Load from DB so deactivation and role changes take effect immediately.
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        isActive: true,
        sessionVersion: true,
      },
    });
    if (!user?.isActive || user.sessionVersion !== payload.sv) return null;
    return { id: user.id, email: user.email, fullName: user.fullName, role: user.role };
  }
}
