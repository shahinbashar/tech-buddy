'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { ExamConfigFields } from '@/components/admin/exam-config-fields';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useAdminMutation } from '@/hooks/use-admin-mutation';
import { examUpdateSchema, type ExamUpdateFormValues } from '@/lib/admin-schemas';
import { api } from '@/lib/api';
import type { AdminExam } from '@/types/api';

export function ExamUpdateForm({ exam }: { exam: AdminExam }) {
  const form = useForm<ExamUpdateFormValues>({
    resolver: zodResolver(examUpdateSchema),
    defaultValues: {
      title: exam.title,
      description: exam.description ?? '',
      type: exam.type,
      examDate: exam.examDate,
      durationMinutes: exam.durationMinutes,
      marksPerQuestion: exam.marksPerQuestion,
      negativeMarking: exam.negativeMarking,
      allowMultipleAttempts: exam.allowMultipleAttempts,
      accessLevel: exam.accessLevel,
      isPublished: exam.isPublished,
    },
  });
  const save = useAdminMutation<ExamUpdateFormValues>({
    mutationFn: (values) =>
      api.patch(`/admin/exams/${exam.id}`, { ...values, description: values.description || null }),
    successMessage: 'Exam updated',
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => save.mutate(values))}
        className="space-y-4"
        noValidate
      >
        <ExamConfigFields control={form.control} />
        <Button type="submit" disabled={save.isPending}>
          {save.isPending && <Loader2 className="animate-spin" />}
          Save exam
        </Button>
      </form>
    </Form>
  );
}
