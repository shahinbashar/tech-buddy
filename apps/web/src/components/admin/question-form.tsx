'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { SelectField, SwitchField, TextareaField, TextField } from '@/components/admin/form-fields';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QuestionOptionRow } from '@/components/admin/question-option-row';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useAdminMutation } from '@/hooks/use-admin-mutation';
import { useSubjectOptions, useTopicOptions } from '@/hooks/use-admin-options';
import { useDependentReset } from '@/hooks/use-dependent-reset';
import { emptyToNull, questionSchema, type QuestionFormValues } from '@/lib/admin-schemas';
import { api } from '@/lib/api';
import { ACCESS_LEVEL_OPTIONS, DIFFICULTY_OPTIONS } from '@/lib/constants';
import type { AdminQuestion } from '@/types/api';

const LETTERS = ['A', 'B', 'C', 'D'];

function defaults(question?: AdminQuestion): QuestionFormValues {
  const options = question?.options ?? [];
  return {
    subjectId: question?.subjectId ?? '',
    topicId: question?.topicId ?? null,
    text: question?.text ?? '',
    textBn: question?.textBn ?? '',
    difficulty: question?.difficulty ?? 'MEDIUM',
    options: LETTERS.map((_, i) => ({
      text: options[i]?.text ?? '',
      textBn: options[i]?.textBn ?? '',
    })),
    correctOptionIndex: question
      ? String(
          Math.max(
            0,
            options.findIndex((o) => o.isCorrect),
          ),
        )
      : '',
    explanation: question?.explanation ?? '',
    reference: question?.reference ?? '',
    accessLevel: question?.accessLevel ?? 'FREE',
    isPublished: question?.isPublished ?? true,
  };
}

export function QuestionForm({ question }: { question?: AdminQuestion }) {
  const router = useRouter();
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: defaults(question),
  });
  const subjectId = useWatch({ control: form.control, name: 'subjectId' });
  const correct = useWatch({ control: form.control, name: 'correctOptionIndex' });
  const subjectOptions = useSubjectOptions();
  const topics = useTopicOptions(subjectId);
  useDependentReset(form, 'topicId', topics.options, null, topics.isLoaded);

  const save = useAdminMutation<QuestionFormValues, AdminQuestion>({
    mutationFn: (values) => {
      const body = {
        ...emptyToNull({ ...values, options: undefined, correctOptionIndex: undefined }),
        options: values.options.map((o) => ({ text: o.text, textBn: o.textBn || null })),
        correctOptionIndex: Number(values.correctOptionIndex),
      };
      return question
        ? api.patch<AdminQuestion>(`/admin/questions/${question.id}`, body)
        : api.post<AdminQuestion>('/admin/questions', body);
    },
    successMessage: question ? 'Question saved' : 'Question created',
    onSuccess: (saved) => {
      if (question) form.reset(defaults(saved));
      else
        form.reset({
          ...defaults(),
          subjectId: saved.subjectId,
          topicId: saved.topicId,
          difficulty: saved.difficulty,
        });
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => save.mutate(values))}
        className="space-y-6"
        noValidate
      >
        <Card>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <SelectField
              control={form.control}
              name="subjectId"
              label="Subject"
              options={subjectOptions}
            />
            <SelectField
              control={form.control}
              name="topicId"
              label="Topic"
              options={topics.options}
              noneLabel="No specific topic"
            />
            <TextareaField
              control={form.control}
              name="text"
              label="Question"
              rows={3}
              className="md:col-span-2"
            />
            <TextareaField
              control={form.control}
              name="textBn"
              label="Question (Bangla, optional)"
              rows={2}
              className="md:col-span-2"
            />
            <SelectField
              control={form.control}
              name="difficulty"
              label="Difficulty"
              options={DIFFICULTY_OPTIONS}
            />
            <SelectField
              control={form.control}
              name="accessLevel"
              label="Access"
              options={ACCESS_LEVEL_OPTIONS}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Answer options</CardTitle>
            <CardDescription>Select the radio button next to the correct answer.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <FormField
              control={form.control}
              name="correctOptionIndex"
              render={() => (
                <FormItem>
                  <FormMessage />
                </FormItem>
              )}
            />
            {LETTERS.map((letter, index) => (
              <QuestionOptionRow
                key={letter}
                control={form.control}
                index={index}
                letter={letter}
                isCorrect={correct === String(index)}
                onMarkCorrect={() =>
                  form.setValue('correctOptionIndex', String(index), {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              />
            ))}
            <FormField
              control={form.control}
              name="options"
              render={() => (
                <FormItem>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="grid gap-4">
            <TextareaField
              control={form.control}
              name="explanation"
              label="Explanation"
              description="Shown to candidates after they submit."
            />
            <TextField
              control={form.control}
              name="reference"
              label="Reference / source (optional)"
              placeholder="e.g. BCC Assistant Programmer 2023"
            />
          </CardContent>
        </Card>

        <SwitchField
          control={form.control}
          name="isPublished"
          label="Published"
          description="Only published questions are used in exams"
        />
        <div className="flex gap-2">
          <Button type="submit" disabled={save.isPending}>
            {save.isPending && <Loader2 className="animate-spin" />}
            {question ? 'Save question' : 'Create question'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push('/admin/questions')}>
            Back to list
          </Button>
        </div>
      </form>
    </Form>
  );
}
