import { BrandLogo } from '@/components/layout/brand-logo';
import { requireUser } from '@/lib/session';

/** Distraction-free layout for onboarding and the exam runner. */
export default async function FocusLayout({ children }: { children: React.ReactNode }) {
  await requireUser('/dashboard');
  return (
    <div className="min-h-screen">
      <header className="bg-background border-b">
        <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:px-6">
          <BrandLogo href="/dashboard" />
        </div>
      </header>
      <main
        id="main-content"
        tabIndex={-1}
        className="outline-none mx-auto max-w-6xl px-4 py-6 sm:px-6"
      >
        {children}
      </main>
    </div>
  );
}
