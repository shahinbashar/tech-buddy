import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/site-header';
import { SideNav } from '@/components/layout/side-nav';
import { requireAdmin } from '@/lib/session';

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s · Admin' },
  robots: { index: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[200px_1fr] lg:gap-8">
        {/* min-w-0: otherwise the phone's sideways-scrolling nav widens the whole page. */}
        <aside className="min-w-0">
          <SideNav nav="admin" />
        </aside>
        <main id="main-content" tabIndex={-1} className="outline-none min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
