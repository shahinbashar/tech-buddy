import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatPercent } from '@/lib/format';
import type { SubmittedAttempt } from '@/types/api';

export function SubjectBreakdownTable({ rows }: { rows: SubmittedAttempt['subjectBreakdown'] }) {
  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="text-base">Subject-wise breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead className="text-right">Correct</TableHead>
              <TableHead className="text-right">Incorrect</TableHead>
              <TableHead className="text-right">Unanswered</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.subjectName}>
                <TableCell className="font-medium">{row.subjectName}</TableCell>
                <TableCell className="text-success text-right">{row.correct}</TableCell>
                <TableCell className="text-destructive text-right">{row.incorrect}</TableCell>
                <TableCell className="text-right">{row.unanswered}</TableCell>
                <TableCell className="text-right">
                  {formatPercent(Math.round((row.correct / row.total) * 100))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
