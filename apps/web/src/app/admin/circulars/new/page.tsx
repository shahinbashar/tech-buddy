import { CircularForm } from '@/components/admin/circular-form';
import { PageHeader } from '@/components/common/page-header';

export const metadata = { title: 'New circular' };

export default function NewCircularPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="New circular"
        description="Attachments can be uploaded after the circular is created."
      />
      <CircularForm />
    </div>
  );
}
