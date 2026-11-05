import { BriefcaseBusiness } from 'lucide-react';
import Link from 'next/link';
import { DeadlineBadge } from '@/components/circulars/deadline-badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CIRCULAR_CATEGORY_LABELS, PREPARATION_GOAL_LABELS } from '@/lib/constants';
import type { UserDashboard } from '@/types/api';

/** Open circulars that match the user's goal and aren't saved yet. Hidden when there are none. */
export function RecommendedCircularsCard({
  circulars,
  goal,
}: {
  circulars: UserDashboard['recommendedCirculars'];
  goal: UserDashboard['preparationGoal'];
}) {
  if (!circulars.length) return null;
  return (
    <Card className="gap-2">
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div>
          <CardTitle className="flex items-center gap-2">
            <BriefcaseBusiness className="text-primary size-5" aria-hidden />
            {goal ? 'Circulars for you' : 'Open circulars'}
          </CardTitle>
          <CardDescription>
            {goal
              ? `Open now for ${PREPARATION_GOAL_LABELS[goal]}, closing soonest first`
              : 'Open now, closing soonest first'}
          </CardDescription>
        </div>
        <Link
          href="/circulars"
          className="text-primary shrink-0 text-sm font-medium hover:underline"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <ul className="divide-y">
          {circulars.map((circular) => (
            <li
              key={circular.id}
              className="flex flex-wrap items-center justify-between gap-2 py-3"
            >
              <div className="min-w-0">
                <Link
                  href={`/circulars/${circular.slug}`}
                  className="hover:text-primary font-medium"
                >
                  {circular.title}
                </Link>
                <p className="text-muted-foreground text-sm">
                  {circular.organizationName} · {CIRCULAR_CATEGORY_LABELS[circular.category]}
                </p>
              </div>
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
      </CardContent>
    </Card>
  );
}
