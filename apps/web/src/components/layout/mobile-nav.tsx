'use client';

import { Menu } from 'lucide-react';
import { useState } from 'react';
import { BrandLogo } from '@/components/layout/brand-logo';
import { NavLink } from '@/components/layout/nav-link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import type { NavItem } from '@/lib/navigation';

export function MobileNav({ items, title = 'Navigation' }: { items: NavItem[]; title?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-4">
        <SheetTitle className="sr-only">{title}</SheetTitle>
        <BrandLogo />
        <nav className="mt-4 grid gap-1">
          {items.map((item) => (
            <NavLink key={item.href} item={item} variant="side" onNavigate={() => setOpen(false)} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
