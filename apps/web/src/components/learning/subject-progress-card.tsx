import { CheckCircle2, Circle } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { ProgressOverview } from '@/types/api';

export function SubjectProgressCard({
  subject,
}: {
  subject: ProgressOverview['subjects'][number];
}) {
  const percent = subject.totalTopics
    ? Math.round((subject.completedTopics / subject.totalTopics) * 100)
    : 0;
  return (
    <Card className="gap-4">
      <CardHeader className="gap-2">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base">
            <Link href={`/subjects/${subject.slug}`} className="hover:text-primary">
              {subject.name}
            </Link>
          </CardTitle>
          <span className="text-muted-foreground text-sm">
            {subject.completedTopics}/{subject.totalTopics} · {percent}%
          </span>
        </div>
        <Progress value={percent} indicatorClassName="bg-success" />
      </CardHeader>
      <CardContent>
        <ul className="grid gap-1 sm:grid-cols-2">
          {subject.topics.map((topic) => (
            <li key={topic.id}>
              <Link
                href={`/subjects/${subject.slug}/${topic.slug}`}
                className={cn(
                  'hover:bg-muted flex items-center gap-2 rounded-md px-2 py-1.5 text-sm',
                  topic.parentId && 'pl-6',
                )}
              >
                {topic.isCompleted ? (
                  <CheckCircle2 className="text-success size-4 shrink-0" aria-label="Completed" />
                ) : (
                  <Circle className="text-muted-foreground size-4 shrink-0" aria-label="Pending" />
                )}
                <span className={cn('truncate', topic.isCompleted && 'text-muted-foreground')}>
                  {topic.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
