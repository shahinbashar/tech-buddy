import { SiteHeader } from '@/components/layout/site-header';
import { SideNav } from '@/components/layout/side-nav';
import { requireUser } from '@/lib/session';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  await requireUser('/dashboard');
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_1fr] lg:gap-10">
        {/* min-w-0: otherwise the phone's sideways-scrolling nav widens the whole page. */}
        <aside className="min-w-0">
          <SideNav nav="user" />
        </aside>
        <main id="main-content" tabIndex={-1} className="outline-none min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
