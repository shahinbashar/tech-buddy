import { execSync } from 'node:child_process';
import './env';

/**
 * Applies migrations to the isolated e2e schema. Non-destructive (`migrate deploy`);
 * tests create uniquely named data per run, so existing rows never collide.
 */
export default function globalSetup(): void {
  execSync('npx prisma migrate deploy', { stdio: 'inherit', env: process.env });
}
