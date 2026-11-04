import { AttachmentList } from '@/components/circulars/attachment-list';
import { AccessBadge } from '@/components/common/access-badge';
import { Markdown } from '@/components/common/markdown';
import { LockedContent } from '@/components/premium/locked-content';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { PublicNote } from '@/types/api';

export function NoteSection({ note, isSignedIn }: { note: PublicNote; isSignedIn: boolean }) {
  return (
    <Card id={`note-${note.id}`} className="scroll-mt-20">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="text-xl">{note.title}</CardTitle>
          <AccessBadge level={note.accessLevel} locked={note.isLocked} />
        </div>
        {note.summary && <CardDescription>{note.summary}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {note.isLocked || note.content === null ? (
          <LockedContent isSignedIn={isSignedIn} title="This note is part of Premium" />
        ) : (
          <>
            <Markdown content={note.content} />
            <AttachmentList attachments={note.attachments} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
