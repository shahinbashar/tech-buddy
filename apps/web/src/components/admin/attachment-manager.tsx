'use client';

import { FileImage, FileText, Loader2, Upload } from 'lucide-react';
import { useRef } from 'react';
import { toast } from 'sonner';
import { DeleteButton } from '@/components/admin/delete-button';
import { Button } from '@/components/ui/button';
import { useAdminMutation } from '@/hooks/use-admin-mutation';
import { api } from '@/lib/api';
import { formatFileSize } from '@/lib/format';
import type { Attachment } from '@/types/api';

const ACCEPT = 'application/pdf,image/jpeg,image/png,image/webp';
const MAX_MB = 10;

interface AttachmentManagerProps {
  /** e.g. `/admin/circulars/:id/attachments` */
  uploadEndpoint: string;
  attachments: Attachment[];
}

export function AttachmentManager({ uploadEndpoint, attachments }: AttachmentManagerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = useAdminMutation<File>({
    mutationFn: (file) => api.upload(uploadEndpoint, file),
    successMessage: 'File uploaded',
  });

  return (
    <div className="space-y-3">
      {attachments.length > 0 && (
        <ul className="divide-y rounded-lg border">
          {attachments.map((attachment) => {
            const Icon = attachment.mimeType === 'application/pdf' ? FileText : FileImage;
            return (
              <li key={attachment.id} className="flex items-center gap-3 px-3 py-2 text-sm">
                <Icon className="text-primary size-4 shrink-0" aria-hidden />
                <a
                  href={attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-0 flex-1 truncate hover:underline"
                >
                  {attachment.originalName}
                </a>
                <span className="text-muted-foreground text-xs">
                  {formatFileSize(attachment.size)}
                </span>
                <DeleteButton
                  endpoint={`/admin/attachments/${attachment.id}`}
                  itemLabel="Attachment"
                />
              </li>
            );
          })}
        </ul>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = '';
          if (!file) return;
          if (file.size > MAX_MB * 1024 * 1024) {
            toast.error(`Files must be ${MAX_MB} MB or smaller`);
            return;
          }
          upload.mutate(file);
        }}
      />
      <Button
        type="button"
        variant="outline"
        disabled={upload.isPending}
        onClick={() => inputRef.current?.click()}
      >
        {upload.isPending ? <Loader2 className="animate-spin" /> : <Upload />}
        Upload PDF or image
      </Button>
      <p className="text-muted-foreground text-xs">
        PDF, JPEG, PNG or WebP · up to {MAX_MB} MB each.
      </p>
    </div>
  );
}
