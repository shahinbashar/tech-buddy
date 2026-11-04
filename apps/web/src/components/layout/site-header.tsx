'use client';

import Link from 'next/link';
import { BrandLogo } from '@/components/layout/brand-logo';
import { MobileNav } from '@/components/layout/mobile-nav';
import { NavLink } from '@/components/layout/nav-link';
import { UserMenu } from '@/components/layout/user-menu';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-auth';
import { PUBLIC_NAV } from '@/lib/navigation';

export function SiteHeader() {
  const { data: user } = useCurrentUser();
  return (
    <header className="bg-background/90 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:px-6">
        <MobileNav items={PUBLIC_NAV} />
        <BrandLogo />
        <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Main">
          {PUBLIC_NAV.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {user ? (
            <>
              <Button asChild size="sm" variant="outline" className="hidden sm:inline-flex">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserMenu user={user} />
            </>
          ) : (
            <>
              <Button asChild size="sm" variant="ghost">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Get started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
