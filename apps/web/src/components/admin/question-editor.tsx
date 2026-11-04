'use client';

import { QuestionForm } from '@/components/admin/question-form';
import { ResourceEditor } from '@/components/admin/resource-editor';
import { queryKeys } from '@/lib/query-keys';
import type { AdminQuestion } from '@/types/api';

export function QuestionEditor({ id }: { id: string }) {
  return (
    <ResourceEditor<AdminQuestion>
      queryKey={queryKeys.admin.question(id)}
      endpoint={`/admin/questions/${id}`}
      title="Edit question"
      description={(q) =>
        `${q.subject.name}${q.topic ? ` › ${q.topic.title}` : ''} · Past exam results are unaffected by edits.`
      }
    >
      {(question) => <QuestionForm key={question.id} question={question} />}
    </ResourceEditor>
  );
}
