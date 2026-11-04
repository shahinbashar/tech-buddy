import { FileImage, FileText } from 'lucide-react';
import { formatFileSize } from '@/lib/format';
import type { Attachment } from '@/types/api';

function AttachmentLink({ attachment }: { attachment: Attachment }) {
  const Icon = attachment.mimeType === 'application/pdf' ? FileText : FileImage;
  return (
    <a
      href={attachment.url}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:border-primary/40 hover:bg-muted/50 flex items-center gap-3 rounded-lg border p-3 text-sm transition-colors"
    >
      <Icon className="text-primary size-5 shrink-0" aria-hidden />
      <span className="min-w-0 flex-1 truncate font-medium">{attachment.originalName}</span>
      <span className="text-muted-foreground text-xs">{formatFileSize(attachment.size)}</span>
    </a>
  );
}

export function AttachmentList({ attachments }: { attachments: Attachment[] }) {
  if (!attachments.length) return null;
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {attachments.map((attachment) => (
        <li key={attachment.id}>
          <AttachmentLink attachment={attachment} />
        </li>
      ))}
    </ul>
  );
}
