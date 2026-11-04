import { ExamManager } from '@/components/admin/exam-manager';

export const metadata = { title: 'Manage exam' };

export default async function ManageExamPage({ params }: { params: Promise<{ id: string }> }) {
  return <ExamManager id={(await params).id} />;
}
