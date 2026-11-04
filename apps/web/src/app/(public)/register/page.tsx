import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AuthCard } from '@/components/auth/auth-card';
import { RegisterForm } from '@/components/auth/register-form';
import { getSessionUser } from '@/lib/session';

export const metadata: Metadata = { title: 'Create account' };

export default async function RegisterPage() {
  if (await getSessionUser()) redirect('/dashboard');
  return (
    <AuthCard
      title="Create your free account"
      description="Practise every day, track weak topics and never miss a circular."
      footer={
        <span>
          Already registered?{' '}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Log in
          </Link>
        </span>
      }
    >
      <RegisterForm />
    </AuthCard>
  );
}
