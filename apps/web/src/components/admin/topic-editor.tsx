'use client';

import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { ResourceEditor } from '@/components/admin/resource-editor';
import { TopicForm } from '@/components/admin/topic-form';
import { Button } from '@/components/ui/button';
import { queryKeys } from '@/lib/query-keys';
import type { AdminTopic } from '@/types/api';

export function TopicEditor({ id }: { id: string }) {
  return (
    <ResourceEditor<AdminTopic>
      queryKey={queryKeys.admin.topic(id)}
      endpoint={`/admin/topics/${id}`}
      title="Edit topic"
      description={(topic) => `${topic.subject.name} › ${topic.title}`}
      actions={(topic) =>
        topic.isPublished && (
          <Button asChild variant="outline">
            <Link href={`/subjects/${topic.subject.slug}/${topic.slug}`} target="_blank">
              View public page <ExternalLink />
            </Link>
          </Button>
        )
      }
    >
      {(topic) => <TopicForm key={topic.id + topic.title} topic={topic} />}
    </ResourceEditor>
  );
}
