import type { CircularStatus } from '@/types/api';

export const TIME_ZONE = 'Asia/Dhaka';
const DHAKA_OFFSET = '+06:00';
const DAY_MS = 24 * 60 * 60 * 1000;

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: TIME_ZONE,
});
const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
  timeZone: TIME_ZONE,
});

export function formatDate(value: string | Date | null | undefined): string {
  return value ? dateFormatter.format(new Date(value)) : '—';
}

export function formatDateTime(value: string | Date | null | undefined): string {
  return value ? dateTimeFormatter.format(new Date(value)) : '—';
}

/** Formats a YYYY-MM-DD business date without timezone shifting. */
export function formatIsoDate(value: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`));
}

export function formatDuration(totalSeconds: number): string {
  const seconds = Math.max(0, Math.round(totalSeconds));
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m ? `${m}m ${s.toString().padStart(2, '0')}s` : `${s}s`;
}

/** mm:ss (or h:mm:ss) countdown display. */
export function formatClock(totalSeconds: number): string {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const mm = m.toString().padStart(2, '0');
  const ss = s.toString().padStart(2, '0');
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export function formatPercent(value: number): string {
  return `${Number.isInteger(value) ? value : value.toFixed(1)}%`;
}

export function formatNumber(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/\.?0+$/, '');
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export type DeadlineTone = 'success' | 'warning' | 'destructive' | 'secondary';

/** Human-readable application status for a circular. */
export function deadlineInfo(
  circular: { status: CircularStatus; applicationStartDate: string; applicationDeadline: string },
  now: Date = new Date(),
): { label: string; tone: DeadlineTone } {
  const deadline = new Date(circular.applicationDeadline);
  if (circular.status === 'draft') return { label: 'Draft', tone: 'secondary' };
  if (circular.status === 'closed' || deadline < now) return { label: 'Closed', tone: 'secondary' };
  if (circular.status === 'upcoming')
    return { label: `Opens ${formatDate(circular.applicationStartDate)}`, tone: 'secondary' };
  const msLeft = deadline.getTime() - now.getTime();
  const days = Math.floor(msLeft / DAY_MS);
  if (days < 1) {
    const hours = Math.max(1, Math.ceil(msLeft / (60 * 60 * 1000)));
    return { label: `Closes in ${hours}h`, tone: 'destructive' };
  }
  if (days <= 3) return { label: `${days} day${days > 1 ? 's' : ''} left`, tone: 'warning' };
  return { label: `${days} days left`, tone: 'success' };
}

/** ISO instant → value for <input type="datetime-local"> in Dhaka time. */
export function toDhakaInputValue(value: string | Date | null | undefined): string {
  if (!value) return '';
  const shifted = new Date(new Date(value).getTime() + 6 * 60 * 60 * 1000);
  return shifted.toISOString().slice(0, 16);
}

/** <input type="datetime-local"> value interpreted as Dhaka time → ISO string. */
export function fromDhakaInputValue(value: string): string {
  return new Date(`${value}:00${DHAKA_OFFSET}`).toISOString();
}

/** Today's date in Dhaka as YYYY-MM-DD. */
export function todayInDhaka(now: Date = new Date()): string {
  return new Date(now.getTime() + 6 * 60 * 60 * 1000).toISOString().slice(0, 10);
}
