import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  icon: LucideIcon;
  tone?: 'primary' | 'success' | 'warning' | 'premium';
}

const TONES: Record<NonNullable<StatCardProps['tone']>, string> = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/15 text-warning-foreground',
  premium: 'bg-premium/15 text-[oklch(0.5_0.13_65)]',
};

export function StatCard({ label, value, hint, icon: Icon, tone = 'primary' }: StatCardProps) {
  return (
    <Card className="gap-0 py-5">
      <CardContent className="flex items-start gap-4">
        <span
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-lg',
            TONES[tone],
          )}
        >
          <Icon className="size-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-muted-foreground text-sm">{label}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {hint && <p className="text-muted-foreground mt-0.5 text-xs">{hint}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
