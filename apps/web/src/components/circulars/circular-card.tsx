import { Building2, CalendarClock, Star, Users } from 'lucide-react';
import Link from 'next/link';
import { DeadlineBadge } from '@/components/circulars/deadline-badge';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { CIRCULAR_CATEGORY_LABELS } from '@/lib/constants';
import { formatDateTime } from '@/lib/format';
import type { CircularSummary } from '@/types/api';

export function CircularCard({ circular }: { circular: CircularSummary }) {
  return (
    <Card className="group hover:border-primary/40 gap-0 py-0 transition-colors hover:shadow-md">
      <Link href={`/circulars/${circular.slug}`} className="flex h-full flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <DeadlineBadge circular={circular} />
          <Badge variant="secondary">{CIRCULAR_CATEGORY_LABELS[circular.category]}</Badge>
          {circular.isFeatured && (
            <Badge variant="premium">
              <Star aria-hidden /> Featured
            </Badge>
          )}
        </div>
        <div>
          <h3 className="group-hover:text-primary text-lg leading-snug font-semibold">
            {circular.title}
          </h3>
          <p className="text-muted-foreground mt-1 flex items-start gap-1.5 text-sm">
            <Building2 className="mt-0.5 size-4 shrink-0" aria-hidden />
            <span>
              {circular.organizationName}
              {circular.organizationNameBn && (
                <span className="block">{circular.organizationNameBn}</span>
              )}
            </span>
          </p>
        </div>
        <div className="text-muted-foreground mt-auto flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <span className="flex items-center gap-1.5">
            <CalendarClock className="size-4" aria-hidden /> Deadline:{' '}
            {formatDateTime(circular.applicationDeadline)}
          </span>
          {circular.vacancies !== null && (
            <span className="flex items-center gap-1.5">
              <Users className="size-4" aria-hidden /> {circular.vacancies} posts
            </span>
          )}
        </div>
      </Link>
    </Card>
  );
}
