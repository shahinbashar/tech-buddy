'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { errorMessage } from '@/lib/api-error';
import { PREPARATION_GOALS } from '@/lib/constants';
import { queryKeys } from '@/lib/query-keys';
import { cn } from '@/lib/utils';
import type { PreparationGoal, User } from '@/types/api';

interface GoalPickerProps {
  initialGoal: PreparationGoal | null;
  redirectTo?: string;
}

export function GoalPicker({ initialGoal, redirectTo }: GoalPickerProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [goal, setGoal] = useState<PreparationGoal | null>(initialGoal);

  const save = useMutation({
    mutationFn: (preparationGoal: PreparationGoal) =>
      api.patch<User>('/users/me', { preparationGoal }),
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.me, user);
      toast.success('Preparation goal saved');
      if (redirectTo) router.push(redirectTo);
      router.refresh();
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  return (
    <div className="space-y-4">
      <div role="radiogroup" aria-label="Preparation goal" className="grid gap-3 sm:grid-cols-2">
        {PREPARATION_GOALS.map((option) => {
          const selected = goal === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setGoal(option.value)}
              className={cn(
                'bg-card flex items-start gap-3 rounded-lg border p-4 text-left transition-colors',
                selected ? 'border-primary ring-primary/20 ring-2' : 'hover:border-primary/40',
              )}
            >
              <CheckCircle2
                className={cn(
                  'mt-0.5 size-5 shrink-0',
                  selected ? 'text-primary' : 'text-muted-foreground/40',
                )}
                aria-hidden
              />
              <span>
                <span className="block font-medium">{option.label}</span>
                <span className="text-muted-foreground text-sm">{option.description}</span>
              </span>
            </button>
          );
        })}
      </div>
      <Button disabled={!goal || save.isPending} onClick={() => goal && save.mutate(goal)}>
        {save.isPending && <Loader2 className="animate-spin" />}
        Save goal
      </Button>
    </div>
  );
}
