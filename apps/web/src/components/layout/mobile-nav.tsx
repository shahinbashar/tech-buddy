'use client';

import { LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import { BrandLogo } from '@/components/layout/brand-logo';
import { NavLink } from '@/components/layout/nav-link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useLogout } from '@/hooks/use-auth';
import { USER_NAV, type NavItem } from '@/lib/navigation';

function NavSection({
  title,
  items,
  onNavigate,
}: {
  title?: string;
  items: NavItem[];
  onNavigate: () => void;
}) {
  return (
    <div className="grid gap-1">
      {title && (
        <p className="text-muted-foreground px-3 pt-2 text-xs font-semibold tracking-wide uppercase">
          {title}
        </p>
      )}
      {items.map((item) => (
        <NavLink key={item.href} item={item} variant="side" onNavigate={onNavigate} />
      ))}
    </div>
  );
}

/**
 * The phone menu. Signed-in users also get their account pages and log out here, so
 * nothing is hidden behind the sideways-scrolling account strip.
 */
export function MobileNav({ items, signedIn = false }: { items: NavItem[]; signedIn?: boolean }) {
  const [open, setOpen] = useState(false);
  const logout = useLogout();
  const close = () => setOpen(false);
  // "Daily Exam" is in both lists; keep it once, under the main links.
  const accountItems = USER_NAV.filter((item) => !items.some((i) => i.href === item.href));

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto p-4">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <BrandLogo />
        <nav className="mt-4 grid gap-3" aria-label="Mobile">
          <NavSection items={items} onNavigate={close} />
          {signedIn && <NavSection title="My account" items={accountItems} onNavigate={close} />}
        </nav>
        {signedIn && (
          <Button
            variant="ghost"
            className="text-destructive mt-2 justify-start"
            disabled={logout.isPending}
            onClick={() => {
              close();
              logout.mutate();
            }}
          >
            <LogOut /> Log out
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );
}
