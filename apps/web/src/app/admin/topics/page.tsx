import { Plus } from 'lucide-react';
import Link from 'next/link';
import { TopicsTable } from '@/components/admin/topics-table';
import { PageHeader } from '@/components/common/page-header';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Topics' };

export default function AdminTopicsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Topics"
        description="Topics and subtopics (one level) within each subject."
        actions={
          <Button asChild>
            <Link href="/admin/topics/new">
              <Plus /> New topic
            </Link>
          </Button>
        }
      />
      <TopicsTable />
    </div>
  );
}
