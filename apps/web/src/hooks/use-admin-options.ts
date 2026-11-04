'use client';

import { useQuery } from '@tanstack/react-query';
import type { SelectOption } from '@/components/admin/form-fields';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/query-keys';
import type { AdminSubject, TopicOption } from '@/types/api';

export function useAdminSubjects() {
  return useQuery({
    queryKey: queryKeys.admin.subjects,
    queryFn: () => api.get<AdminSubject[]>('/admin/subjects'),
  });
}

export function useSubjectOptions(): SelectOption[] {
  const { data } = useAdminSubjects();
  return (data ?? []).map((s) => ({ value: s.id, label: s.name }));
}

/** Topic options for a subject; subtopics are indented under their parent. */
export function useTopicOptions(
  subjectId: string | undefined | null,
  { rootsOnly = false } = {},
): { options: SelectOption[]; isLoaded: boolean } {
  const { data, isSuccess } = useQuery({
    queryKey: queryKeys.admin.topicOptions(subjectId ?? undefined),
    queryFn: () =>
      api.get<TopicOption[]>('/admin/topics/options', { subjectId: subjectId ?? undefined }),
    enabled: Boolean(subjectId),
  });
  const topics = data ?? [];
  const roots = topics.filter((t) => !t.parentId);
  const options = roots.flatMap((root) => [
    { value: root.id, label: root.title },
    ...(rootsOnly
      ? []
      : topics
          .filter((t) => t.parentId === root.id)
          .map((child) => ({ value: child.id, label: `— ${child.title}` }))),
  ]);
  return { options, isLoaded: isSuccess };
}
