import { ArrowLeft, Info } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AccessBadge } from '@/components/common/access-badge';
import { ExamActionButton } from '@/components/exams/exam-action-button';
import { ExamMeta } from '@/components/exams/exam-meta';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { serverApiOrNull } from '@/lib/api-server';
import { formatDateTime, formatNumber, formatPercent } from '@/lib/format';
import type { ExamDetail } from '@/types/api';

export const metadata: Metadata = { title: 'Exam' };

export default async function ExamDetailPage({ params }: { params: Promise<{ examId: string }> }) {
  const exam = await serverApiOrNull<ExamDetail>(
    `/exams/${encodeURIComponent((await params).examId)}`,
  );
  if (!exam) notFound();
  const submitted = exam.attempts.filter((a) => a.status === 'SUBMITTED');

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/exams">
          <ArrowLeft /> All exams
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle className="text-2xl">{exam.title}</CardTitle>
            <AccessBadge level={exam.accessLevel} locked={exam.isLocked} />
          </div>
          {exam.description && <p className="text-muted-foreground">{exam.description}</p>}
        </CardHeader>
        <CardContent className="space-y-5">
          <ExamMeta exam={exam} />
          <Alert variant="info">
            <Info />
            <AlertTitle>Before you start</AlertTitle>
            <AlertDescription>
              <ul className="list-disc space-y-1 pl-4">
                <li>The timer starts immediately and keeps running even if you close the page.</li>
                <li>
                  Answers are saved automatically; the exam submits itself when time runs out.
                </li>
                <li>
                  Each correct answer earns {formatNumber(exam.marksPerQuestion)} mark
                  {exam.negativeMarking > 0
                    ? `; each wrong answer deducts ${formatNumber(exam.negativeMarking)}.`
                    : '. There is no negative marking.'}
                </li>
                <li>
                  {exam.allowMultipleAttempts
                    ? 'You may retake this exam.'
                    : 'Only one attempt is allowed.'}
                </li>
              </ul>
            </AlertDescription>
          </Alert>
          <ExamActionButton exam={exam} size="lg" />
        </CardContent>
      </Card>

      {submitted.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your attempts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Marks</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {submitted.map((attempt) => (
                  <TableRow key={attempt.id}>
                    <TableCell>{attempt.attemptNumber}</TableCell>
                    <TableCell>{formatDateTime(attempt.submittedAt)}</TableCell>
                    <TableCell>
                      {formatNumber(attempt.obtainedMarks)}/{formatNumber(attempt.totalMarks)}
                    </TableCell>
                    <TableCell>{formatPercent(attempt.percentage)}</TableCell>
                    <TableCell className="text-right">
                      <Button asChild size="sm" variant="ghost">
                        <Link href={`/exams/results/${attempt.id}`}>Review</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
