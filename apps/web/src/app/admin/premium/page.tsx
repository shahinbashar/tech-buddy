import { EntitlementsTable } from '@/components/admin/entitlements-table';
import { GrantPremiumDialog } from '@/components/admin/grant-premium-dialog';
import { PageHeader } from '@/components/common/page-header';

export const metadata = { title: 'Premium access' };

export default function AdminPremiumPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Premium access"
        description="Grant or revoke premium entitlements. Payment-gateway purchases will appear here in the future."
        actions={<GrantPremiumDialog />}
      />
      <EntitlementsTable />
    </div>
  );
}
