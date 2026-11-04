'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  NumberField,
  SelectField,
  SwitchField,
  TextareaField,
  TextField,
} from '@/components/admin/form-fields';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useAdminMutation } from '@/hooks/use-admin-mutation';
import { circularSchema, emptyToNull, type CircularFormValues } from '@/lib/admin-schemas';
import { api } from '@/lib/api';
import { CIRCULAR_CATEGORY_LABELS, EMPLOYMENT_TYPE_LABELS, JOB_TYPE_LABELS } from '@/lib/constants';
import { fromDhakaInputValue, toDhakaInputValue } from '@/lib/format';
import type { CircularDetail } from '@/types/api';

const toOptions = (labels: Record<string, string>) =>
  Object.entries(labels).map(([value, label]) => ({ value, label }));

function defaults(circular?: CircularDetail): CircularFormValues {
  return {
    organizationName: circular?.organizationName ?? '',
    organizationNameBn: circular?.organizationNameBn ?? '',
    title: circular?.title ?? '',
    category: circular?.category ?? 'IT',
    jobType: circular?.jobType ?? 'GOVERNMENT',
    employmentType: circular?.employmentType ?? 'FULL_TIME',
    publishedDate: toDhakaInputValue(circular?.publishedDate ?? new Date()),
    applicationStartDate: toDhakaInputValue(circular?.applicationStartDate ?? new Date()),
    applicationDeadline: toDhakaInputValue(circular?.applicationDeadline),
    vacancies: circular?.vacancies ?? null,
    salary: circular?.salary ?? '',
    educationalQualification: circular?.educationalQualification ?? '',
    ageRequirement: circular?.ageRequirement ?? '',
    additionalRequirements: circular?.additionalRequirements ?? '',
    applicationInstructions: circular?.applicationInstructions ?? '',
    applicationUrl: circular?.applicationUrl ?? '',
    isFeatured: circular?.isFeatured ?? false,
    isPublished: circular?.isPublished ?? false,
  };
}

export function CircularForm({ circular }: { circular?: CircularDetail }) {
  const router = useRouter();
  const form = useForm<CircularFormValues>({
    resolver: zodResolver(circularSchema),
    defaultValues: defaults(circular),
  });

  const save = useAdminMutation<CircularFormValues, CircularDetail>({
    mutationFn: (values) => {
      const body = {
        ...emptyToNull(values),
        publishedDate: fromDhakaInputValue(values.publishedDate),
        applicationStartDate: fromDhakaInputValue(values.applicationStartDate),
        applicationDeadline: fromDhakaInputValue(values.applicationDeadline),
      };
      return circular
        ? api.patch<CircularDetail>(`/admin/circulars/${circular.id}`, body)
        : api.post<CircularDetail>('/admin/circulars', body);
    },
    successMessage: circular
      ? 'Circular updated'
      : 'Circular created — you can now add attachments',
    onSuccess: (saved) => {
      if (!circular) router.push(`/admin/circulars/${saved.id}`);
      else form.reset(defaults(saved));
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
          <CardHeader>
            <CardTitle className="text-base">Basic information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <TextField control={form.control} name="organizationName" label="Organization name" />
            <TextField
              control={form.control}
              name="organizationNameBn"
              label="Organization name (Bangla)"
            />
            <TextField
              control={form.control}
              name="title"
              label="Job title / designation"
              className="md:col-span-2"
            />
            <SelectField
              control={form.control}
              name="category"
              label="Category"
              options={toOptions(CIRCULAR_CATEGORY_LABELS)}
            />
            <SelectField
              control={form.control}
              name="jobType"
              label="Job type"
              options={toOptions(JOB_TYPE_LABELS)}
            />
            <SelectField
              control={form.control}
              name="employmentType"
              label="Employment type"
              options={toOptions(EMPLOYMENT_TYPE_LABELS)}
            />
            <NumberField
              control={form.control}
              name="vacancies"
              label="Number of vacancies"
              min={0}
            />
            <TextField
              control={form.control}
              name="salary"
              label="Salary / pay grade"
              placeholder="Grade 9 (৳22,000–53,060)"
            />
            <TextField
              control={form.control}
              name="applicationUrl"
              label="Official application URL"
              type="url"
              placeholder="https://"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Dates (Bangladesh time)</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <TextField
              control={form.control}
              name="publishedDate"
              label="Published date"
              type="datetime-local"
            />
            <TextField
              control={form.control}
              name="applicationStartDate"
              label="Application start"
              type="datetime-local"
            />
            <TextField
              control={form.control}
              name="applicationDeadline"
              label="Application deadline"
              type="datetime-local"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Eligibility & instructions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <TextareaField
              control={form.control}
              name="educationalQualification"
              label="Educational qualification"
            />
            <TextareaField
              control={form.control}
              name="ageRequirement"
              label="Age requirement"
              rows={2}
            />
            <TextareaField
              control={form.control}
              name="additionalRequirements"
              label="Additional requirements"
            />
            <TextareaField
              control={form.control}
              name="applicationInstructions"
              label="Application instructions"
              rows={5}
            />
          </CardContent>
        </Card>

        <div className="grid gap-3 md:grid-cols-2">
          <SwitchField
            control={form.control}
            name="isPublished"
            label="Published"
            description="Visible on the public portal"
          />
          <SwitchField
            control={form.control}
            name="isFeatured"
            label="Featured"
            description="Pinned to the top of running circulars"
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={save.isPending}>
            {save.isPending && <Loader2 className="animate-spin" />}
            {circular ? 'Save changes' : 'Create circular'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push('/admin/circulars')}>
            Back to list
          </Button>
        </div>
      </form>
    </Form>
  );
}
