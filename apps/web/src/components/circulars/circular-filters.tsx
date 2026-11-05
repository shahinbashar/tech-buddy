'use client';

import { Search, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CIRCULAR_CATEGORY_LABELS } from '@/lib/constants';

const ALL = 'all';
const DEADLINE_OPTIONS = [
  { value: 'today', label: 'Closing today' },
  { value: 'week', label: 'Closing within 7 days' },
  { value: 'month', label: 'Closing within 30 days' },
];

export function CircularFilters({ showDeadline }: { showDeadline: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams.get('search') ?? '');

  const update = (changes: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(changes).forEach(([key, value]) =>
      value && value !== ALL ? params.set(key, value) : params.delete(key),
    );
    params.delete('page');
    const qs = params.toString();
    startTransition(() => router.push(qs ? `${pathname}?${qs}` : pathname));
  };

  const hasFilters = ['search', 'category', 'deadline'].some((key) => searchParams.has(key));

  return (
    <form
      // Phones: search + button on one row, the two filters side by side below.
      className="bg-card grid gap-2 rounded-xl border p-3 shadow-sm sm:p-4 md:grid-cols-[1fr_200px_220px] md:gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        update({ search: search.trim() || null });
      }}
      aria-busy={isPending}
    >
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-2.5 left-3 size-4" aria-hidden />
          <Input
            type="search"
            enterKeyHint="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Organization or post…"
            className="pl-9"
            aria-label="Search circulars"
          />
        </div>
        <Button type="submit" disabled={isPending}>
          Search
        </Button>
        {hasFilters && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Clear filters"
            onClick={() => {
              setSearch('');
              update({ search: null, category: null, deadline: null });
            }}
          >
            <X />
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2 md:contents">
        <Select
          value={searchParams.get('category') ?? ALL}
          onValueChange={(value) => update({ category: value })}
        >
          <SelectTrigger aria-label="Filter by category" className="w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All categories</SelectItem>
            {Object.entries(CIRCULAR_CATEGORY_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {showDeadline && (
          <Select
            value={searchParams.get('deadline') ?? ALL}
            onValueChange={(value) => update({ deadline: value })}
          >
            <SelectTrigger aria-label="Filter by deadline" className="w-full">
              <SelectValue placeholder="Deadline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Any deadline</SelectItem>
              {DEADLINE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </form>
  );
}
