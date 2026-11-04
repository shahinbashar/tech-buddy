import { BellRing } from 'lucide-react';
import Link from 'next/link';
import { DeadlineBadge } from '@/components/circulars/deadline-badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { UserDashboard } from '@/types/api';

/** Reminder for saved circulars whose deadline is within 7 days. Renders nothing otherwise. */
export function ClosingSoonCard({ circulars }: { circulars: UserDashboard['savedClosingSoon'] }) {
  if (!circulars.length) return null;
  return (
    <Alert variant="warning">
      <BellRing />
      <AlertTitle>Saved circulars closing soon</AlertTitle>
      <AlertDescription>
        <ul className="mt-1 w-full space-y-1.5">
          {circulars.map((circular) => (
            <li key={circular.id} className="flex flex-wrap items-center justify-between gap-2">
              <Link
                href={`/circulars/${circular.slug}`}
                className="text-foreground font-medium hover:underline"
              >
                {circular.title} · {circular.organizationName}
              </Link>
              <DeadlineBadge
                circular={{
                  status: 'open',
                  applicationStartDate: circular.applicationDeadline,
                  applicationDeadline: circular.applicationDeadline,
                }}
              />
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
