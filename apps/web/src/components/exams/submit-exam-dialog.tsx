'use client';

import { Loader2, Send } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface SubmitExamDialogProps {
  unanswered: number;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function SubmitExamDialog({ unanswered, isSubmitting, onSubmit }: SubmitExamDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="success" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin" /> : <Send />}
          Submit exam
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit your exam?</DialogTitle>
          <DialogDescription>
            {unanswered > 0
              ? `You still have ${unanswered} unanswered question${unanswered === 1 ? '' : 's'}. You can’t change answers after submitting.`
              : 'All questions are answered. You can’t change answers after submitting.'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Keep working
          </Button>
          <Button
            variant="success"
            disabled={isSubmitting}
            onClick={() => {
              setOpen(false);
              onSubmit();
            }}
          >
            Submit now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
