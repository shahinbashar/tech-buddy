'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type Control, Controller, useForm } from 'react-hook-form';
import { ExamConfigFields } from '@/components/admin/exam-config-fields';
import { NumberField } from '@/components/admin/form-fields';
import { SubjectCheckboxes } from '@/components/admin/subject-checkboxes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useAdminMutation } from '@/hooks/use-admin-mutation';
import { examSchema, type ExamFormValues, type ExamUpdateFormValues } from '@/lib/admin-schemas';
import { api } from '@/lib/api';
import { todayInDhaka } from '@/lib/format';
import type { AdminExam, ExamSettings } from '@/types/api';

export function ExamCreateForm({ settings }: { settings: ExamSettings }) {
  const router = useRouter();
  const form = useForm<ExamFormValues>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      title: '',
      description: '',
      type: 'DAILY',
      examDate: todayInDhaka(),
      questionCount: settings.questionCount,
      durationMinutes: settings.durationMinutes,
      marksPerQuestion: settings.marksPerQuestion,
      negativeMarking: settings.negativeMarking,
      allowMultipleAttempts: settings.allowMultipleAttempts,
      accessLevel: 'FREE',
      isPublished: false,
      subjectIds: [],
    },
  });

  const create = useAdminMutation<ExamFormValues, AdminExam>({
    mutationFn: ({ questionCount, subjectIds, title, description, ...rest }) =>
      api.post<AdminExam>('/admin/exams', {
        ...rest,
        title: title || null,
        description: description || null,
        selection: { questionCount, subjectIds },
      }),
    successMessage: (exam) => `Created “${exam.title}” with ${exam.questions.length} questions`,
    onSuccess: (exam) => router.push(`/admin/exams/${exam.id}`),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => create.mutate(values))}
        className="space-y-6"
        noValidate
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Exam details</CardTitle>
          </CardHeader>
          <CardContent>
            {/* The create schema is a superset of the update schema, so the shared fields apply. */}
            <ExamConfigFields control={form.control as unknown as Control<ExamUpdateFormValues>} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Question selection</CardTitle>
            <CardDescription>
              Questions are picked at random from the published question bank.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <NumberField
              control={form.control}
              name="questionCount"
              label="Number of questions"
              min={1}
              className="max-w-48"
            />
            <Controller
              control={form.control}
              name="subjectIds"
              render={({ field }) => (
                <SubjectCheckboxes value={field.value} onChange={field.onChange} />
              )}
            />
          </CardContent>
        </Card>
        <Button type="submit" disabled={create.isPending}>
          {create.isPending && <Loader2 className="animate-spin" />}
          Create exam
        </Button>
      </form>
    </Form>
  );
}
