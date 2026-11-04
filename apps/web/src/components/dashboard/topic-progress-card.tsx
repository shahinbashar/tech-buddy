import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { UserDashboard } from '@/types/api';

export function TopicProgressCard({ data }: { data: UserDashboard['topicProgress'] }) {
  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle className="text-base">Topic completion</CardTitle>
        <CardDescription>Topics you have marked as completed</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((subject) => {
          const percent = subject.total ? Math.round((subject.completed / subject.total) * 100) : 0;
          return (
            <Link
              key={subject.subjectId}
              href={`/subjects/${subject.subjectSlug}`}
              className="block space-y-1.5"
            >
              <div className="flex justify-between text-sm">
                <span className="font-medium">{subject.subjectName}</span>
                <span className="text-muted-foreground">
                  {subject.completed}/{subject.total}
                </span>
              </div>
              <Progress
                value={percent}
                indicatorClassName="bg-success"
                aria-label={`${subject.subjectName}: ${percent}%`}
              />
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
