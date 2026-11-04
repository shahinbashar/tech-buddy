import { ExamCreateLoader } from '@/components/admin/exam-create-loader';
import { PageHeader } from '@/components/common/page-header';

export const metadata = { title: 'New exam' };

export default function NewExamPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="New exam"
        description="Defaults come from the exam settings. Leave the title empty to use “Daily Exam — date”."
      />
      <ExamCreateLoader />
    </div>
  );
}
