'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import {
  MarkdownField,
  NumberField,
  SelectField,
  SwitchField,
  TextareaField,
  TextField,
} from '@/components/admin/form-fields';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useAdminMutation } from '@/hooks/use-admin-mutation';
import { useSubjectOptions, useTopicOptions } from '@/hooks/use-admin-options';
import { useDependentReset } from '@/hooks/use-dependent-reset';
import { emptyToNull, noteSchema, type NoteFormValues } from '@/lib/admin-schemas';
import { api } from '@/lib/api';
import { ACCESS_LEVEL_OPTIONS } from '@/lib/constants';
import type { AdminNote } from '@/types/api';

function defaults(note?: AdminNote): NoteFormValues {
  return {
    subjectId: note?.topic.subjectId ?? '',
    topicId: note?.topicId ?? '',
    title: note?.title ?? '',
    summary: note?.summary ?? '',
    content: note?.content ?? '',
    accessLevel: note?.accessLevel ?? 'FREE',
    isPublished: note?.isPublished ?? false,
    order: note?.order ?? 0,
  };
}

export function NoteForm({ note }: { note?: AdminNote }) {
  const router = useRouter();
  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: defaults(note),
  });
  const subjectId = useWatch({ control: form.control, name: 'subjectId' });
  const subjectOptions = useSubjectOptions();
  const topics = useTopicOptions(subjectId);
  useDependentReset(form, 'topicId', topics.options, '', topics.isLoaded);

  const save = useAdminMutation<NoteFormValues, AdminNote>({
    mutationFn: ({ subjectId: _subjectId, ...values }) => {
      const body = emptyToNull(values);
      return note
        ? api.patch<AdminNote>(`/admin/notes/${note.id}`, body)
        : api.post<AdminNote>('/admin/notes', body);
    },
    successMessage: note ? 'Note saved' : 'Note created — you can now attach files',
    onSuccess: (saved) => {
      if (!note) router.push(`/admin/notes/${saved.id}`);
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
              placeholder={subjectId ? 'Select topic…' : 'Choose a subject first'}
            />
            <TextField
              control={form.control}
              name="title"
              label="Title"
              className="md:col-span-2"
            />
            <TextareaField
              control={form.control}
              name="summary"
              label="Summary"
              rows={2}
              className="md:col-span-2"
            />
            <SelectField
              control={form.control}
              name="accessLevel"
              label="Access"
              options={ACCESS_LEVEL_OPTIONS}
            />
            <NumberField control={form.control} name="order" label="Display order" min={0} />
          </CardContent>
        </Card>
        <MarkdownField control={form.control} name="content" label="Content" rows={20} />
        <SwitchField control={form.control} name="isPublished" label="Published" />
        <div className="flex gap-2">
          <Button type="submit" disabled={save.isPending}>
            {save.isPending && <Loader2 className="animate-spin" />}
            {note ? 'Save note' : 'Create note'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push('/admin/notes')}>
            Back to list
          </Button>
        </div>
      </form>
    </Form>
  );
}
