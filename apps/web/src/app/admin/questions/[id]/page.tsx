import { QuestionEditor } from '@/components/admin/question-editor';

export const metadata = { title: 'Edit question' };

export default async function EditQuestionPage({ params }: { params: Promise<{ id: string }> }) {
  return <QuestionEditor id={(await params).id} />;
}
