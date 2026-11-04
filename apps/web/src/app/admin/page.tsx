import { AdminOverview } from '@/components/admin/admin-overview';
import { PageHeader } from '@/components/common/page-header';

export const metadata = { title: 'Overview' };

export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Admin dashboard" description="Content and user activity at a glance." />
      <AdminOverview />
    </div>
  );
}
