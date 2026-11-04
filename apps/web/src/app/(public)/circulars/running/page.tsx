import type { Metadata } from 'next';
import { CircularListing } from '@/components/circulars/circular-listing';

export const metadata: Metadata = { title: 'Running circulars' };

export default async function RunningCircularsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  return (
    <CircularListing
      status="running"
      basePath="/circulars/running"
      searchParams={await searchParams}
    />
  );
}
