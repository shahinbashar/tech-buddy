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
import { emptyToNull, topicSchema, type TopicFormValues } from '@/lib/admin-schemas';
import { api } from '@/lib/api';
import { ACCESS_LEVEL_OPTIONS } from '@/lib/constants';
import type { AdminTopic } from '@/types/api';

function defaults(topic?: AdminTopic): TopicFormValues {
  return {
    subjectId: topic?.subjectId ?? '',
    parentId: topic?.parentId ?? null,
    title: topic?.title ?? '',
    description: topic?.description ?? '',
    content: topic?.content ?? '',
    accessLevel: topic?.accessLevel ?? 'FREE',
    isPublished: topic?.isPublished ?? false,
    order: topic?.order ?? 0,
  };
}

export function TopicForm({ topic }: { topic?: AdminTopic }) {
  const router = useRouter();
  const form = useForm<TopicFormValues>({
    resolver: zodResolver(topicSchema),
    defaultValues: defaults(topic),
  });
  const subjectId = useWatch({ control: form.control, name: 'subjectId' });
  const subjectOptions = useSubjectOptions();
  const parentTopics = useTopicOptions(subjectId, { rootsOnly: true });
  const parentOptions = parentTopics.options.filter((o) => o.value !== topic?.id);
  useDependentReset(form, 'parentId', parentOptions, null, parentTopics.isLoaded);

  const save = useAdminMutation<TopicFormValues, AdminTopic>({
    mutationFn: (values) => {
      const body = emptyToNull(values);
      return topic
        ? api.patch<AdminTopic>(`/admin/topics/${topic.id}`, body)
        : api.post<AdminTopic>('/admin/topics', body);
    },
    successMessage: topic ? 'Topic updated' : 'Topic created',
    onSuccess: (saved) => {
      if (!topic) router.push(`/admin/topics/${saved.id}`);
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
              name="parentId"
              label="Parent topic"
              options={parentOptions}
              noneLabel="None (top-level topic)"
              description="Choose a parent to make this a subtopic."
            />
            <TextField
              control={form.control}
              name="title"
              label="Title"
              className="md:col-span-2"
            />
            <TextareaField
              control={form.control}
              name="description"
              label="Short description"
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
        <MarkdownField
          control={form.control}
          name="content"
          label="Overview content (optional)"
          rows={12}
        />
        <SwitchField
          control={form.control}
          name="isPublished"
          label="Published"
          description="Visible on public study pages"
        />
        <div className="flex gap-2">
          <Button type="submit" disabled={save.isPending}>
            {save.isPending && <Loader2 className="animate-spin" />}
            {topic ? 'Save changes' : 'Create topic'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push('/admin/topics')}>
            Back to list
          </Button>
        </div>
      </form>
    </Form>
  );
}
