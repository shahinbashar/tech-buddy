import type { Metadata } from 'next';
import { PageHeader } from '@/components/common/page-header';
import { PracticeBuilder } from '@/components/exams/practice-builder';

export const metadata: Metadata = { title: 'Practice' };

export default function PracticePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Practice"
        description="Target a subject or topic, or drill the questions you got wrong — as often as you like."
      />
      <PracticeBuilder />
    </div>
  );
}
