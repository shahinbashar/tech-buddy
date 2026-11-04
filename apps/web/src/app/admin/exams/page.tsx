import { Plus } from 'lucide-react';
import Link from 'next/link';
import { ExamSettingsCard } from '@/components/admin/exam-settings-card';
import { ExamsTable } from '@/components/admin/exams-table';
import { PageHeader } from '@/components/common/page-header';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Daily exams' };

export default function AdminExamsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Daily exams"
        description="Exams draw random published questions from the bank. Exams with attempts keep their questions fixed."
        actions={
          <Button asChild>
            <Link href="/admin/exams/new">
              <Plus /> New exam
            </Link>
          </Button>
        }
      />
      <ExamSettingsCard />
      <ExamsTable />
    </div>
  );
}
