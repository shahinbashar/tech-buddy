import type { Metadata } from 'next';
import { CircularListing } from '@/components/circulars/circular-listing';

export const metadata: Metadata = { title: 'Archived circulars' };

export default async function ArchivedCircularsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  return (
    <CircularListing
      status="archived"
      basePath="/circulars/archived"
      searchParams={await searchParams}
    />
  );
}
