'use client';

import { Dumbbell, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStartPractice } from '@/hooks/use-start-practice';

/** One-click 10-question practice set for a single topic (used on weak topics). */
export function PracticeTopicButton({
  topicId,
  topicName,
}: {
  topicId: string;
  topicName: string;
}) {
  const practice = useStartPractice();
  return (
    <Button
      size="sm"
      variant="ghost"
      disabled={practice.isPending}
      aria-label={`Practise ${topicName}`}
      onClick={() => practice.mutate({ mode: 'random', topicId, questionCount: 10 })}
    >
      {practice.isPending ? <Loader2 className="animate-spin" /> : <Dumbbell />} Practise
    </Button>
  );
}
