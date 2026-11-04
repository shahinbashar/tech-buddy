'use client';

import { useQuery } from '@tanstack/react-query';
import {
  BriefcaseBusiness,
  ClipboardList,
  Crown,
  FileQuestion,
  FileText,
  FolderTree,
  UserPlus,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { ErrorState } from '@/components/common/error-state';
import { CardGridSkeleton } from '@/components/common/list-skeleton';
import { StatCard } from '@/components/common/stat-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/format';
import { queryKeys } from '@/lib/query-keys';
import type { AdminOverview as AdminOverviewData } from '@/types/api';

const QUICK_ACTIONS = [
  { href: '/admin/circulars/new', label: 'New circular' },
  { href: '/admin/questions/new', label: 'New question' },
  { href: '/admin/notes/new', label: 'New note' },
  { href: '/admin/exams/new', label: 'New daily exam' },
];

export function AdminOverview() {
  const { data, error, isPending, refetch } = useQuery({
    queryKey: queryKeys.admin.overview,
    queryFn: () => api.get<AdminOverviewData>('/admin/dashboard'),
  });
  if (isPending) return <CardGridSkeleton cards={8} />;
  if (error) return <ErrorState error={error} onRetry={() => void refetch()} />;
  const { counts } = data;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {QUICK_ACTIONS.map((action) => (
          <Button key={action.href} asChild size="sm" variant="outline">
            <Link href={action.href}>{action.label}</Link>
          </Button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Registered users"
          value={counts.users}
          icon={Users}
          hint={`${counts.newUsers} new this week`}
        />
        <StatCard label="Premium users" value={counts.premiumUsers} icon={Crown} tone="premium" />
        <StatCard
          label="Running circulars"
          value={counts.runningCirculars}
          icon={BriefcaseBusiness}
          tone="success"
          hint={`${counts.circulars} total`}
        />
        <StatCard
          label="Exam attempts today"
          value={counts.attemptsToday}
          icon={ClipboardList}
          tone="warning"
          hint={`${counts.exams} exams`}
        />
        <StatCard
          label="Questions"
          value={counts.questions}
          icon={FileQuestion}
          hint={`${counts.publishedQuestions} published`}
        />
        <StatCard
          label="Topics"
          value={counts.topics}
          icon={FolderTree}
          hint={`${counts.subjects} subjects`}
        />
        <StatCard label="Notes" value={counts.notes} icon={FileText} />
      </div>
      <Card className="gap-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <UserPlus className="size-4" aria-hidden /> Newest users
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.recentUsers.length ? (
            <ul className="divide-y text-sm">
              {data.recentUsers.map((user) => (
                <li key={user.id} className="flex justify-between gap-3 py-2">
                  <span>
                    <span className="font-medium">{user.fullName}</span>
                    <span className="text-muted-foreground block text-xs">{user.email}</span>
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {formatDate(user.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-sm">No users yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
