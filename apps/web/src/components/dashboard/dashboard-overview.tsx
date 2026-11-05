'use client';

import { useQuery } from '@tanstack/react-query';
import { BookCheck, Bookmark, ClipboardList, Flame, Percent, Target, Trophy } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { ErrorState } from '@/components/common/error-state';
import { CardGridSkeleton } from '@/components/common/list-skeleton';
import { StatCard } from '@/components/common/stat-card';
import { AnswerBreakdownChart } from '@/components/dashboard/answer-breakdown-chart';
import { ClosingSoonCard } from '@/components/dashboard/closing-soon-card';
import { GettingStartedCard } from '@/components/dashboard/getting-started-card';
import { PerformanceChart } from '@/components/dashboard/performance-chart';
import { RecommendedCircularsCard } from '@/components/dashboard/recommended-circulars-card';
import { RecentAttemptsCard } from '@/components/dashboard/recent-attempts-card';
import { SubjectPerformanceChart } from '@/components/dashboard/subject-performance-chart';
import { TodayExamCard } from '@/components/dashboard/today-exam-card';
import { TopicProgressCard } from '@/components/dashboard/topic-progress-card';
import { WeakTopicsCard } from '@/components/dashboard/weak-topics-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { formatPercent } from '@/lib/format';
import { queryKeys } from '@/lib/query-keys';
import type { UserDashboard } from '@/types/api';

export function DashboardOverview({ needsGoal }: { needsGoal: boolean }) {
  const { data, error, isPending, refetch } = useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: () => api.get<UserDashboard>('/dashboard/me'),
  });

  // Content loads client-side, so honour #anchors (e.g. #weak-topics) once it is rendered.
  useEffect(() => {
    if (!data || !window.location.hash) return;
    document.querySelector(window.location.hash)?.scrollIntoView({ behavior: 'smooth' });
  }, [data]);

  if (isPending) return <CardGridSkeleton cards={6} />;
  if (error) return <ErrorState error={error} onRetry={() => void refetch()} />;

  const { overview } = data;
  return (
    <div className="space-y-6">
      {needsGoal && (
        <Alert variant="info">
          <Target />
          <AlertTitle>Set your preparation goal</AlertTitle>
          <AlertDescription>
            <p>Tell us what you are preparing for so we can tailor recommendations.</p>
            <Button asChild size="sm" className="mt-1">
              <Link href="/onboarding">Choose goal</Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <TodayExamCard />
      <ClosingSoonCard circulars={data.savedClosingSoon} />
      <GettingStartedCard overview={overview} />
      <RecommendedCircularsCard circulars={data.recommendedCirculars} goal={data.preparationGoal} />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
        <StatCard
          label="Exams taken"
          value={overview.examsTaken}
          icon={ClipboardList}
          hint={`Best score ${formatPercent(overview.bestScore)}`}
        />
        <StatCard
          label="Average score"
          value={formatPercent(overview.averageScore)}
          icon={Trophy}
          tone="success"
        />
        <StatCard
          label="Overall accuracy"
          value={formatPercent(overview.accuracy)}
          icon={Percent}
          hint="Correct ÷ answered"
        />
        <StatCard
          label="Completed topics"
          value={`${overview.completedTopics}/${overview.totalTopics}`}
          icon={BookCheck}
          tone="success"
          hint={`${overview.totalTopics - overview.completedTopics} pending`}
        />
        <StatCard
          label="Current streak"
          value={`${overview.currentStreak} day${overview.currentStreak === 1 ? '' : 's'}`}
          icon={Flame}
          tone="warning"
          hint="Days in a row with an exam or completed topic"
        />
        <StatCard
          label="Saved circulars"
          value={overview.savedCirculars}
          icon={Bookmark}
          hint={
            <Link href="/dashboard/saved" className="hover:underline">
              View saved
            </Link>
          }
        />
      </div>

      {/* Charts mean nothing before the first exam; the checklist above covers that stage. */}
      {overview.examsTaken > 0 && (
        <>
          <div className="grid gap-4 xl:grid-cols-2">
            <PerformanceChart data={data.performanceOverTime} />
            <SubjectPerformanceChart data={data.subjectPerformance} />
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <AnswerBreakdownChart data={data.answerBreakdown} />
            <WeakTopicsCard topics={data.weakTopics} />
            <RecentAttemptsCard attempts={data.recentAttempts} />
          </div>
        </>
      )}
      {data.topicProgress.length > 0 && <TopicProgressCard data={data.topicProgress} />}
    </div>
  );
}
