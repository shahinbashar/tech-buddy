import { Mail, MessageSquare } from 'lucide-react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/common/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CONTACT_EMAIL } from '@/lib/constants';

export const metadata: Metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6">
      <PageHeader
        title="Contact us"
        description="Questions, corrections to a circular, or a Premium request — we’d love to hear from you."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <Mail className="text-primary size-6" aria-hidden />
            <CardTitle>Email</CardTitle>
            <CardDescription>We usually reply within one working day.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <MessageSquare className="text-primary size-6" aria-hidden />
            <CardTitle>Report a mistake</CardTitle>
            <CardDescription>
              Found a wrong answer or outdated circular? Tell us the page link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Content correction')}`}
              >
                Send a correction
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
