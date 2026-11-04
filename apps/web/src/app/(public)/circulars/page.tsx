import type { Metadata } from 'next';
import { CircularListing } from '@/components/circulars/circular-listing';

export const metadata: Metadata = {
  title: 'Job circulars',
  description: 'Running government job circulars in Bangladesh with deadlines and eligibility.',
};

export default async function CircularsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  return (
    <CircularListing status="running" basePath="/circulars" searchParams={await searchParams} />
  );
}
