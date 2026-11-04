import type { Metadata } from 'next';
import { SavedCirculars } from '@/components/circulars/saved-circulars';
import { PageHeader } from '@/components/common/page-header';

export const metadata: Metadata = { title: 'Saved circulars' };

export default function SavedCircularsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Saved circulars"
        description="Circulars you are tracking — still-open ones first, closing soonest at the top."
      />
      <SavedCirculars />
    </div>
  );
}
