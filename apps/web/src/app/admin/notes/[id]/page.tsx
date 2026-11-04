import { NoteEditor } from '@/components/admin/note-editor';

export const metadata = { title: 'Edit note' };

export default async function EditNotePage({ params }: { params: Promise<{ id: string }> }) {
  return <NoteEditor id={(await params).id} />;
}
