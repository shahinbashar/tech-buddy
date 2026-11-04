import type { Metadata } from 'next';
import { PageHeader } from '@/components/common/page-header';
import { AttemptHistory } from '@/components/exams/attempt-history';

export const metadata: Metadata = { title: 'Exam history' };

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Examination history"
        description="Every submitted attempt, newest first."
      />
      <AttemptHistory />
    </div>
  );
}
