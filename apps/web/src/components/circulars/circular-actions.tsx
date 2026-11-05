'use client';

import { CalendarPlus, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { buildDeadlineIcs } from '@/lib/ics';
import { formatDateTime } from '@/lib/format';

interface CircularRef {
  id: string;
  slug: string;
  title: string;
  organizationName: string;
  applicationDeadline: string;
}

function circularUrl(slug: string) {
  return `${window.location.origin}/circulars/${slug}`;
}

/** Downloads a calendar event for the deadline, with reminders a day and two hours before. */
export function AddToCalendarButton({ circular }: { circular: CircularRef }) {
  const download = () => {
    const ics = buildDeadlineIcs({
      uid: `circular-${circular.id}@techbuddy`,
      title: `${circular.title} — ${circular.organizationName}`,
      description: `Application deadline: ${formatDateTime(circular.applicationDeadline)}`,
      url: circularUrl(circular.slug),
      deadline: circular.applicationDeadline,
    });
    const href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    const link = Object.assign(document.createElement('a'), {
      href,
      download: `${circular.slug}-deadline.ics`,
    });
    link.click();
    URL.revokeObjectURL(href);
    toast.success('Calendar event downloaded — open it to add the reminder');
  };
  return (
    <Button variant="outline" onClick={download}>
      <CalendarPlus /> Add to calendar
    </Button>
  );
}

/** Native share sheet on phones (WhatsApp, Messenger…); copies the link elsewhere. */
export function ShareCircularButton({ circular }: { circular: CircularRef }) {
  const share = async () => {
    const url = circularUrl(circular.slug);
    const text = `${circular.title} — ${circular.organizationName}. Apply by ${formatDateTime(circular.applicationDeadline)}.`;
    if (navigator.share) {
      try {
        await navigator.share({ title: circular.title, text, url });
      } catch {
        // Dismissing the share sheet is not an error worth reporting.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      toast.success('Link copied');
    } catch {
      toast.error('Could not copy the link');
    }
  };
  return (
    <Button variant="ghost" onClick={() => void share()}>
      <Share2 /> Share
    </Button>
  );
}
