import { Plus } from 'lucide-react';
import Link from 'next/link';
import { CircularsTable } from '@/components/admin/circulars-table';
import { PageHeader } from '@/components/common/page-header';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Circulars' };

export default function AdminCircularsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Job circulars"
        description="Create, publish and feature circulars. Running/archived status is derived from the deadline."
        actions={
          <Button asChild>
            <Link href="/admin/circulars/new">
              <Plus /> New circular
            </Link>
          </Button>
        }
      />
      <CircularsTable />
    </div>
  );
}
