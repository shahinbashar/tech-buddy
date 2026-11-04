'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  NumberField,
  SelectField,
  SwitchField,
  TextareaField,
  TextField,
} from '@/components/admin/form-fields';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useAdminMutation } from '@/hooks/use-admin-mutation';
import { emptyToNull, subjectSchema, type SubjectFormValues } from '@/lib/admin-schemas';
import { api } from '@/lib/api';
import { SUBJECT_CATEGORY_LABELS } from '@/lib/constants';
import type { AdminSubject } from '@/types/api';

const CATEGORY_OPTIONS = Object.entries(SUBJECT_CATEGORY_LABELS).map(([value, label]) => ({
  value,
  label,
}));

function defaults(subject?: AdminSubject): SubjectFormValues {
  return {
    name: subject?.name ?? '',
    nameBn: subject?.nameBn ?? '',
    description: subject?.description ?? '',
    category: subject?.category ?? 'GENERAL',
    order: subject?.order ?? 0,
    isPublished: subject?.isPublished ?? true,
  };
}

export function SubjectFormDialog({
  subject,
  trigger,
}: {
  subject?: AdminSubject;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectSchema),
    defaultValues: defaults(subject),
  });
  const save = useAdminMutation<SubjectFormValues>({
    mutationFn: (values) =>
      subject
        ? api.patch(`/admin/subjects/${subject.id}`, emptyToNull(values))
        : api.post('/admin/subjects', emptyToNull(values)),
    successMessage: subject ? 'Subject updated' : 'Subject created',
    onSuccess: () => setOpen(false),
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) form.reset(defaults(subject));
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{subject ? 'Edit subject' : 'New subject'}</DialogTitle>
          <DialogDescription>Subjects group topics on the public study pages.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => save.mutate(values))}
            className="space-y-4"
            noValidate
          >
            <TextField control={form.control} name="name" label="Name" />
            <TextField control={form.control} name="nameBn" label="Name (Bangla)" />
            <TextareaField control={form.control} name="description" label="Description" rows={3} />
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                control={form.control}
                name="category"
                label="Category"
                options={CATEGORY_OPTIONS}
              />
              <NumberField control={form.control} name="order" label="Display order" min={0} />
            </div>
            <SwitchField control={form.control} name="isPublished" label="Published" />
            <Button type="submit" className="w-full" disabled={save.isPending}>
              {save.isPending && <Loader2 className="animate-spin" />}
              {subject ? 'Save changes' : 'Create subject'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
