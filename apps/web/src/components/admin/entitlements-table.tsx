'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Ban } from 'lucide-react';
import { useState } from 'react';
import { FilterSelect } from '@/components/admin/filter-select';
import { SearchInput } from '@/components/admin/search-input';
import { ConfirmDialog } from '@/components/common/confirm-dialog';
import { EmptyState } from '@/components/common/empty-state';
import { ErrorState } from '@/components/common/error-state';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { Pager } from '@/components/common/pager';
import { EntitlementStatusBadge } from '@/components/premium/entitlement-status-badge';
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
import { useAdminMutation } from '@/hooks/use-admin-mutation';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/format';
import { queryKeys } from '@/lib/query-keys';
import type { Entitlement, Paginated } from '@/types/api';

const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Expired / revoked' },
];

function RevokeButton({ entitlement }: { entitlement: Entitlement }) {
  const revoke = useAdminMutation<void>({
    mutationFn: () => api.post(`/admin/entitlements/${entitlement.id}/revoke`),
    successMessage: 'Access revoked',
  });
  return (
    <ConfirmDialog
      title="Revoke premium access?"
      description={`${entitlement.user.fullName} will lose access to premium content immediately.`}
      confirmLabel="Revoke"
      destructive
      onConfirm={() => revoke.mutate()}
      trigger={
        <Button variant="ghost" size="sm" disabled={revoke.isPending}>
          <Ban className="text-destructive" /> Revoke
        </Button>
      }
    />
  );
}

export function EntitlementsTable() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>();
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebouncedValue(search);
  const params = { search: debouncedSearch, status, page, pageSize: 20 };
  const { data, error, isPending, refetch } = useQuery({
    queryKey: queryKeys.admin.entitlements(params),
    queryFn: () => api.get<Paginated<Entitlement>>('/admin/entitlements', params),
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
          placeholder="Search by user name or email…"
        />
        <FilterSelect
          value={status}
          onChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          options={STATUS_OPTIONS}
          allLabel="All statuses"
        />
      </div>
      {isPending ? (
        <ListSkeleton />
      ) : error ? (
        <ErrorState error={error} onRetry={() => void refetch()} />
      ) : data.items.length === 0 ? (
        <EmptyState
          title="No premium grants yet"
          description="Grant access from here or from the Users page."
        />
      ) : (
        <Card className="py-2">
          <CardContent className="px-2 sm:px-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Starts</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Granted by</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((entitlement) => (
                  <TableRow key={entitlement.id}>
                    <TableCell className="max-w-56">
                      <p className="truncate font-medium">{entitlement.user.fullName}</p>
                      <p className="text-muted-foreground truncate text-xs">
                        {entitlement.user.email}
                      </p>
                    </TableCell>
                    <TableCell>
                      {entitlement.plan?.name ?? 'Custom'}
                      {entitlement.note && (
                        <p className="text-muted-foreground max-w-40 truncate text-xs">
                          {entitlement.note}
                        </p>
                      )}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatDate(entitlement.startsAt)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {entitlement.expiresAt ? formatDate(entitlement.expiresAt) : 'Never'}
                    </TableCell>
                    <TableCell>
                      <EntitlementStatusBadge status={entitlement.status} />
                    </TableCell>
                    <TableCell className="text-sm">
                      {entitlement.grantedBy?.fullName ?? '—'}
                    </TableCell>
                    <TableCell className="text-right">
                      {(entitlement.status === 'active' || entitlement.status === 'scheduled') && (
                        <RevokeButton entitlement={entitlement} />
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
