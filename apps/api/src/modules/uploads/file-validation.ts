export const ALLOWED_UPLOADS = {
  'application/pdf': {
    extensions: ['.pdf'],
    signature: (b: Buffer) => b.subarray(0, 5).toString('latin1') === '%PDF-',
  },
  'image/jpeg': {
    extensions: ['.jpg', '.jpeg'],
    signature: (b: Buffer) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  },
  'image/png': {
    extensions: ['.png'],
    signature: (b: Buffer) =>
      b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
  },
  'image/webp': {
    extensions: ['.webp'],
    signature: (b: Buffer) =>
      b.subarray(0, 4).toString('latin1') === 'RIFF' &&
      b.subarray(8, 12).toString('latin1') === 'WEBP',
  },
} as const;

export type AllowedMimeType = keyof typeof ALLOWED_UPLOADS;

export interface UploadCandidate {
  originalname: string;
  mimetype: string;
  buffer: Buffer;
}

/**
 * Validates declared MIME type, file extension and the file's magic bytes.
 * Returns an error message, or null when the file is acceptable.
 */
export function validateUpload(file: UploadCandidate): string | null {
  const rule = ALLOWED_UPLOADS[file.mimetype as AllowedMimeType] as
    | (typeof ALLOWED_UPLOADS)[AllowedMimeType]
    | undefined;
  if (!rule) return 'Only PDF, JPEG, PNG and WebP files are allowed';
  const extension = file.originalname.slice(file.originalname.lastIndexOf('.')).toLowerCase();
  if (!(rule.extensions as readonly string[]).includes(extension)) {
    return `File extension does not match its type (${file.mimetype})`;
  }
  if (!rule.signature(file.buffer)) return 'File content does not match its declared type';
  return null;
}

export function extensionFor(mimeType: AllowedMimeType): string {
  return ALLOWED_UPLOADS[mimeType].extensions[0];
}
