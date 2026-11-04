import { UsersTable } from '@/components/admin/users-table';
import { PageHeader } from '@/components/common/page-header';

export const metadata = { title: 'Users' };

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Registered users"
        description="Deactivated users are signed out immediately and cannot log in."
      />
      <UsersTable />
    </div>
  );
}
