import { ChevronRight, FileText } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { AccessBadge } from '@/components/common/access-badge';
import { EmptyState } from '@/components/common/empty-state';
import { Markdown } from '@/components/common/markdown';
import { CompleteTopicButton } from '@/components/learning/complete-topic-button';
import { NoteSection } from '@/components/learning/note-section';
import { NotesToc } from '@/components/learning/notes-toc';
import { TopicPager } from '@/components/learning/topic-pager';
import { LockedContent } from '@/components/premium/locked-content';
import { Card, CardContent } from '@/components/ui/card';
import { serverApiOrNull } from '@/lib/api-server';
import { getSessionUser } from '@/lib/session';
import type { TopicDetail } from '@/types/api';

type Params = Promise<{ subjectSlug: string; topicSlug: string }>;

const getTopic = cache((subjectSlug: string, topicSlug: string) =>
  serverApiOrNull<TopicDetail>(
    `/subjects/${encodeURIComponent(subjectSlug)}/topics/${encodeURIComponent(topicSlug)}`,
  ),
);

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { subjectSlug, topicSlug } = await params;
  const topic = await getTopic(subjectSlug, topicSlug);
  return topic
    ? {
        title: `${topic.title} — ${topic.subject.name}`,
        description: topic.description ?? undefined,
      }
    : { title: 'Topic not found' };
}

export default async function TopicPage({ params }: { params: Params }) {
  const { subjectSlug, topicSlug } = await params;
  const [topic, user] = await Promise.all([getTopic(subjectSlug, topicSlug), getSessionUser()]);
  if (!topic) notFound();
  const path = `/subjects/${subjectSlug}/${topicSlug}`;

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6">
      <nav
        className="text-muted-foreground flex flex-wrap items-center gap-1 text-sm"
        aria-label="Breadcrumb"
      >
        <Link href="/subjects" className="hover:text-foreground">
          Subjects
        </Link>
        <ChevronRight className="size-4" aria-hidden />
        <Link href={`/subjects/${topic.subject.slug}`} className="hover:text-foreground">
          {topic.subject.name}
        </Link>
        {topic.parent && (
          <>
            <ChevronRight className="size-4" aria-hidden />
            <Link
              href={`/subjects/${topic.subject.slug}/${topic.parent.slug}`}
              className="hover:text-foreground"
            >
              {topic.parent.title}
            </Link>
          </>
        )}
      </nav>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{topic.title}</h1>
          <AccessBadge level={topic.accessLevel} locked={topic.isLocked} />
        </div>
        {topic.description && <p className="text-muted-foreground">{topic.description}</p>}
        <CompleteTopicButton
          topicId={topic.id}
          isCompleted={topic.isCompleted}
          isSignedIn={Boolean(user)}
          disabled={topic.isLocked}
          loginRedirect={path}
        />
      </header>

      {topic.isLocked ? (
        <LockedContent isSignedIn={Boolean(user)} title="This topic is part of Premium" />
      ) : (
        topic.content && (
          <Card>
            <CardContent>
              <Markdown content={topic.content} />
            </CardContent>
          </Card>
        )
      )}

      {topic.children.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Subtopics</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {topic.children.map((child) => (
              <li key={child.id}>
                <Link
                  href={`/subjects/${topic.subject.slug}/${child.slug}`}
                  className="hover:border-primary/40 bg-card block rounded-lg border p-4 transition-colors"
                >
                  <span className="flex items-center gap-2 font-medium">
                    {child.title}
                    {child.accessLevel === 'PREMIUM' && <AccessBadge level="PREMIUM" />}
                  </span>
                  {child.description && (
                    <span className="text-muted-foreground mt-1 block text-sm">
                      {child.description}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {!topic.isLocked &&
        (topic.notes.length > 0 ? (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Notes</h2>
            <NotesToc notes={topic.notes} />
            {topic.notes.map((note) => (
              <NoteSection key={note.id} note={note} isSignedIn={Boolean(user)} />
            ))}
          </section>
        ) : topic.children.length > 0 ? (
          // A parent topic: its notes live in the subtopics, so say so instead of an empty heading.
          <p className="text-muted-foreground text-sm">
            Start with the first subtopic above — each one has its own notes.
          </p>
        ) : (
          !topic.content && (
            <EmptyState
              icon={FileText}
              title="No notes yet"
              description="Notes for this topic will be published soon."
            />
          )
        ))}

      <TopicPager previous={topic.previous} next={topic.next} subjectSlug={topic.subject.slug} />
    </div>
  );
}
