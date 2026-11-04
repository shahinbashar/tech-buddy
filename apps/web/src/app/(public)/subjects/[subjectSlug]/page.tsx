import { ArrowLeft, FolderTree } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { EmptyState } from '@/components/common/empty-state';
import { PageHeader } from '@/components/common/page-header';
import { TopicTree } from '@/components/learning/topic-tree';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { serverApiOrNull } from '@/lib/api-server';
import { getSessionUser } from '@/lib/session';
import type { SubjectDetail } from '@/types/api';

const getSubject = cache((slug: string) =>
  serverApiOrNull<SubjectDetail>(`/subjects/${encodeURIComponent(slug)}`),
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subjectSlug: string }>;
}): Promise<Metadata> {
  const subject = await getSubject((await params).subjectSlug);
  return {
    title: subject ? subject.name : 'Subject not found',
    description: subject?.description ?? undefined,
  };
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subjectSlug: string }>;
}) {
  const [subject, user] = await Promise.all([
    getSubject((await params).subjectSlug),
    getSessionUser(),
  ]);
  if (!subject) notFound();
  const percent = subject.topicCount
    ? Math.round((subject.completedCount / subject.topicCount) * 100)
    : 0;

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/subjects">
          <ArrowLeft /> All subjects
        </Link>
      </Button>
      <PageHeader
        title={subject.name}
        description={
          subject.nameBn ? `${subject.nameBn} · ${subject.description ?? ''}` : subject.description
        }
      />
      {user && subject.topicCount > 0 && (
        <div className="bg-card space-y-2 rounded-xl border p-4">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Your progress</span>
            <span className="text-muted-foreground">
              {subject.completedCount}/{subject.topicCount} topics · {percent}%
            </span>
          </div>
          <Progress value={percent} indicatorClassName="bg-success" />
        </div>
      )}
      {subject.topics.length ? (
        <TopicTree subject={subject} />
      ) : (
        <EmptyState
          icon={FolderTree}
          title="No topics published yet"
          description="Check back soon for new study material."
        />
      )}
    </div>
  );
}
