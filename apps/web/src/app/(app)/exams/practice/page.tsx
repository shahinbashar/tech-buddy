import type { Metadata } from 'next';
import { PageHeader } from '@/components/common/page-header';
import { PastPapersCard } from '@/components/exams/past-papers-card';
import { PracticeBuilder } from '@/components/exams/practice-builder';

export const metadata: Metadata = { title: 'Practice' };

export default function PracticePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Practice"
        description="Target a subject or topic, drill the questions you got wrong, or work through a past paper — as often as you like."
      />
      <PracticeBuilder />
      <PastPapersCard />
    </div>
  );
}
