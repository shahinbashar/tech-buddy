import type { Metadata } from 'next';
import { PageHeader } from '@/components/common/page-header';
import { ExamHub } from '@/components/exams/exam-hub';

export const metadata: Metadata = { title: 'Daily exam' };

export default function ExamsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Daily examination"
        description="A fresh, timed MCQ set every day. Questions and options are shuffled, and your score is calculated on the server."
      />
      <ExamHub />
    </div>
  );
}
