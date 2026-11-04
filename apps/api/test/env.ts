import { config } from 'dotenv';

/**
 * E2E tests run against an isolated Postgres schema so they never touch dev data.
 * Override with E2E_DATABASE_URL in CI.
 */
config({ path: '.env' });

function testDatabaseUrl(): string {
  if (process.env.E2E_DATABASE_URL) return process.env.E2E_DATABASE_URL;
  const url = new URL(process.env.DATABASE_URL ?? '');
  url.searchParams.set('schema', 'e2e');
  return url.toString();
}

process.env.DATABASE_URL = testDatabaseUrl();
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET ??= 'e2e-secret-e2e-secret-e2e-secret-e2e';
process.env.UPLOAD_DIR = 'uploads-e2e';
