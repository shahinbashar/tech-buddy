import { Crown, Info } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/common/page-header';
import { PlanCard } from '@/components/premium/plan-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { serverApi } from '@/lib/api-server';
import { CONTACT_EMAIL } from '@/lib/constants';
import { formatDate } from '@/lib/format';
import { getSessionUser } from '@/lib/session';
import type { MyPremiumAccess, PremiumPlan } from '@/types/api';

export const metadata: Metadata = {
  title: 'Premium',
  description: 'Affordable premium study materials for job seekers.',
};

export default async function PremiumPage() {
  const user = await getSessionUser();
  const [plans, access] = await Promise.all([
    serverApi<PremiumPlan[]>('/premium/plans'),
    user && user.role !== 'ADMIN'
      ? serverApi<MyPremiumAccess>('/premium/me')
      : Promise.resolve(null),
  ]);

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
      <PageHeader
        title="Go Premium"
        description="Free content stays free forever. Premium unlocks in-depth notes, extra question sets and premium exams at an affordable price."
      />

      {access?.hasPremium && (
        <Alert variant="success">
          <Crown />
          <AlertTitle>You already have Premium</AlertTitle>
          <AlertDescription>
            {access.activeUntil
              ? `Your access is valid until ${formatDate(access.activeUntil)}.`
              : 'You have lifetime access.'}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            highlighted={plan.code === 'quarterly'}
            action={
              <Button
                asChild
                className="w-full"
                variant={plan.code === 'quarterly' ? 'default' : 'outline'}
              >
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Premium ${plan.name} plan`)}`}
                >
                  Request {plan.name}
                </a>
              </Button>
            }
          />
        ))}
      </div>

      <Alert variant="info">
        <Info />
        <AlertTitle>How to get Premium right now</AlertTitle>
        <AlertDescription>
          <p>
            Online payment (bKash, Nagad, SSLCommerz) is coming soon. Until then, email us with your
            registered email address and the plan you want — an admin will activate your access
            after manual payment confirmation.
          </p>
          {!user && (
            <p>
              <Link href="/register" className="text-primary font-medium hover:underline">
                Create a free account
              </Link>{' '}
              first so we can attach Premium to it.
            </p>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}
