import { TopicForm } from '@/components/admin/topic-form';
import { PageHeader } from '@/components/common/page-header';

export const metadata = { title: 'New topic' };

export default function NewTopicPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="New topic" />
      <TopicForm />
    </div>
  );
}
