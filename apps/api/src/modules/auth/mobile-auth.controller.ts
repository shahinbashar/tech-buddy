import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Public } from '../../common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';

/**
 * Token-based auth for native clients (no cookies). Returns an access token for the
 * `Authorization: Bearer` header plus a rotating refresh token. Web keeps using the
 * httpOnly-cookie endpoints in AuthController.
 */
@ApiTags('auth (mobile)')
@Public()
@Throttle({ default: { ttl: 60_000, limit: 10 } })
@Controller('auth/mobile')
export class MobileAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto, { withRefreshToken: true });
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto, { withRefreshToken: true });
  }

  @Throttle({ default: { ttl: 60_000, limit: 30 } })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto.refreshToken);
  }
}
