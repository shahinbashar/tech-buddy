import { BookOpen, BriefcaseBusiness, ClipboardList, LineChart } from 'lucide-react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = { title: 'About us' };

const PILLARS = [
  {
    icon: BriefcaseBusiness,
    title: 'Discover circulars',
    text: 'Running and archived government circulars with clear deadlines.',
  },
  {
    icon: BookOpen,
    title: 'Study by topic',
    text: 'Structured notes from Bangla to Computer Networks.',
  },
  {
    icon: ClipboardList,
    title: 'Practise daily',
    text: 'A fresh timed MCQ exam every day with explanations.',
  },
  {
    icon: LineChart,
    title: 'Track progress',
    text: 'See your accuracy, weak topics and preparation streak.',
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6">
      <PageHeader
        title={`About ${APP_NAME}`}
        description="A focused preparation platform for Bangladeshi job seekers, starting with IT-related government recruitment exams."
      />
      <div className="prose prose-slate max-w-none">
        <p>
          Preparing for government jobs in Bangladesh means juggling circulars from dozens of
          organisations, an enormous syllabus and very little feedback on how you are doing.{' '}
          {APP_NAME} brings these together: find the circular, study the topic, practise every day
          and see exactly where you need to improve.
        </p>
        <p>
          সরকারি চাকরির প্রস্তুতিকে সহজ, নিয়মিত এবং পরিমাপযোগ্য করাই আমাদের লক্ষ্য। Core content is
          free; affordable premium materials help us keep the platform running.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {PILLARS.map(({ icon: Icon, title, text }) => (
          <Card key={title} className="gap-0 py-5">
            <CardContent className="flex gap-4">
              <Icon className="text-primary size-6 shrink-0" aria-hidden />
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-muted-foreground text-sm">{text}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
