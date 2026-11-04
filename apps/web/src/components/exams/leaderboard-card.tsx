'use client';

import { useQuery } from '@tanstack/react-query';
import { Medal, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';
import { formatDuration, formatNumber, formatPercent } from '@/lib/format';
import { queryKeys } from '@/lib/query-keys';
import { cn } from '@/lib/utils';
import type { Leaderboard, LeaderboardEntry } from '@/types/api';

const MEDAL_COLORS = ['text-yellow-500', 'text-slate-400', 'text-amber-700'];

function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  return (
    <li
      className={cn(
        'flex items-center gap-3 rounded-md px-2 py-2 text-sm',
        entry.isMe && 'bg-primary/10 font-medium',
      )}
    >
      <span className="flex w-7 justify-center">
        {entry.rank <= 3 ? (
          <Medal
            className={cn('size-5', MEDAL_COLORS[entry.rank - 1])}
            aria-label={`Rank ${entry.rank}`}
          />
        ) : (
          <span className="text-muted-foreground">{entry.rank}</span>
        )}
      </span>
      <span className="flex-1 truncate">
        {entry.name}
        {entry.isMe && <span className="text-primary"> (you)</span>}
      </span>
      <span className="text-muted-foreground hidden text-xs sm:inline">
        {formatDuration(entry.timeSpentSeconds)}
      </span>
      <span className="w-20 text-right font-semibold">
        {formatNumber(entry.obtainedMarks)} marks
      </span>
    </li>
  );
}

/** Merit list for an exam (first attempts only) with the viewer's rank and percentile. */
export function LeaderboardCard({ examId }: { examId: string }) {
  const { data, isPending, isError } = useQuery({
    queryKey: queryKeys.leaderboard(examId),
    queryFn: () => api.get<Leaderboard>(`/exams/${examId}/leaderboard`),
  });
  if (isError) return null;

  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Trophy className="text-premium size-4" aria-hidden /> Merit list
        </CardTitle>
        <CardDescription>
          Ranked by marks, then time taken. Only first attempts count.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {isPending ? (
          <Skeleton className="h-40 w-full" />
        ) : (
          <>
            {data.me && (
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span>
                  Your rank: <strong>#{data.me.rank}</strong> of {data.participants}
                </span>
                <Badge variant="success">Top {formatPercent(data.me.topPercent)}</Badge>
              </div>
            )}
            <ol className="space-y-1">
              {data.top.map((entry) => (
                <LeaderboardRow key={`${entry.rank}-${entry.name}-${entry.isMe}`} entry={entry} />
              ))}
            </ol>
            {data.me && !data.top.some((e) => e.isMe) && (
              <ol className="border-t pt-1">
                <LeaderboardRow entry={data.me} />
              </ol>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
