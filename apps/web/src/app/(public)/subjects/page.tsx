import { BookOpen } from 'lucide-react';
import type { Metadata } from 'next';
import { EmptyState } from '@/components/common/empty-state';
import { PageHeader } from '@/components/common/page-header';
import { SubjectCard } from '@/components/learning/subject-card';
import { serverApi } from '@/lib/api-server';
import { getSessionUser } from '@/lib/session';
import type { SubjectSummary } from '@/types/api';

export const metadata: Metadata = {
  title: 'Subjects & study notes',
  description:
    'Topic-wise study notes for Bangla, English, Mathematics, GK, ICT and Computer Science.',
};

function SubjectGroup({
  title,
  subjects,
  showProgress,
}: {
  title: string;
  subjects: SubjectSummary[];
  showProgress: boolean;
}) {
  if (!subjects.length) return null;
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} showProgress={showProgress} />
        ))}
      </div>
    </section>
  );
}

export default async function SubjectsPage() {
  const [subjects, user] = await Promise.all([
    serverApi<SubjectSummary[]>('/subjects'),
    getSessionUser(),
  ]);
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6">
      <PageHeader
        title="Subjects"
        description="Pick a subject, work through its topics and mark them complete as you go."
      />
      {subjects.length ? (
        <>
          <SubjectGroup
            title="General"
            subjects={subjects.filter((s) => s.category === 'GENERAL')}
            showProgress={Boolean(user)}
          />
          <SubjectGroup
            title="Technical"
            subjects={subjects.filter((s) => s.category === 'TECHNICAL')}
            showProgress={Boolean(user)}
          />
        </>
      ) : (
        <EmptyState
          icon={BookOpen}
          title="No subjects yet"
          description="Study material will appear here once published."
        />
      )}
    </div>
  );
}
