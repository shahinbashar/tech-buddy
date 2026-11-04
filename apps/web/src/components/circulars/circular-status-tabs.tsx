import Link from 'next/link';
import { cn } from '@/lib/utils';

const TABS = [
  { href: '/circulars/running', key: 'running', label: 'Running' },
  { href: '/circulars/archived', key: 'archived', label: 'Archived' },
] as const;

interface CircularStatusTabsProps {
  active: 'running' | 'archived';
  counts: { running: number; archived: number };
}

export function CircularStatusTabs({ active, counts }: CircularStatusTabsProps) {
  return (
    <nav className="bg-muted inline-flex rounded-lg p-1" aria-label="Circular status">
      {TABS.map((tab) => (
        <Link
          key={tab.key}
          href={tab.href}
          aria-current={active === tab.key ? 'page' : undefined}
          className={cn(
            'rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
            active === tab.key
              ? 'bg-background shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {tab.label}{' '}
          <span className="text-muted-foreground ml-1 text-xs">({counts[tab.key]})</span>
        </Link>
      ))}
    </nav>
  );
}
