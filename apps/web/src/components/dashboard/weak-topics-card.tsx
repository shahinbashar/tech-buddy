import { Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPercent } from '@/lib/format';
import type { UserDashboard } from '@/types/api';

export function WeakTopicsCard({ topics }: { topics: UserDashboard['weakTopics'] }) {
  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Target className="text-destructive size-4" aria-hidden /> Weak topics
        </CardTitle>
        <CardDescription>Topics below 70% accuracy (min. 3 answers)</CardDescription>
      </CardHeader>
      <CardContent>
        {topics.length ? (
          <ul className="divide-y">
            {topics.map((topic) => (
              <li key={topic.topicId} className="flex items-center justify-between gap-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{topic.topicName}</p>
                  <p className="text-muted-foreground text-xs">
                    {topic.subjectName} · {topic.correct}/{topic.answered} correct
                  </p>
                </div>
                <Badge variant="destructive">{formatPercent(topic.accuracy)}</Badge>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm">
            No weak topics detected yet. Keep taking daily exams — we’ll highlight topics that need
            revision.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
