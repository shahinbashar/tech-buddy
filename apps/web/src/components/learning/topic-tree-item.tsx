import { CheckCircle2, Circle, FileText, Lock } from 'lucide-react';
import Link from 'next/link';
import { AccessBadge } from '@/components/common/access-badge';
import { cn } from '@/lib/utils';
import type { TopicNode } from '@/types/api';

interface TopicTreeItemProps {
  topic: TopicNode;
  subjectSlug: string;
  nested?: boolean;
}

export function TopicTreeItem({ topic, subjectSlug, nested = false }: TopicTreeItemProps) {
  const StatusIcon = topic.isLocked ? Lock : topic.isCompleted ? CheckCircle2 : Circle;
  return (
    <Link
      href={`/subjects/${subjectSlug}/${topic.slug}`}
      className={cn(
        'hover:bg-muted/60 flex items-start gap-3 rounded-lg p-3 transition-colors',
        nested && 'ml-6 border-l pl-4',
      )}
    >
      <StatusIcon
        className={cn(
          'mt-0.5 size-5 shrink-0',
          topic.isCompleted
            ? 'text-success'
            : topic.isLocked
              ? 'text-premium'
              : 'text-muted-foreground',
        )}
        aria-label={topic.isLocked ? 'Locked' : topic.isCompleted ? 'Completed' : 'Not completed'}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn('font-medium', !nested && 'text-base')}>{topic.title}</span>
          {topic.accessLevel === 'PREMIUM' && (
            <AccessBadge level="PREMIUM" locked={topic.isLocked} />
          )}
        </div>
        {topic.description && (
          <p className="text-muted-foreground mt-0.5 line-clamp-2 text-sm">{topic.description}</p>
        )}
      </div>
      {topic.noteCount > 0 && (
        <span className="text-muted-foreground flex shrink-0 items-center gap-1 text-xs">
          <FileText className="size-3.5" aria-hidden /> {topic.noteCount}
        </span>
      )}
    </Link>
  );
}
