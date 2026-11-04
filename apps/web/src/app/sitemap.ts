import type { MetadataRoute } from 'next';
import { unstable_rethrow } from 'next/navigation';
import { serverApi } from '@/lib/api-server';
import type { CircularSummary, Paginated, SubjectSummary } from '@/types/api';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

/** Public pages for search engines: static pages, subjects and running circulars. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    '',
    '/circulars',
    '/circulars/archived',
    '/subjects',
    '/premium',
    '/about',
    '/contact',
  ].map((path) => ({ url: `${SITE_URL}${path}`, changeFrequency: 'daily' as const }));
  try {
    const [subjects, circulars] = await Promise.all([
      serverApi<SubjectSummary[]>('/subjects'),
      serverApi<Paginated<CircularSummary>>('/circulars', { status: 'running', pageSize: 100 }),
    ]);
    return [
      ...staticPages,
      ...subjects.map((s) => ({
        url: `${SITE_URL}/subjects/${s.slug}`,
        changeFrequency: 'weekly' as const,
      })),
      ...circulars.items.map((c) => ({
        url: `${SITE_URL}/circulars/${c.slug}`,
        lastModified: c.publishedDate,
        changeFrequency: 'weekly' as const,
      })),
    ];
  } catch (error) {
    unstable_rethrow(error);
    // The sitemap must never fail the build or request; fall back to static pages.
    return staticPages;
  }
}
