import { CheckCircle2, Circle } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { UserDashboard } from '@/types/api';

interface Step {
  done: boolean;
  label: string;
  hint: string;
  href: string;
  action: string;
}

function StepRow({ step }: { step: Step }) {
  const Icon = step.done ? CheckCircle2 : Circle;
  return (
    <li className="flex items-start gap-3 py-3">
      <Icon
        className={cn(
          'mt-0.5 size-5 shrink-0',
          step.done ? 'text-success' : 'text-muted-foreground',
        )}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <p className={cn('font-medium', step.done && 'text-muted-foreground line-through')}>
          {step.label}
        </p>
        {!step.done && <p className="text-muted-foreground text-sm">{step.hint}</p>}
      </div>
      {!step.done && (
        <Link
          href={step.href}
          className="text-primary shrink-0 text-sm font-medium hover:underline"
        >
          {step.action}
        </Link>
      )}
      <span className="sr-only">{step.done ? 'Done' : 'Not done yet'}</span>
    </li>
  );
}

/**
 * First-week checklist: one action from each part of the product. Shown until every step is
 * done, so new users get a clear next step instead of a wall of zeros.
 */
export function GettingStartedCard({ overview }: { overview: UserDashboard['overview'] }) {
  const steps: Step[] = [
    {
      done: overview.examsTaken > 0,
      label: 'Take your first daily exam',
      hint: 'See where you stand — results come with explanations.',
      href: '/exams',
      action: 'Go to exam',
    },
    {
      done: overview.completedTopics > 0,
      label: 'Finish your first topic',
      hint: 'Read a short note and mark it complete.',
      href: '/subjects',
      action: 'Study',
    },
    {
      done: overview.savedCirculars > 0,
      label: 'Save a circular you want to apply for',
      hint: 'We’ll remind you here before its deadline.',
      href: '/circulars',
      action: 'Browse',
    },
  ];
  const doneCount = steps.filter((s) => s.done).length;
  if (doneCount === steps.length) return null;

  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle>Get started</CardTitle>
        <CardDescription>
          {doneCount} of {steps.length} done
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="divide-y">
          {steps.map((step) => (
            <StepRow key={step.label} step={step} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
