import { CircularEditor } from '@/components/admin/circular-editor';

export const metadata = { title: 'Edit circular' };

export default async function EditCircularPage({ params }: { params: Promise<{ id: string }> }) {
  return <CircularEditor id={(await params).id} />;
}
