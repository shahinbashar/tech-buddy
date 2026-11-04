import type { Metadata } from 'next';
import { ResultView } from '@/components/exams/result-view';

export const metadata: Metadata = { title: 'Exam result' };

export default async function ResultPage({ params }: { params: Promise<{ attemptId: string }> }) {
  return <ResultView attemptId={(await params).attemptId} />;
}
