import type { Metadata } from 'next';
import { ExamRunner } from '@/components/exams/exam-runner';

export const metadata: Metadata = { title: 'Exam in progress' };

export default async function AttemptPage({ params }: { params: Promise<{ attemptId: string }> }) {
  return <ExamRunner attemptId={(await params).attemptId} />;
}
