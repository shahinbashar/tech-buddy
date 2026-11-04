'use client';

import { Pencil, Plus } from 'lucide-react';
import { DeleteButton } from '@/components/admin/delete-button';
import { SubjectFormDialog } from '@/components/admin/subject-form-dialog';
import { ToggleSwitch } from '@/components/admin/toggle-switch';
import { EmptyState } from '@/components/common/empty-state';
import { ErrorState } from '@/components/common/error-state';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { PageHeader } from '@/components/common/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAdminSubjects } from '@/hooks/use-admin-options';
import { SUBJECT_CATEGORY_LABELS } from '@/lib/constants';

export function SubjectsTable() {
  const { data, error, isPending, refetch } = useAdminSubjects();
  return (
    <div className="space-y-6">
      <PageHeader
        title="Subjects"
        description="Top-level study areas. Subjects with questions cannot be deleted."
        actions={
          <SubjectFormDialog
            trigger={
              <Button>
                <Plus /> New subject
              </Button>
            }
          />
        }
      />
      {isPending ? (
        <ListSkeleton />
      ) : error ? (
        <ErrorState error={error} onRetry={() => void refetch()} />
      ) : data.length === 0 ? (
        <EmptyState
          title="No subjects yet"
          description="Create your first subject to start adding topics."
        />
      ) : (
        <Card className="py-2">
          <CardContent className="px-2 sm:px-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Topics</TableHead>
                  <TableHead className="text-right">Questions</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((subject) => (
                  <TableRow key={subject.id}>
                    <TableCell>{subject.order}</TableCell>
                    <TableCell>
                      <p className="font-medium">{subject.name}</p>
                      {subject.nameBn && (
                        <p className="text-muted-foreground text-xs">{subject.nameBn}</p>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{SUBJECT_CATEGORY_LABELS[subject.category]}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{subject.topicCount}</TableCell>
                    <TableCell className="text-right">{subject.questionCount}</TableCell>
                    <TableCell>
                      <ToggleSwitch
                        endpoint={`/admin/subjects/${subject.id}`}
                        field="isPublished"
                        checked={subject.isPublished}
                        label={`Publish ${subject.name}`}
                        successMessage={(next) => (next ? 'Subject published' : 'Subject hidden')}
                      />
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      <SubjectFormDialog
                        subject={subject}
                        trigger={
                          <Button variant="ghost" size="icon" aria-label={`Edit ${subject.name}`}>
                            <Pencil />
                          </Button>
                        }
                      />
                      <DeleteButton
                        endpoint={`/admin/subjects/${subject.id}`}
                        itemLabel="Subject"
                        description="All topics and notes in this subject will be deleted too."
                      />
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
