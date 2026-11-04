import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { AuthCard } from '@/components/auth/auth-card';
import { LoginForm } from '@/components/auth/login-form';
import { getSessionUser } from '@/lib/session';
import { safeRedirect } from '@/lib/validation';

export const metadata: Metadata = { title: 'Log in' };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const user = await getSessionUser();
  if (user) {
    const fallback = user.role === 'ADMIN' ? '/admin' : '/dashboard';
    redirect(safeRedirect((await searchParams).next, fallback));
  }
  return (
    <AuthCard
      title="Welcome back"
      description="Log in to take daily exams and track your preparation."
      footer={
        <span>
          New here?{' '}
          <Link href="/register" className="text-primary font-medium hover:underline">
            Create an account
          </Link>
        </span>
      }
    >
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthCard>
  );
}
