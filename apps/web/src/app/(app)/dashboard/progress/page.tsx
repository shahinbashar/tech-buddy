import type { Metadata } from 'next';
import { PageHeader } from '@/components/common/page-header';
import { LearningProgress } from '@/components/learning/learning-progress';

export const metadata: Metadata = { title: 'Learning progress' };

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My learning progress"
        description="Completed and pending topics across all subjects."
      />
      <LearningProgress />
    </div>
  );
}
