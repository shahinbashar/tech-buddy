'use client';

import { useQuery } from '@tanstack/react-query';
import { Dumbbell, Loader2, RotateCcw, Shuffle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useStartPractice } from '@/hooks/use-start-practice';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/query-keys';
import { cn } from '@/lib/utils';
import type { PracticeMode, SubjectDetail, SubjectSummary } from '@/types/api';

const ALL = '__all__';
const COUNTS = [5, 10, 20, 30];

const MODES: { value: PracticeMode; title: string; description: string; icon: typeof Shuffle }[] = [
  {
    value: 'random',
    title: 'Random practice',
    description: 'Fresh questions from a subject or topic.',
    icon: Shuffle,
  },
  {
    value: 'mistakes',
    title: 'My mistakes',
    description: 'Questions you most recently answered wrong — the fastest way to improve.',
    icon: RotateCcw,
  },
];

function ModeOption({
  mode,
  selected,
  onSelect,
}: {
  mode: (typeof MODES)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = mode.icon;
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        'bg-card flex items-start gap-3 rounded-lg border p-4 text-left transition-colors',
        selected ? 'border-primary ring-primary/20 ring-2' : 'hover:border-primary/40',
      )}
    >
      <Icon
        className={cn(
          'mt-0.5 size-5 shrink-0',
          selected ? 'text-primary' : 'text-muted-foreground',
        )}
        aria-hidden
      />
      <span>
        <span className="block font-medium">{mode.title}</span>
        <span className="text-muted-foreground text-sm">{mode.description}</span>
      </span>
    </button>
  );
}

/** Build a personal practice set: mode, optional subject/topic and size. */
export function PracticeBuilder() {
  const [mode, setMode] = useState<PracticeMode>('random');
  const [subjectSlug, setSubjectSlug] = useState<string>(ALL);
  const [topicId, setTopicId] = useState<string>(ALL);
  const [count, setCount] = useState(10);
  const practice = useStartPractice();

  const subjects = useQuery({
    queryKey: queryKeys.subjectsPublic,
    queryFn: () => api.get<SubjectSummary[]>('/subjects'),
  });
  const subject = useQuery({
    queryKey: ['subjects', 'detail', subjectSlug],
    queryFn: () => api.get<SubjectDetail>(`/subjects/${subjectSlug}`),
    enabled: subjectSlug !== ALL,
  });
  const topicOptions = (subject.data?.topics ?? []).flatMap((root) => [
    { id: root.id, label: root.title },
    ...root.children.map((child) => ({ id: child.id, label: `— ${child.title}` })),
  ]);
  const subjectId = subjects.data?.find((s) => s.slug === subjectSlug)?.id;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dumbbell className="text-primary size-5" aria-hidden /> Build a practice set
        </CardTitle>
        <CardDescription>
          Practice sets are private, untimed-pressure friendly (1 minute per question) and don’t
          affect your daily exam rank.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div role="radiogroup" aria-label="Practice mode" className="grid gap-3 sm:grid-cols-2">
          {MODES.map((option) => (
            <ModeOption
              key={option.value}
              mode={option}
              selected={mode === option.value}
              onSelect={() => setMode(option.value)}
            />
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="practice-subject">Subject</Label>
            <Select
              value={subjectSlug}
              onValueChange={(value) => {
                setSubjectSlug(value);
                setTopicId(ALL);
              }}
            >
              <SelectTrigger id="practice-subject">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All subjects</SelectItem>
                {subjects.data?.map((s) => (
                  <SelectItem key={s.id} value={s.slug}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="practice-topic">Topic</Label>
            <Select value={topicId} onValueChange={setTopicId} disabled={subjectSlug === ALL}>
              <SelectTrigger id="practice-topic">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All topics</SelectItem>
                {topicOptions.map((topic) => (
                  <SelectItem key={topic.id} value={topic.id}>
                    {topic.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="practice-count">Questions</Label>
            <Select value={String(count)} onValueChange={(value) => setCount(Number(value))}>
              <SelectTrigger id="practice-count">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COUNTS.map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n} questions · {n} min
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          size="lg"
          disabled={practice.isPending}
          onClick={() =>
            practice.mutate({
              mode,
              questionCount: count,
              subjectId: subjectId,
              topicId: topicId === ALL ? undefined : topicId,
            })
          }
        >
          {practice.isPending ? <Loader2 className="animate-spin" /> : <Dumbbell />}
          Start practice
        </Button>
      </CardContent>
    </Card>
  );
}
