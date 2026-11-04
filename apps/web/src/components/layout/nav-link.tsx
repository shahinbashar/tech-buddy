'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isActivePath, type NavItem } from '@/lib/navigation';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  item: NavItem;
  variant?: 'top' | 'side';
  onNavigate?: () => void;
}

export function NavLink({ item, variant = 'top', onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const active = isActivePath(pathname, item);
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex items-center gap-2 rounded-md text-sm font-medium transition-colors',
        variant === 'top' ? 'px-3 py-2' : 'px-3 py-2.5',
        active
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
      )}
    >
      <Icon className="size-4" aria-hidden />
      {item.label}
    </Link>
  );
}
