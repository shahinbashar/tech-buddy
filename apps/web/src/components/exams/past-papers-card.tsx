'use client';

import { useQuery } from '@tanstack/react-query';
import { FileClock, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { AccessBadge } from '@/components/common/access-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useStartPractice } from '@/hooks/use-start-practice';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/query-keys';
import type { PracticeSource } from '@/types/api';

/**
 * The API's largest practice set. Asking for it draws the whole paper (up to the cap): the
 * server only uses as many questions as the paper has.
 */
const WHOLE_PAPER = 50;

function PastPaperRow({
  source,
  starting,
  disabled,
  onStart,
}: {
  source: PracticeSource;
  /** This paper's set is being created. */
  starting: boolean;
  /** Any set is being created. */
  disabled: boolean;
  onStart: () => void;
}) {
  const locked = source.availableCount === 0;
  const partial = !locked && source.availableCount < source.questionCount;
  return (
    <li className="flex flex-wrap items-center justify-between gap-3 py-3">
      <div className="min-w-0">
        <p className="font-medium">{source.reference}</p>
        <p className="text-muted-foreground text-sm">
          {partial
            ? `${source.availableCount} of ${source.questionCount} questions available on your plan`
            : `${source.questionCount} questions`}
        </p>
      </div>
      {locked ? (
        <Link href="/premium" aria-label={`${source.reference} needs Premium`}>
          <AccessBadge level="PREMIUM" locked />
        </Link>
      ) : (
        <Button variant="outline" size="sm" disabled={disabled} onClick={onStart}>
          {starting && <Loader2 className="animate-spin" />}
          Practise paper
        </Button>
      )}
    </li>
  );
}

/** Previous-year (past) papers the user can practise as a whole set. */
export function PastPapersCard() {
  const practice = useStartPractice();
  const sources = useQuery({
    queryKey: queryKeys.practiceSources,
    queryFn: () => api.get<PracticeSource[]>('/practice/sources'),
  });

  if (sources.isSuccess && sources.data.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileClock className="text-primary size-5" aria-hidden /> Past papers
        </CardTitle>
        <CardDescription>
          Practise questions from earlier recruitment exams, one paper at a time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {sources.isPending ? (
          <div className="space-y-3" aria-busy>
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
          </div>
        ) : sources.isError ? (
          <p className="text-muted-foreground text-sm">Past papers could not be loaded.</p>
        ) : (
          <ul className="divide-y">
            {sources.data.map((source) => (
              <PastPaperRow
                key={source.reference}
                source={source}
                starting={practice.isPending && practice.variables?.reference === source.reference}
                disabled={practice.isPending}
                onStart={() =>
                  practice.mutate({
                    mode: 'random',
                    reference: source.reference,
                    questionCount: WHOLE_PAPER,
                  })
                }
              />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
