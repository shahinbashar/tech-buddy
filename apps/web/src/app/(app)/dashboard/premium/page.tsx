import { Crown, Lock, Unlock } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/common/page-header';
import { EntitlementStatusBadge } from '@/components/premium/entitlement-status-badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { serverApi } from '@/lib/api-server';
import { formatDate } from '@/lib/format';
import { requireUser } from '@/lib/session';
import type { MyPremiumAccess, ProgressOverview } from '@/types/api';

export const metadata: Metadata = { title: 'My premium content' };

export default async function MyPremiumPage() {
  const user = await requireUser('/dashboard/premium');
  const [access, progress] = await Promise.all([
    serverApi<MyPremiumAccess>('/premium/me'),
    serverApi<ProgressOverview>('/progress/topics'),
  ]);
  const hasPremium = user.role === 'ADMIN' || access.hasPremium;
  const premiumTopics = progress.subjects.flatMap((subject) =>
    subject.topics
      .filter((t) => t.accessLevel === 'PREMIUM')
      .map((topic) => ({ ...topic, subject })),
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="My premium content"
        description="Your premium access and the premium study material it unlocks."
      />

      {hasPremium ? (
        <Alert variant="success">
          <Crown />
          <AlertTitle>Premium is active</AlertTitle>
          <AlertDescription>
            {user.role === 'ADMIN'
              ? 'Admins can access all premium content.'
              : access.activeUntil
                ? `Valid until ${formatDate(access.activeUntil)}.`
                : 'Lifetime access — enjoy!'}
          </AlertDescription>
        </Alert>
      ) : (
        <Alert variant="warning">
          <Lock />
          <AlertTitle>You don’t have Premium yet</AlertTitle>
          <AlertDescription>
            <p>Premium notes, questions and exams are shown as locked.</p>
            <Button asChild size="sm" className="mt-1">
              <Link href="/premium">See plans</Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <Card className="gap-4">
        <CardHeader>
          <CardTitle className="text-base">Premium topics</CardTitle>
        </CardHeader>
        <CardContent>
          {premiumTopics.length ? (
            <ul className="divide-y">
              {premiumTopics.map((topic) => (
                <li key={topic.id}>
                  <Link
                    href={`/subjects/${topic.subject.slug}/${topic.slug}`}
                    className="hover:bg-muted/50 -mx-2 flex items-center gap-3 rounded-md px-2 py-2.5 text-sm"
                  >
                    {hasPremium ? (
                      <Unlock className="text-success size-4" aria-label="Unlocked" />
                    ) : (
                      <Lock className="text-premium size-4" aria-label="Locked" />
                    )}
                    <span className="font-medium">{topic.title}</span>
                    <span className="text-muted-foreground ml-auto">{topic.subject.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-sm">
              No premium topics are published yet. Premium notes inside free topics are marked on
              each topic page.
            </p>
          )}
        </CardContent>
      </Card>

      {access.entitlements.length > 0 && (
        <Card className="gap-4">
          <CardHeader>
            <CardTitle className="text-base">Access history</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y text-sm">
              {access.entitlements.map((entitlement) => (
                <li
                  key={entitlement.id}
                  className="flex flex-wrap items-center justify-between gap-2 py-2.5"
                >
                  <span className="font-medium">{entitlement.plan?.name ?? 'Custom access'}</span>
                  <span className="text-muted-foreground">
                    {formatDate(entitlement.startsAt)} →{' '}
                    {entitlement.expiresAt ? formatDate(entitlement.expiresAt) : 'No expiry'}
                  </span>
                  <EntitlementStatusBadge status={entitlement.status} />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
