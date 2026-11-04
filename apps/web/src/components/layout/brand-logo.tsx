import { GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function BrandLogo({ href = '/', className }: { href?: string; className?: string }) {
  return (
    <Link
      href={href}
      className={cn('flex items-center gap-2 font-semibold tracking-tight', className)}
    >
      <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg">
        <GraduationCap className="size-5" aria-hidden />
      </span>
      <span className="text-lg">{APP_NAME}</span>
    </Link>
  );
}
