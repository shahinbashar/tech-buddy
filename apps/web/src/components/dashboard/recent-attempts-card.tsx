import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDateTime, formatNumber, formatPercent } from '@/lib/format';
import type { UserDashboard } from '@/types/api';

export function RecentAttemptsCard({ attempts }: { attempts: UserDashboard['recentAttempts'] }) {
  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle className="text-base">Recent exams</CardTitle>
        <CardAction>
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard/history">View all</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {attempts.length ? (
          <ul className="divide-y">
            {attempts.map((attempt) => (
              <li key={attempt.id}>
                <Link
                  href={`/exams/results/${attempt.id}`}
                  className="hover:bg-muted/50 -mx-2 flex items-center justify-between gap-3 rounded-md px-2 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{attempt.examTitle}</p>
                    <p className="text-muted-foreground text-xs">
                      {formatDateTime(attempt.submittedAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{formatPercent(attempt.percentage)}</p>
                    <p className="text-muted-foreground text-xs">
                      {formatNumber(attempt.obtainedMarks)}/{formatNumber(attempt.totalMarks)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm">You haven’t taken any exams yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
