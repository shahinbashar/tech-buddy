import { QuestionForm } from '@/components/admin/question-form';
import { PageHeader } from '@/components/common/page-header';

export const metadata = { title: 'New question' };

export default function NewQuestionPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="New question"
        description="After saving, the form resets with the same subject and topic for quick entry."
      />
      <QuestionForm />
    </div>
  );
}
