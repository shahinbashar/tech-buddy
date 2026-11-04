import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { PremiumPlan } from '@/types/api';

const BENEFITS = [
  'All premium notes and subtopics',
  'Premium question sets',
  'Premium model & daily exams',
  'Detailed explanations',
];

export function PlanCard({
  plan,
  highlighted,
  action,
}: {
  plan: PremiumPlan;
  highlighted: boolean;
  action: React.ReactNode;
}) {
  return (
    <Card
      className={cn('relative', highlighted && 'border-primary shadow-md ring-primary/20 ring-2')}
    >
      {highlighted && <Badge className="absolute -top-2.5 left-6">Most popular</Badge>}
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        {plan.description && <CardDescription>{plan.description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          <span className="text-3xl font-bold">৳{plan.priceBdt}</span>
          <span className="text-muted-foreground text-sm">
            {plan.durationDays ? ` / ${plan.durationDays} days` : ' one-time'}
          </span>
        </p>
        <ul className="space-y-2 text-sm">
          {BENEFITS.map((benefit) => (
            <li key={benefit} className="flex items-center gap-2">
              <Check className="text-success size-4" aria-hidden /> {benefit}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto">{action}</CardFooter>
    </Card>
  );
}
