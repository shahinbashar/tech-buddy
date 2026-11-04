'use client';

import { Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DeleteButton } from '@/components/admin/delete-button';
import { ExamQuestionList } from '@/components/admin/exam-question-list';
import { ExamUpdateForm } from '@/components/admin/exam-update-form';
import { RegenerateQuestionsDialog } from '@/components/admin/regenerate-questions-dialog';
import { ResourceEditor } from '@/components/admin/resource-editor';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatIsoDate } from '@/lib/format';
import { queryKeys } from '@/lib/query-keys';
import type { AdminExam } from '@/types/api';

export function ExamManager({ id }: { id: string }) {
  const router = useRouter();
  return (
    <ResourceEditor<AdminExam>
      queryKey={queryKeys.admin.exam(id)}
      endpoint={`/admin/exams/${id}`}
      title="Manage exam"
      description={(exam) =>
        `${exam.title} · ${formatIsoDate(exam.examDate)} · ${exam.attemptCount} attempt(s)`
      }
      actions={(exam) =>
        exam.attemptCount === 0 && (
          <DeleteButton
            endpoint={`/admin/exams/${exam.id}`}
            itemLabel="Exam"
            variant="button"
            onDeleted={() => router.push('/admin/exams')}
          />
        )
      }
    >
      {(exam) => (
        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <ExamUpdateForm key={exam.updatedAt} exam={exam} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Questions ({exam.questions.length})</CardTitle>
              {exam.attemptCount === 0 && (
                <CardAction>
                  <RegenerateQuestionsDialog
                    examId={exam.id}
                    currentCount={exam.questions.length}
                  />
                </CardAction>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {exam.attemptCount > 0 && (
                <Alert variant="info">
                  <Info />
                  <AlertDescription>
                    Questions are locked because candidates have attempted this exam.
                  </AlertDescription>
                </Alert>
              )}
              <ExamQuestionList questions={exam.questions} />
            </CardContent>
          </Card>
        </div>
      )}
    </ResourceEditor>
  );
}
