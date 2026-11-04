import { CheckCircle2, Clock, HelpCircle, Target, XCircle } from 'lucide-react';
import { StatCard } from '@/components/common/stat-card';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatDuration, formatNumber, formatPercent } from '@/lib/format';
import type { AttemptResultSummary } from '@/types/api';

function verdict(percentage: number) {
  if (percentage >= 80) return { title: 'Excellent work!', tone: 'text-success' };
  if (percentage >= 60) return { title: 'Good job — keep going', tone: 'text-primary' };
  if (percentage >= 40)
    return { title: 'Fair attempt — review the explanations', tone: 'text-warning-foreground' };
  return { title: 'Keep practising — every attempt counts', tone: 'text-destructive' };
}

export function ResultSummary({ result }: { result: AttemptResultSummary }) {
  const { title, tone } = verdict(result.percentage);
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className={`text-lg font-semibold ${tone}`}>{title}</p>
            <p className="text-muted-foreground text-sm">
              You scored {formatNumber(result.obtainedMarks)} out of{' '}
              {formatNumber(result.totalMarks)} marks.
            </p>
          </div>
          <div className="w-full space-y-1 sm:w-64">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Score</span>
              <span className="text-2xl font-bold">{formatPercent(result.percentage)}</span>
            </div>
            <Progress value={result.percentage} aria-label="Score" />
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Correct" value={result.correctCount} icon={CheckCircle2} tone="success" />
        <StatCard label="Incorrect" value={result.incorrectCount} icon={XCircle} tone="warning" />
        <StatCard label="Unanswered" value={result.unansweredCount} icon={HelpCircle} />
        <StatCard
          label="Accuracy"
          value={formatPercent(result.accuracy)}
          icon={Target}
          hint="Of answered questions"
        />
        <StatCard label="Time spent" value={formatDuration(result.timeSpentSeconds)} icon={Clock} />
      </div>
    </div>
  );
}
