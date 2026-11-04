'use client';

import { useQuery } from '@tanstack/react-query';
import { History } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { EmptyState } from '@/components/common/empty-state';
import { ErrorState } from '@/components/common/error-state';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { Pager } from '@/components/common/pager';
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
import { api } from '@/lib/api';
import { formatDateTime, formatDuration, formatNumber, formatPercent } from '@/lib/format';
import { queryKeys } from '@/lib/query-keys';
import type { AttemptHistoryItem, Paginated } from '@/types/api';

export function AttemptHistory() {
  const [page, setPage] = useState(1);
  const { data, error, isPending, refetch } = useQuery({
    queryKey: queryKeys.history(page),
    queryFn: () => api.get<Paginated<AttemptHistoryItem>>('/attempts', { page, pageSize: 15 }),
  });

  if (isPending) return <ListSkeleton rows={6} />;
  if (error) return <ErrorState error={error} onRetry={() => void refetch()} />;
  if (!data.items.length) {
    return (
      <EmptyState
        icon={History}
        title="No exams taken yet"
        description="Your submitted exams will appear here with scores and accuracy."
        action={
          <Button asChild>
            <Link href="/exams">Take today’s exam</Link>
          </Button>
        }
      />
    );
  }

  return (
    <Card className="py-2">
      <CardContent className="px-2 sm:px-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Exam</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Marks</TableHead>
              <TableHead className="text-right">Score</TableHead>
              <TableHead className="text-right">Accuracy</TableHead>
              <TableHead className="text-right">Time</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.map((attempt) => (
              <TableRow key={attempt.id}>
                <TableCell className="max-w-56 truncate font-medium">{attempt.examTitle}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {formatDateTime(attempt.submittedAt)}
                </TableCell>
                <TableCell className="text-right">
                  {formatNumber(attempt.obtainedMarks)}/{formatNumber(attempt.totalMarks)}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {formatPercent(attempt.percentage)}
                </TableCell>
                <TableCell className="text-right">{formatPercent(attempt.accuracy)}</TableCell>
                <TableCell className="text-right">
                  {formatDuration(attempt.timeSpentSeconds)}
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild size="sm" variant="ghost">
                    <Link href={`/exams/results/${attempt.id}`}>Review</Link>
                  </Button>
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
  );
}
