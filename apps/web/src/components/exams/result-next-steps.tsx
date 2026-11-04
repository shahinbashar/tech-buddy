import { LayoutDashboard, RotateCcw, Target } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ResultNextStepsProps {
  examId: string;
  canRetake: boolean;
  hasMistakes: boolean;
}

/** What to do after an exam: review weak topics, retake (if allowed) or return to the dashboard. */
export function ResultNextSteps({ examId, canRetake, hasMistakes }: ResultNextStepsProps) {
  return (
    <Card className="bg-primary/5 border-primary/20 gap-0 py-4">
      <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          {hasMistakes
            ? 'Read the explanations below, then revise your weak topics before the next exam.'
            : 'Great work! Keep your streak going with tomorrow’s exam.'}
        </p>
        <div className="flex flex-wrap gap-2">
          {hasMistakes && (
            <Button asChild size="sm">
              <Link href="/dashboard#weak-topics">
                <Target /> Weak topics
              </Link>
            </Button>
          )}
          {canRetake && (
            <Button asChild size="sm" variant="outline">
              <Link href={`/exams/${examId}`}>
                <RotateCcw /> Retake
              </Link>
            </Button>
          )}
          <Button asChild size="sm" variant="ghost">
            <Link href="/dashboard">
              <LayoutDashboard /> Dashboard
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
