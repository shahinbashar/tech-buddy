import type { Metadata } from 'next';
import { PageHeader } from '@/components/common/page-header';
import { DashboardOverview } from '@/components/dashboard/dashboard-overview';
import { PREPARATION_GOAL_LABELS } from '@/lib/constants';
import { requireUser } from '@/lib/session';

export const metadata: Metadata = { title: 'Dashboard' };

export default async function DashboardPage() {
  const user = await requireUser('/dashboard');
  return (
    <div className="space-y-6">
      <PageHeader
        title={`Hello, ${user.fullName.split(' ')[0]}`}
        description={
          user.preparationGoal
            ? `Preparing for: ${PREPARATION_GOAL_LABELS[user.preparationGoal]}`
            : 'Here is how your preparation is going.'
        }
      />
      <DashboardOverview needsGoal={!user.preparationGoal} />
    </div>
  );
}
