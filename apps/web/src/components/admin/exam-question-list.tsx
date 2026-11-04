import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { AccessBadge } from '@/components/common/access-badge';
import { Badge } from '@/components/ui/badge';
import { DIFFICULTY_LABELS } from '@/lib/constants';
import type { AdminQuestion } from '@/types/api';

export function ExamQuestionList({ questions }: { questions: AdminQuestion[] }) {
  return (
    <ol className="space-y-3">
      {questions.map((question, index) => (
        <li key={question.id} className="rounded-lg border p-3 text-sm">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="font-semibold">Q{index + 1}.</span>
            <Badge variant="outline">{question.subject.name}</Badge>
            <Badge variant="outline">{DIFFICULTY_LABELS[question.difficulty]}</Badge>
            <AccessBadge level={question.accessLevel} />
            <Link
              href={`/admin/questions/${question.id}`}
              className="text-primary ml-auto text-xs hover:underline"
            >
              Edit
            </Link>
          </div>
          <p className="font-medium">{question.text}</p>
          <p className="text-success mt-1 flex items-center gap-1.5 text-xs">
            <CheckCircle2 className="size-3.5" aria-hidden />
            {question.options.find((o) => o.isCorrect)?.text}
          </p>
        </li>
      ))}
    </ol>
  );
}
