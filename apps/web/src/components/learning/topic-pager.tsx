import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { TopicNav } from '@/types/api';

function TopicPagerLink({
  topic,
  subjectSlug,
  direction,
}: {
  topic: TopicNav;
  subjectSlug: string;
  direction: 'previous' | 'next';
}) {
  const isNext = direction === 'next';
  return (
    <Link
      href={`/subjects/${subjectSlug}/${topic.slug}`}
      className={`hover:border-primary/40 hover:bg-muted/40 flex flex-1 items-center gap-3 rounded-lg border p-4 transition-colors ${isNext ? 'justify-end text-right' : ''}`}
    >
      {!isNext && <ChevronLeft className="text-muted-foreground size-5" aria-hidden />}
      <span>
        <span className="text-muted-foreground block text-xs">
          {isNext ? 'Next topic' : 'Previous topic'}
        </span>
        <span className="font-medium">{topic.title}</span>
      </span>
      {isNext && <ChevronRight className="text-muted-foreground size-5" aria-hidden />}
    </Link>
  );
}

export function TopicPager({
  previous,
  next,
  subjectSlug,
}: {
  previous: TopicNav | null;
  next: TopicNav | null;
  subjectSlug: string;
}) {
  if (!previous && !next) return null;
  return (
    <nav className="flex flex-col gap-3 sm:flex-row" aria-label="Topic navigation">
      {previous ? (
        <TopicPagerLink topic={previous} subjectSlug={subjectSlug} direction="previous" />
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <TopicPagerLink topic={next} subjectSlug={subjectSlug} direction="next" />
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
