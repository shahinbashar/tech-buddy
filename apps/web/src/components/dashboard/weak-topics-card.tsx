import { BookOpen, Target } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPercent } from '@/lib/format';
import type { UserDashboard } from '@/types/api';

type WeakTopic = UserDashboard['weakTopics'][number];

function WeakTopicRow({ topic }: { topic: WeakTopic }) {
  const href =
    topic.subjectSlug && topic.topicSlug
      ? `/subjects/${topic.subjectSlug}/${topic.topicSlug}`
      : null;
  return (
    <li className="flex items-center justify-between gap-3 py-2.5">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{topic.topicName}</p>
        <p className="text-muted-foreground text-xs">
          {topic.subjectName} · {topic.correct}/{topic.answered} correct
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Badge variant="destructive">{formatPercent(topic.accuracy)}</Badge>
        {href && (
          <Button asChild size="sm" variant="ghost" aria-label={`Revise ${topic.topicName}`}>
            <Link href={href}>
              <BookOpen /> Revise
            </Link>
          </Button>
        )}
      </div>
    </li>
  );
}

export function WeakTopicsCard({ topics }: { topics: WeakTopic[] }) {
  return (
    <Card id="weak-topics" className="scroll-mt-24 gap-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Target className="text-destructive size-4" aria-hidden /> Weak topics
        </CardTitle>
        <CardDescription>
          Below 70% accuracy (at least 3 answers) — revise these first
        </CardDescription>
      </CardHeader>
      <CardContent>
        {topics.length ? (
          <ul className="divide-y">
            {topics.map((topic) => (
              <WeakTopicRow key={topic.topicId} topic={topic} />
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
