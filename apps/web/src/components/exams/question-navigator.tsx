import { cn } from '@/lib/utils';
import type { AttemptQuestion } from '@/types/api';

interface QuestionNavigatorProps {
  questions: AttemptQuestion[];
  answers: Record<string, string | null>;
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export function QuestionNavigator({
  questions,
  answers,
  currentIndex,
  onNavigate,
}: QuestionNavigatorProps) {
  const answered = questions.filter((q) => answers[q.answerId]).length;
  return (
    <div className="bg-card space-y-3 rounded-xl border p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Questions</span>
        <span className="text-muted-foreground">
          {answered}/{questions.length} answered
        </span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {questions.map((question, index) => {
          const isAnswered = Boolean(answers[question.answerId]);
          const isCurrent = index === currentIndex;
          return (
            <button
              key={question.answerId}
              type="button"
              onClick={() => onNavigate(index)}
              aria-current={isCurrent ? 'step' : undefined}
              aria-label={`Question ${index + 1}${isAnswered ? ', answered' : ', not answered'}`}
              className={cn(
                'flex h-9 items-center justify-center rounded-md border text-sm font-medium transition-colors',
                isAnswered ? 'bg-success text-success-foreground border-success' : 'hover:bg-muted',
                isCurrent && 'ring-primary ring-2 ring-offset-1',
              )}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
      <div className="text-muted-foreground flex gap-4 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="bg-success size-3 rounded-sm" aria-hidden /> Answered
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded-sm border" aria-hidden /> Unanswered
        </span>
      </div>
    </div>
  );
}
