import { validateUpload } from './file-validation';

const pdf = Buffer.from('%PDF-1.7\n...');
const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00]);

describe('validateUpload', () => {
  it('accepts files whose type, extension and content agree', () => {
    expect(
      validateUpload({ originalname: 'circular.pdf', mimetype: 'application/pdf', buffer: pdf }),
    ).toBeNull();
    expect(
      validateUpload({ originalname: 'page-1.PNG', mimetype: 'image/png', buffer: png }),
    ).toBeNull();
  });

  it('rejects disallowed types', () => {
    expect(
      validateUpload({
        originalname: 'x.html',
        mimetype: 'text/html',
        buffer: Buffer.from('<html>'),
      }),
    ).toMatch(/Only PDF/);
  });

  it('rejects mismatched extensions and spoofed content', () => {
    expect(
      validateUpload({ originalname: 'x.exe', mimetype: 'application/pdf', buffer: pdf }),
    ).toMatch(/extension/);
    expect(
      validateUpload({
        originalname: 'x.pdf',
        mimetype: 'application/pdf',
        buffer: Buffer.from('<script>'),
      }),
    ).toMatch(/content/);
  });
});
