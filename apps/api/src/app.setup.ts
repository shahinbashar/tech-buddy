import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { type ServerResponse } from 'node:http';
import { resolve } from 'node:path';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { AUTH_COOKIE_NAME } from './common/types/auth-user';
import { type AppConfig } from './config/env.validation';

/**
 * Applies the global HTTP pipeline. Shared by main.ts and the e2e tests so tests run
 * against exactly the same prefix, validation, error mapping and security headers.
 */
export function configureApp(app: NestExpressApplication): void {
  const config = app.get(ConfigService<AppConfig, true>);

  app.setGlobalPrefix('api');
  app.set('trust proxy', config.get('TRUST_PROXY_HOPS', { infer: true }));
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.use(cookieParser());

  const origins = (config.get('CORS_ORIGINS', { infer: true }) ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  app.enableCors({ origin: origins, credentials: true });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );
  app.useGlobalFilters(new PrismaExceptionFilter());

  app.useStaticAssets(resolve(config.get('UPLOAD_DIR', { infer: true })), {
    prefix: '/uploads/',
    index: false,
    dotfiles: 'deny',
    setHeaders: (res: ServerResponse) => res.setHeader('X-Content-Type-Options', 'nosniff'),
  });

  const swaggerEnabled =
    config.get('ENABLE_SWAGGER', { infer: true }) ??
    config.get('NODE_ENV', { infer: true }) !== 'production';
  if (swaggerEnabled) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Tech Buddy API')
      .setDescription('Bangladesh job preparation & career portal — REST API')
      .setVersion('0.1.0')
      .addBearerAuth()
      .addCookieAuth(AUTH_COOKIE_NAME)
      .build();
    SwaggerModule.setup('api/docs', app, () => SwaggerModule.createDocument(app, swaggerConfig));
  }
}
