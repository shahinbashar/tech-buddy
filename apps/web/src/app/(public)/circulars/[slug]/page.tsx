import { ArrowLeft, Building2, CalendarClock, ExternalLink, Star } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { AttachmentList } from '@/components/circulars/attachment-list';
import { CircularInfoRow } from '@/components/circulars/circular-info-row';
import { DeadlineBadge } from '@/components/circulars/deadline-badge';
import { SaveCircularButton } from '@/components/circulars/save-circular-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { serverApiOrNull } from '@/lib/api-server';
import { CIRCULAR_CATEGORY_LABELS, EMPLOYMENT_TYPE_LABELS, JOB_TYPE_LABELS } from '@/lib/constants';
import { formatDate, formatDateTime } from '@/lib/format';
import { getSessionUser } from '@/lib/session';
import type { CircularDetail } from '@/types/api';

const getCircular = cache((slug: string) =>
  serverApiOrNull<CircularDetail>(`/circulars/${encodeURIComponent(slug)}`),
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const circular = await getCircular((await params).slug);
  return circular
    ? {
        title: `${circular.title} — ${circular.organizationName}`,
        description: `Apply by ${formatDate(circular.applicationDeadline)}.`,
      }
    : { title: 'Circular not found' };
}

export default async function CircularDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [circular, user] = await Promise.all([getCircular((await params).slug), getSessionUser()]);
  if (!circular) notFound();
  const isClosed = circular.status === 'closed';

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href={isClosed ? '/circulars/archived' : '/circulars'}>
          <ArrowLeft /> Back to circulars
        </Link>
      </Button>

      <header className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <DeadlineBadge circular={circular} />
          <Badge variant="secondary">{CIRCULAR_CATEGORY_LABELS[circular.category]}</Badge>
          <Badge variant="outline">{JOB_TYPE_LABELS[circular.jobType]}</Badge>
          {circular.isFeatured && (
            <Badge variant="premium">
              <Star aria-hidden /> Featured
            </Badge>
          )}
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{circular.title}</h1>
        <p className="text-muted-foreground flex items-start gap-2">
          <Building2 className="mt-0.5 size-5 shrink-0" aria-hidden />
          <span>
            {circular.organizationName}
            {circular.organizationNameBn && (
              <span className="block">{circular.organizationNameBn}</span>
            )}
          </span>
        </p>
        <SaveCircularButton
          circularId={circular.id}
          slug={circular.slug}
          initialSaved={Boolean(circular.isSaved)}
          isSignedIn={Boolean(user)}
        />
      </header>

      {isClosed && (
        <Alert variant="warning">
          <CalendarClock />
          <AlertTitle>Application closed</AlertTitle>
          <AlertDescription>
            The deadline for this circular was {formatDateTime(circular.applicationDeadline)}.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <Card>
          <CardHeader>
            <CardTitle>Circular details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="divide-y">
              <CircularInfoRow label="Designation" value={circular.title} />
              <CircularInfoRow label="Number of vacancies" value={circular.vacancies} />
              <CircularInfoRow label="Salary / pay grade" value={circular.salary} />
              <CircularInfoRow
                label="Employment type"
                value={EMPLOYMENT_TYPE_LABELS[circular.employmentType]}
              />
              <CircularInfoRow
                label="Educational qualification"
                value={circular.educationalQualification}
              />
              <CircularInfoRow label="Age requirement" value={circular.ageRequirement} />
              <CircularInfoRow
                label="Additional requirements"
                value={circular.additionalRequirements}
              />
              <CircularInfoRow label="How to apply" value={circular.applicationInstructions} />
            </dl>
          </CardContent>
        </Card>

        <aside className="space-y-4">
          <Card className="gap-4">
            <CardHeader>
              <CardTitle className="text-base">Important dates</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-muted-foreground">Published</dt>
                  <dd className="font-medium">{formatDate(circular.publishedDate)}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Application starts</dt>
                  <dd className="font-medium">{formatDateTime(circular.applicationStartDate)}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Application deadline</dt>
                  <dd className="text-destructive font-semibold">
                    {formatDateTime(circular.applicationDeadline)}
                  </dd>
                </div>
              </dl>
              {circular.applicationUrl && !isClosed && (
                <Button asChild className="mt-4 w-full">
                  <a href={circular.applicationUrl} target="_blank" rel="noopener noreferrer">
                    Apply on official site <ExternalLink />
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
          <Card className="gap-3">
            <CardHeader>
              <CardTitle className="text-base">Prepare for this exam</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                Practise MCQs daily and revise topic-wise notes.
              </p>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/exams">Take today’s exam</Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="w-full">
                <Link href="/subjects">Browse study notes</Link>
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>

      {circular.attachments.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Circular attachments</h2>
          <AttachmentList attachments={circular.attachments} />
        </section>
      )}
    </div>
  );
}
