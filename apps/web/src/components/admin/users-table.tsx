'use client';

import { Crown } from 'lucide-react';
import { DataTableCard } from '@/components/admin/data-table-card';
import { FilterSelect } from '@/components/admin/filter-select';
import { GrantPremiumDialog } from '@/components/admin/grant-premium-dialog';
import { SearchInput } from '@/components/admin/search-input';
import { ToggleSwitch } from '@/components/admin/toggle-switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { useCurrentUser } from '@/hooks/use-auth';
import { useListQuery } from '@/hooks/use-list-query';
import { PREPARATION_GOAL_LABELS } from '@/lib/constants';
import { formatDate } from '@/lib/format';
import { queryKeys } from '@/lib/query-keys';
import type { AdminUserRow } from '@/types/api';

const ROLE_OPTIONS = [
  { value: 'USER', label: 'Users' },
  { value: 'ADMIN', label: 'Admins' },
];

function UserRow({ user, isSelf }: { user: AdminUserRow; isSelf: boolean }) {
  return (
    <TableRow>
      <TableCell className="max-w-64">
        <p className="flex items-center gap-2 truncate font-medium">
          {user.fullName}
          {user.role === 'ADMIN' && <Badge>Admin</Badge>}
        </p>
        <p className="text-muted-foreground truncate text-xs">
          {user.email}
          {user.phone && ` · ${user.phone}`}
        </p>
      </TableCell>
      <TableCell className="text-sm">
        {user.preparationGoal ? PREPARATION_GOAL_LABELS[user.preparationGoal] : '—'}
      </TableCell>
      <TableCell className="whitespace-nowrap">{formatDate(user.createdAt)}</TableCell>
      <TableCell className="text-right">{user.examsTaken}</TableCell>
      <TableCell className="text-right">{user.topicsCompleted}</TableCell>
      <TableCell>
        {user.hasPremium ? (
          <Badge variant="premium">Premium</Badge>
        ) : (
          <Badge variant="secondary">Free</Badge>
        )}
      </TableCell>
      <TableCell>
        {!isSelf && (
          <ToggleSwitch
            endpoint={`/admin/users/${user.id}/status`}
            field="isActive"
            checked={user.isActive}
            label={`Activate ${user.fullName}`}
            successMessage={(next) =>
              next ? 'Account activated' : 'Account deactivated and signed out'
            }
          />
        )}
      </TableCell>
      <TableCell className="text-right">
        {user.role === 'USER' && (
          <GrantPremiumDialog
            user={user}
            trigger={
              <Button variant="ghost" size="sm">
                <Crown /> Grant
              </Button>
            }
          />
        )}
      </TableCell>
    </TableRow>
  );
}

export function UsersTable() {
  const { data: me } = useCurrentUser();
  const list = useListQuery<AdminUserRow>({
    endpoint: '/admin/users',
    queryKey: queryKeys.admin.users,
  });
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <SearchInput
          value={list.search}
          onChange={list.setSearch}
          placeholder="Search name, email or phone…"
        />
        <FilterSelect
          value={list.filters.role}
          onChange={list.setFilter('role')}
          options={ROLE_OPTIONS}
          allLabel="All roles"
        />
      </div>
      <DataTableCard
        query={list.query}
        onPageChange={list.setPage}
        emptyTitle="No users found"
        columns={
          <>
            <TableHead>User</TableHead>
            <TableHead>Goal</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Exams</TableHead>
            <TableHead className="text-right">Topics</TableHead>
            <TableHead>Access</TableHead>
            <TableHead>Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </>
        }
      >
        {list.query.data?.items.map((user) => (
          <UserRow key={user.id} user={user} isSelf={user.id === me?.id} />
        ))}
      </DataTableCard>
    </div>
  );
}
