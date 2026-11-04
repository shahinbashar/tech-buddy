import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export function FeatureCard({ icon: Icon, title, description, href }: FeatureCardProps) {
  return (
    <Card className="group hover:border-primary/40 gap-0 py-0 transition-colors">
      <Link href={href} className="flex flex-col gap-3 p-5">
        <span className="bg-accent text-accent-foreground flex size-10 items-center justify-center rounded-lg">
          <Icon className="size-5" aria-hidden />
        </span>
        <h3 className="group-hover:text-primary font-semibold">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </Link>
    </Card>
  );
}
