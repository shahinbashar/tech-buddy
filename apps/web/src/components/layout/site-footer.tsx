import Link from 'next/link';
import { BrandLogo } from '@/components/layout/brand-logo';
import { APP_NAME, CONTACT_EMAIL } from '@/lib/constants';

const FOOTER_LINKS = [
  {
    title: 'Prepare',
    links: [
      { href: '/circulars', label: 'Job circulars' },
      { href: '/subjects', label: 'Study notes' },
      { href: '/exams', label: 'Daily exam' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { href: '/premium', label: 'Premium' },
      { href: '/about', label: 'About us' },
      { href: '/contact', label: 'Contact' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-card mt-16 border-t">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-3">
          <BrandLogo />
          <p className="text-muted-foreground max-w-sm text-sm">
            Government job circulars, topic-wise notes and daily MCQ practice for Bangladeshi job
            seekers.
            <span className="mt-1 block">সরকারি চাকরির প্রস্তুতি — এক জায়গায়।</span>
          </p>
        </div>
        {FOOTER_LINKS.map((group) => (
          <div key={group.title}>
            <h3 className="mb-3 text-sm font-semibold">{group.title}</h3>
            <ul className="space-y-2 text-sm">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="text-muted-foreground border-t py-4 text-center text-xs">
        © {new Date().getFullYear()} {APP_NAME} ·{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </div>
    </footer>
  );
}
