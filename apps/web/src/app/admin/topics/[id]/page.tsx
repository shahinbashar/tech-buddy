import { TopicEditor } from '@/components/admin/topic-editor';

export const metadata = { title: 'Edit topic' };

export default async function EditTopicPage({ params }: { params: Promise<{ id: string }> }) {
  return <TopicEditor id={(await params).id} />;
}
