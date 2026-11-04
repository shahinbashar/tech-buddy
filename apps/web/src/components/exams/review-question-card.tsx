import { Lightbulb } from 'lucide-react';
import { ReviewOption } from '@/components/exams/review-option';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DIFFICULTY_LABELS } from '@/lib/constants';
import type { ResultQuestion } from '@/types/api';

function StatusBadge({ isCorrect }: { isCorrect: boolean | null }) {
  if (isCorrect === true) return <Badge variant="success">Correct</Badge>;
  if (isCorrect === false) return <Badge variant="destructive">Incorrect</Badge>;
  return <Badge variant="secondary">Unanswered</Badge>;
}

export function ReviewQuestionCard({
  question,
  index,
}: {
  question: ResultQuestion;
  index: number;
}) {
  return (
    <Card className="gap-4">
      <CardHeader className="gap-2">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold">Q{index + 1}.</span>
          <StatusBadge isCorrect={question.isCorrect} />
          <Badge variant="outline">{question.subjectName}</Badge>
          {question.topicName && <Badge variant="outline">{question.topicName}</Badge>}
          <Badge variant="outline">{DIFFICULTY_LABELS[question.difficulty]}</Badge>
        </div>
        <p className="font-medium">
          {question.text}
          {question.textBn && (
            <span className="text-muted-foreground block font-normal">{question.textBn}</span>
          )}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <ul className="space-y-2">
          {question.options.map((option, optionIndex) => (
            <ReviewOption
              key={option.id}
              option={option}
              index={optionIndex}
              isCorrect={option.id === question.correctOptionId}
              isSelected={option.id === question.selectedOptionId}
            />
          ))}
        </ul>
        <div className="bg-primary/5 flex gap-3 rounded-lg p-3 text-sm">
          <Lightbulb className="text-primary mt-0.5 size-4 shrink-0" aria-hidden />
          <p>
            <span className="font-semibold">Explanation: </span>
            {question.explanation}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
