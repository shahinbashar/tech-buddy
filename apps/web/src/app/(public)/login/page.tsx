import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { AuthCard } from '@/components/auth/auth-card';
import { LoginForm } from '@/components/auth/login-form';
import { getSessionUser } from '@/lib/session';

export const metadata: Metadata = { title: 'Log in' };

export default async function LoginPage() {
  if (await getSessionUser()) redirect('/dashboard');
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
