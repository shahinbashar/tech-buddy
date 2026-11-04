import { Crown, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { AccessLevel } from '@/types/api';

export function AccessBadge({ level, locked = false }: { level: AccessLevel; locked?: boolean }) {
  if (level === 'FREE') return <Badge variant="success">Free</Badge>;
  return (
    <Badge variant="premium">
      {locked ? <Lock aria-hidden /> : <Crown aria-hidden />}
      Premium
    </Badge>
  );
}
