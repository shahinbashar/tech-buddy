import type { Metadata } from 'next';
import Link from 'next/link';
import { GoalPicker } from '@/components/auth/goal-picker';
import { PageHeader } from '@/components/common/page-header';
import { Button } from '@/components/ui/button';
import { requireUser } from '@/lib/session';

export const metadata: Metadata = { title: 'Choose your goal' };

export default async function OnboardingPage() {
  const user = await requireUser('/onboarding');
  return (
    <div className="mx-auto max-w-3xl space-y-6 py-6">
      <PageHeader
        title={`Welcome, ${user.fullName.split(' ')[0]}! What are you preparing for?`}
        description="We’ll use this to personalise your dashboard. You can change it anytime in your profile."
      />
      <GoalPicker initialGoal={user.preparationGoal} redirectTo="/dashboard" />
      <Button asChild variant="link" className="px-0">
        <Link href="/dashboard">Skip for now</Link>
      </Button>
    </div>
  );
}
