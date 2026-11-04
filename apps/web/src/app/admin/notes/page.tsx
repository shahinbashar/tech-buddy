import { Plus } from 'lucide-react';
import Link from 'next/link';
import { NotesTable } from '@/components/admin/notes-table';
import { PageHeader } from '@/components/common/page-header';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Notes' };

export default function AdminNotesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Study notes"
        description="Markdown learning materials attached to topics."
        actions={
          <Button asChild>
            <Link href="/admin/notes/new">
              <Plus /> New note
            </Link>
          </Button>
        }
      />
      <NotesTable />
    </div>
  );
}
