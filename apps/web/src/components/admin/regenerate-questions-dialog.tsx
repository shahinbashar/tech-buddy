'use client';

import { Loader2, Shuffle } from 'lucide-react';
import { useState } from 'react';
import { SubjectCheckboxes } from '@/components/admin/subject-checkboxes';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdminMutation } from '@/hooks/use-admin-mutation';
import { api } from '@/lib/api';

export function RegenerateQuestionsDialog({
  examId,
  currentCount,
}: {
  examId: string;
  currentCount: number;
}) {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(currentCount || 20);
  const [subjectIds, setSubjectIds] = useState<string[]>([]);
  const regenerate = useAdminMutation<void>({
    mutationFn: () =>
      api.put(`/admin/exams/${examId}/questions`, { questionCount: count, subjectIds }),
    successMessage: 'Questions regenerated',
    onSuccess: () => setOpen(false),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Shuffle /> Regenerate questions
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Regenerate questions</DialogTitle>
          <DialogDescription>
            Replaces the current question set with a new random selection.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="regen-count">Number of questions</Label>
          <Input
            id="regen-count"
            type="number"
            min={1}
            max={200}
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
            className="max-w-40"
          />
        </div>
        <SubjectCheckboxes value={subjectIds} onChange={setSubjectIds} />
        <Button disabled={regenerate.isPending || count < 1} onClick={() => regenerate.mutate()}>
          {regenerate.isPending && <Loader2 className="animate-spin" />}
          Regenerate
        </Button>
      </DialogContent>
    </Dialog>
  );
}
