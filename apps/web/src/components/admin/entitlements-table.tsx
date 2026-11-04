'use client';

import { Ban } from 'lucide-react';
import { DataTableCard } from '@/components/admin/data-table-card';
import { FilterSelect } from '@/components/admin/filter-select';
import { SearchInput } from '@/components/admin/search-input';
import { ConfirmDialog } from '@/components/common/confirm-dialog';
import { EntitlementStatusBadge } from '@/components/premium/entitlement-status-badge';
import { Button } from '@/components/ui/button';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { useAdminMutation } from '@/hooks/use-admin-mutation';
import { useListQuery } from '@/hooks/use-list-query';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/format';
import { queryKeys } from '@/lib/query-keys';
import type { Entitlement } from '@/types/api';

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

function EntitlementRow({ entitlement }: { entitlement: Entitlement }) {
  const revocable = entitlement.status === 'active' || entitlement.status === 'scheduled';
  return (
    <TableRow>
      <TableCell className="max-w-56">
        <p className="truncate font-medium">{entitlement.user.fullName}</p>
        <p className="text-muted-foreground truncate text-xs">{entitlement.user.email}</p>
      </TableCell>
      <TableCell>
        {entitlement.plan?.name ?? 'Custom'}
        {entitlement.note && (
          <p className="text-muted-foreground max-w-40 truncate text-xs">{entitlement.note}</p>
        )}
      </TableCell>
      <TableCell className="whitespace-nowrap">{formatDate(entitlement.startsAt)}</TableCell>
      <TableCell className="whitespace-nowrap">
        {entitlement.expiresAt ? formatDate(entitlement.expiresAt) : 'Never'}
      </TableCell>
      <TableCell>
        <EntitlementStatusBadge status={entitlement.status} />
      </TableCell>
      <TableCell className="text-sm">{entitlement.grantedBy?.fullName ?? '—'}</TableCell>
      <TableCell className="text-right">
        {revocable && <RevokeButton entitlement={entitlement} />}
      </TableCell>
    </TableRow>
  );
}

export function EntitlementsTable() {
  const list = useListQuery<Entitlement>({
    endpoint: '/admin/entitlements',
    queryKey: queryKeys.admin.entitlements,
  });
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <SearchInput
          value={list.search}
          onChange={list.setSearch}
          placeholder="Search by user name or email…"
        />
        <FilterSelect
          value={list.filters.status}
          onChange={list.setFilter('status')}
          options={STATUS_OPTIONS}
          allLabel="All statuses"
        />
      </div>
      <DataTableCard
        query={list.query}
        onPageChange={list.setPage}
        emptyTitle="No premium grants yet"
        emptyDescription="Grant access from here or from the Users page."
        columns={
          <>
            <TableHead>User</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Starts</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Granted by</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </>
        }
      >
        {list.query.data?.items.map((entitlement) => (
          <EntitlementRow key={entitlement.id} entitlement={entitlement} />
        ))}
      </DataTableCard>
    </div>
  );
}
