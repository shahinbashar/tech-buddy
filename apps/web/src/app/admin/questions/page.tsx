import { Plus } from 'lucide-react';
import Link from 'next/link';
import { CsvImportDialog } from '@/components/admin/csv-import-dialog';
import { QuestionsTable } from '@/components/admin/questions-table';
import { PageHeader } from '@/components/common/page-header';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Questions' };

export default function AdminQuestionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Question bank"
        description="Reusable MCQs with explanations. Only published questions are used in exams."
        actions={
          <>
            <CsvImportDialog />
            <Button asChild>
              <Link href="/admin/questions/new">
                <Plus /> New question
              </Link>
            </Button>
          </>
        }
      />
      <QuestionsTable />
    </div>
  );
}
