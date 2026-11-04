'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Crown } from 'lucide-react';
import { useState } from 'react';
import { FilterSelect } from '@/components/admin/filter-select';
import { GrantPremiumDialog } from '@/components/admin/grant-premium-dialog';
import { SearchInput } from '@/components/admin/search-input';
import { ToggleSwitch } from '@/components/admin/toggle-switch';
import { EmptyState } from '@/components/common/empty-state';
import { ErrorState } from '@/components/common/error-state';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { Pager } from '@/components/common/pager';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCurrentUser } from '@/hooks/use-auth';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { api } from '@/lib/api';
import { PREPARATION_GOAL_LABELS } from '@/lib/constants';
import { formatDate } from '@/lib/format';
import { queryKeys } from '@/lib/query-keys';
import type { AdminUserRow, Paginated } from '@/types/api';

const ROLE_OPTIONS = [
  { value: 'USER', label: 'Users' },
  { value: 'ADMIN', label: 'Admins' },
];

export function UsersTable() {
  const { data: me } = useCurrentUser();
  const [search, setSearch] = useState('');
  const [role, setRole] = useState<string>();
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebouncedValue(search);
  const params = { search: debouncedSearch, role, page, pageSize: 20 };
  const { data, error, isPending, refetch } = useQuery({
    queryKey: queryKeys.admin.users(params),
    queryFn: () => api.get<Paginated<AdminUserRow>>('/admin/users', params),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <SearchInput
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          placeholder="Search name, email or phone…"
        />
        <FilterSelect
          value={role}
          onChange={(value) => {
            setRole(value);
            setPage(1);
          }}
          options={ROLE_OPTIONS}
          allLabel="All roles"
        />
      </div>
      {isPending ? (
        <ListSkeleton />
      ) : error ? (
        <ErrorState error={error} onRetry={() => void refetch()} />
      ) : data.items.length === 0 ? (
        <EmptyState title="No users found" />
      ) : (
        <Card className="py-2">
          <CardContent className="px-2 sm:px-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Goal</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Exams</TableHead>
                  <TableHead className="text-right">Topics</TableHead>
                  <TableHead>Access</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((user) => (
                  <TableRow key={user.id}>
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
                    <TableCell className="whitespace-nowrap">
                      {formatDate(user.createdAt)}
                    </TableCell>
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
                      {user.id !== me?.id && (
                        <ToggleSwitch
                          endpoint={`/admin/users/${user.id}/status`}
                          field="isActive"
                          checked={user.isActive}
                          label={`Activate ${user.fullName}`}
                          successMessage={(next) =>
                            next ? 'Account activated' : 'Account deactivated'
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
                ))}
              </TableBody>
            </Table>
            <div className="px-2">
              <Pager
                page={data.meta.page}
                totalPages={data.meta.totalPages}
                total={data.meta.total}
                onPageChange={setPage}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
