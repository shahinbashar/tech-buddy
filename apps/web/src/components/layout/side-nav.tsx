'use client';

import { NavLink } from '@/components/layout/nav-link';
import { ADMIN_NAV, USER_NAV } from '@/lib/navigation';

const NAVS = {
  user: { items: USER_NAV, label: 'Account' },
  admin: { items: ADMIN_NAV, label: 'Admin' },
} as const;

/**
 * Vertical nav on desktop, horizontally scrollable strip on mobile.
 * Takes a key rather than items because icons (components) cannot cross the server/client boundary.
 */
export function SideNav({ nav }: { nav: keyof typeof NAVS }) {
  const { items, label } = NAVS[nav];
  return (
    <nav
      aria-label={label}
      className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:overflow-visible lg:px-0"
    >
      <div className="flex gap-1 lg:sticky lg:top-24 lg:flex-col">
        {items.map((item) => (
          <NavLink key={item.href} item={item} variant="side" />
        ))}
      </div>
    </nav>
  );
}
