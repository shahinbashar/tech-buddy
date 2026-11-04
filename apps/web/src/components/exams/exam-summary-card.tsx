import Link from 'next/link';
import { AccessBadge } from '@/components/common/access-badge';
import { ExamActionButton } from '@/components/exams/exam-action-button';
import { ExamMeta } from '@/components/exams/exam-meta';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatPercent } from '@/lib/format';
import type { ExamCard } from '@/types/api';

export function ExamSummaryCard({
  exam,
  featured = false,
}: {
  exam: ExamCard;
  featured?: boolean;
}) {
  return (
    <Card className={featured ? 'border-primary/40 shadow-md' : undefined}>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{exam.type === 'DAILY' ? 'Daily exam' : 'Model test'}</Badge>
            <AccessBadge level={exam.accessLevel} locked={exam.isLocked} />
            {exam.bestPercentage !== null && (
              <Badge variant="success">Best: {formatPercent(exam.bestPercentage)}</Badge>
            )}
          </div>
          <Link
            href={`/exams/${exam.id}`}
            className="hover:text-primary block text-lg font-semibold"
          >
            {exam.title}
          </Link>
          {exam.description && <p className="text-muted-foreground text-sm">{exam.description}</p>}
          <ExamMeta exam={exam} />
        </div>
        <div className="shrink-0">
          <ExamActionButton exam={exam} size={featured ? 'lg' : 'default'} />
        </div>
      </CardContent>
    </Card>
  );
}
