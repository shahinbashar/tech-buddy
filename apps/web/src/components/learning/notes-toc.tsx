import { List } from 'lucide-react';
import type { PublicNote } from '@/types/api';

/** "On this page" links when a topic has several notes. */
export function NotesToc({ notes }: { notes: PublicNote[] }) {
  if (notes.length < 2) return null;
  return (
    <nav aria-label="Notes on this page" className="bg-card rounded-xl border p-4">
      <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
        <List className="size-4" aria-hidden /> On this page
      </p>
      <ol className="list-decimal space-y-1 pl-5 text-sm">
        {notes.map((note) => (
          <li key={note.id}>
            <a href={`#note-${note.id}`} className="text-primary hover:underline">
              {note.title}
            </a>
            {note.isLocked && <span className="text-muted-foreground"> (Premium)</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
