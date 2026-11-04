import { BookOpen, Cpu } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SUBJECT_CATEGORY_LABELS } from '@/lib/constants';
import type { SubjectSummary } from '@/types/api';

export function SubjectCard({
  subject,
  showProgress,
}: {
  subject: SubjectSummary;
  showProgress: boolean;
}) {
  const Icon = subject.category === 'TECHNICAL' ? Cpu : BookOpen;
  const percent = subject.topicCount
    ? Math.round((subject.completedCount / subject.topicCount) * 100)
    : 0;
  return (
    <Card className="group hover:border-primary/40 gap-0 py-0 transition-colors hover:shadow-md">
      <Link href={`/subjects/${subject.slug}`} className="flex h-full flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <span className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
            <Icon className="size-5" aria-hidden />
          </span>
          <Badge variant={subject.category === 'TECHNICAL' ? 'default' : 'secondary'}>
            {SUBJECT_CATEGORY_LABELS[subject.category]}
          </Badge>
        </div>
        <div>
          <h3 className="group-hover:text-primary text-lg font-semibold">{subject.name}</h3>
          {subject.nameBn && <p className="text-muted-foreground text-sm">{subject.nameBn}</p>}
        </div>
        {subject.description && (
          <p className="text-muted-foreground line-clamp-2 text-sm">{subject.description}</p>
        )}
        <div className="mt-auto space-y-2 pt-2 text-sm">
          <span className="text-muted-foreground">
            {showProgress
              ? `${subject.completedCount} of ${subject.topicCount} topics completed`
              : `${subject.topicCount} topic${subject.topicCount === 1 ? '' : 's'}`}
          </span>
          {showProgress && <Progress value={percent} aria-label={`${percent}% complete`} />}
        </div>
      </Link>
    </Card>
  );
}
