'use client';

import { AttachmentManager } from '@/components/admin/attachment-manager';
import { NoteForm } from '@/components/admin/note-form';
import { ResourceEditor } from '@/components/admin/resource-editor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { queryKeys } from '@/lib/query-keys';
import type { AdminNote } from '@/types/api';

export function NoteEditor({ id }: { id: string }) {
  return (
    <ResourceEditor<AdminNote>
      queryKey={queryKeys.admin.note(id)}
      endpoint={`/admin/notes/${id}`}
      title="Edit note"
      description={(note) => `${note.topic.title} › ${note.title}`}
    >
      {(note) => (
        <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
          <NoteForm key={note.id} note={note} />
          <Card className="h-fit gap-4">
            <CardHeader>
              <CardTitle className="text-base">Attachments</CardTitle>
            </CardHeader>
            <CardContent>
              <AttachmentManager
                uploadEndpoint={`/admin/notes/${note.id}/attachments`}
                attachments={note.attachments}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </ResourceEditor>
  );
}
