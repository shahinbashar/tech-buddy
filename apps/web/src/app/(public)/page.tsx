import { ArrowRight, BookOpen, BriefcaseBusiness, ClipboardList, LineChart } from 'lucide-react';
import Link from 'next/link';
import { CircularCard } from '@/components/circulars/circular-card';
import { EmptyState } from '@/components/common/empty-state';
import { FeatureCard } from '@/components/home/feature-card';
import { JourneySteps } from '@/components/home/journey-steps';
import { SubjectCard } from '@/components/learning/subject-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { serverApi } from '@/lib/api-server';
import { getSessionUser } from '@/lib/session';
import type { CircularStats, CircularSummary, Paginated, SubjectSummary } from '@/types/api';

const FEATURES = [
  {
    icon: BriefcaseBusiness,
    title: 'Job circulars',
    description: 'Running and archived government circulars with deadline alerts.',
    href: '/circulars',
  },
  {
    icon: BookOpen,
    title: 'Topic-wise notes',
    description: 'From Bangla grammar to Operating Systems — study one topic at a time.',
    href: '/subjects',
  },
  {
    icon: ClipboardList,
    title: 'Daily MCQ exam',
    description: '20 questions, 20 minutes, instant results with explanations.',
    href: '/exams',
  },
  {
    icon: LineChart,
    title: 'Progress dashboard',
    description: 'Track accuracy, subject performance and weak topics.',
    href: '/dashboard',
  },
];

export default async function HomePage() {
  const [circulars, stats, subjects, user] = await Promise.all([
    serverApi<Paginated<CircularSummary>>('/circulars', { status: 'running', pageSize: 6 }),
    serverApi<CircularStats>('/circulars/summary'),
    serverApi<SubjectSummary[]>('/subjects'),
    getSessionUser(),
  ]);

  return (
    <>
      <section className="from-primary/10 via-background to-accent/40 border-b bg-gradient-to-br">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:py-20">
          <div className="space-y-6">
            <Badge variant="secondary" className="text-sm">
              Built for Bangladesh government job aspirants
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              Prepare smarter for your <span className="text-primary">government job</span> exam
            </h1>
            <p className="text-muted-foreground max-w-xl text-lg">
              Circulars, topic-wise notes and a daily timed MCQ exam — with results that show
              exactly where to improve.
              <span className="mt-1 block text-base">
                প্রতিদিন একটু করে, প্রস্তুতি হোক নিয়মিত।
              </span>
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={user ? '/exams' : '/register'}>
                  {user ? 'Take today’s exam' : 'Start preparing — it’s free'} <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/circulars">Browse circulars</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 self-center">
            <div className="bg-card rounded-xl border p-4 text-center shadow-sm">
              <p className="text-primary text-3xl font-bold">{stats.running}</p>
              <p className="text-muted-foreground text-xs">Running circulars</p>
            </div>
            <div className="bg-card rounded-xl border p-4 text-center shadow-sm">
              <p className="text-warning-foreground text-3xl font-bold">{stats.closingSoon}</p>
              <p className="text-muted-foreground text-xs">Closing this week</p>
            </div>
            <div className="bg-card rounded-xl border p-4 text-center shadow-sm">
              <p className="text-success text-3xl font-bold">{subjects.length}</p>
              <p className="text-muted-foreground text-xs">Subjects</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-6">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.href} {...feature} />
          ))}
        </section>

        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Running circulars</h2>
              <p className="text-muted-foreground text-sm">Featured first, then closing soonest.</p>
            </div>
            <Button asChild variant="ghost">
              <Link href="/circulars">
                View all <ArrowRight />
              </Link>
            </Button>
          </div>
          {circulars.items.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {circulars.items.map((circular) => (
                <CircularCard key={circular.id} circular={circular} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={BriefcaseBusiness}
              title="No running circulars right now"
              description="Check the archive or come back soon."
            />
          )}
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Your preparation journey</h2>
          <JourneySteps />
        </section>

        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Study by subject</h2>
            <Button asChild variant="ghost">
              <Link href="/subjects">
                All subjects <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.slice(0, 6).map((subject) => (
              <SubjectCard key={subject.id} subject={subject} showProgress={Boolean(user)} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
