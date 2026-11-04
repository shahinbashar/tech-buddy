'use client';

import type { Control } from 'react-hook-form';
import {
  NumberField,
  SelectField,
  SwitchField,
  TextareaField,
  TextField,
} from '@/components/admin/form-fields';
import { ACCESS_LEVEL_OPTIONS } from '@/lib/constants';
import type { ExamUpdateFormValues } from '@/lib/admin-schemas';

const TYPE_OPTIONS = [
  { value: 'DAILY', label: 'Daily exam' },
  { value: 'MODEL', label: 'Model test' },
];

/** Fields shared by the create and edit exam forms. */
export function ExamConfigFields({ control }: { control: Control<ExamUpdateFormValues> }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <TextField
        control={control}
        name="title"
        label="Title"
        className="md:col-span-2"
        placeholder="Daily Exam — 2026-11-05"
      />
      <TextareaField
        control={control}
        name="description"
        label="Description"
        rows={2}
        className="md:col-span-2"
      />
      <SelectField control={control} name="type" label="Type" options={TYPE_OPTIONS} />
      <TextField control={control} name="examDate" label="Exam date (Bangladesh)" type="date" />
      <NumberField control={control} name="durationMinutes" label="Duration (minutes)" min={1} />
      <SelectField
        control={control}
        name="accessLevel"
        label="Access"
        options={ACCESS_LEVEL_OPTIONS}
        description="Free exams only use free questions."
      />
      <NumberField
        control={control}
        name="marksPerQuestion"
        label="Marks per question"
        step={0.25}
        min={0.25}
      />
      <NumberField
        control={control}
        name="negativeMarking"
        label="Negative marking per wrong answer"
        step={0.25}
        min={0}
      />
      <SwitchField control={control} name="allowMultipleAttempts" label="Allow multiple attempts" />
      <SwitchField control={control} name="isPublished" label="Published" />
    </div>
  );
}
