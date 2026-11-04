import { NoteForm } from '@/components/admin/note-form';
import { PageHeader } from '@/components/common/page-header';

export const metadata = { title: 'New note' };

export default function NewNotePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="New note"
        description="Write study material in Markdown. Attachments can be added after saving."
      />
      <NoteForm />
    </div>
  );
}
