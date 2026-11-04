import { Badge } from '@/components/ui/badge';
import type { EntitlementStatus } from '@/types/api';

const VARIANTS: Record<EntitlementStatus, 'success' | 'secondary' | 'warning' | 'destructive'> = {
  active: 'success',
  scheduled: 'warning',
  expired: 'secondary',
  revoked: 'destructive',
};

export function EntitlementStatusBadge({ status }: { status: EntitlementStatus }) {
  return (
    <Badge variant={VARIANTS[status]} className="capitalize">
      {status}
    </Badge>
  );
}
