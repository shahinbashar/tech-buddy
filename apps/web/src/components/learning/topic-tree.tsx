import { TopicTreeItem } from '@/components/learning/topic-tree-item';
import type { SubjectDetail } from '@/types/api';

export function TopicTree({ subject }: { subject: SubjectDetail }) {
  return (
    <ul className="divide-y rounded-xl border bg-card">
      {subject.topics.map((topic) => (
        <li key={topic.id} className="p-1">
          <TopicTreeItem topic={topic} subjectSlug={subject.slug} />
          {topic.children.length > 0 && (
            <ul className="pb-1">
              {topic.children.map((child) => (
                <li key={child.id}>
                  <TopicTreeItem topic={child} subjectSlug={subject.slug} nested />
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
