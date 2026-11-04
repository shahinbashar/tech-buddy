import { plainToInstance, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @IsIn(['development', 'production', 'test'])
  NODE_ENV: 'development' | 'production' | 'test' = 'development';

  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @Max(65535)
  PORT = 4000;

  @IsString()
  @IsOptional()
  CORS_ORIGINS?: string;

  /** Number of reverse proxies in front of the API (Next.js rewrite = 1). Used for client IPs. */
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  @Max(5)
  TRUST_PROXY_HOPS = 1;

  /** Swagger UI; enabled by default outside production. */
  @Transform(({ value }) => (value === undefined ? undefined : value === true || value === 'true'))
  @IsBoolean()
  @IsOptional()
  ENABLE_SWAGGER?: boolean;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  @MinLength(32, { message: 'JWT_SECRET must be at least 32 characters long' })
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRES_IN = '7d';

  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  COOKIE_SECURE = false;

  @IsString()
  UPLOAD_DIR = 'uploads';

  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @Max(50)
  MAX_UPLOAD_MB = 10;
}

export type AppConfig = EnvironmentVariables;

export function validateEnv(config: Record<string, unknown>): AppConfig {
  const validated = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: false,
    exposeDefaultValues: true,
  });
  const errors = validateSync(validated, { skipMissingProperties: false });
  if (errors.length > 0) {
    const details = errors
      .map((error) => Object.values(error.constraints ?? {}).join(', '))
      .join('\n  - ');
    throw new Error(`Invalid environment configuration:\n  - ${details}`);
  }
  return validated;
}
