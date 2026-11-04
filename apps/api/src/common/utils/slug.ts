import { randomBytes } from 'node:crypto';

/** URL-safe slug from (possibly Bangla) text; falls back to a random token when nothing ASCII remains. */
export function slugify(input: string): string {
  const slug = input
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
  return slug || randomBytes(4).toString('hex');
}

export function uniqueSlug(input: string): string {
  return `${slugify(input)}-${randomBytes(3).toString('hex')}`;
}

/** Returns `slugify(text)`, suffixed with -2, -3… until `isTaken` reports it free. */
export async function findAvailableSlug(
  text: string,
  isTaken: (slug: string) => Promise<boolean>,
): Promise<string> {
  const base = slugify(text);
  let slug = base;
  for (let i = 2; await isTaken(slug); i++) slug = `${base}-${i}`;
  return slug;
}
