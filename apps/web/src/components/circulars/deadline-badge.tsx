import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { deadlineInfo } from '@/lib/format';
import type { CircularSummary } from '@/types/api';

type DeadlineFields = Pick<
  CircularSummary,
  'status' | 'applicationStartDate' | 'applicationDeadline'
>;

export function DeadlineBadge({ circular }: { circular: DeadlineFields }) {
  const { label, tone } = deadlineInfo(circular);
  return (
    <Badge variant={tone}>
      <Clock aria-hidden />
      {label}
    </Badge>
  );
}
