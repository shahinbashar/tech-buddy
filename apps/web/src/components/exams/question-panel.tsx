import { OptionButton } from '@/components/exams/option-button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { AttemptQuestion } from '@/types/api';

interface QuestionPanelProps {
  question: AttemptQuestion;
  index: number;
  total: number;
  selectedOptionId: string | null;
  onSelect: (optionId: string | null) => void;
}

export function QuestionPanel({
  question,
  index,
  total,
  selectedOptionId,
  onSelect,
}: QuestionPanelProps) {
  return (
    <Card>
      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-muted-foreground text-sm font-medium">
            Question {index + 1} of {total}
          </span>
          <Badge variant="secondary">{question.subjectName}</Badge>
        </div>
        <h2 className="text-lg leading-relaxed font-semibold">
          {question.text}
          {question.textBn && (
            <span className="text-muted-foreground mt-1 block text-base font-normal">
              {question.textBn}
            </span>
          )}
        </h2>
      </CardHeader>
      <CardContent className="space-y-3">
        <div
          role="radiogroup"
          aria-label={`Answer options for question ${index + 1}`}
          className="space-y-3"
        >
          {question.options.map((option, optionIndex) => (
            <OptionButton
              key={option.id}
              option={option}
              index={optionIndex}
              selected={selectedOptionId === option.id}
              onSelect={() => onSelect(option.id)}
            />
          ))}
        </div>
        {selectedOptionId && (
          <button
            type="button"
            className="text-muted-foreground text-sm underline-offset-4 hover:underline"
            onClick={() => onSelect(null)}
          >
            Clear answer
          </button>
        )}
      </CardContent>
    </Card>
  );
}
