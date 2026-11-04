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
      className="bg-card grid gap-3 rounded-xl border p-4 shadow-sm md:grid-cols-[1fr_200px_220px_auto]"
      onSubmit={(event) => {
        event.preventDefault();
        update({ search: search.trim() || null });
      }}
      aria-busy={isPending}
    >
      <div className="relative">
        <Search className="text-muted-foreground absolute top-2.5 left-3 size-4" aria-hidden />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search organization or designation…"
          className="pl-9"
          aria-label="Search circulars"
        />
      </div>
      <Select
        value={searchParams.get('category') ?? ALL}
        onValueChange={(value) => update({ category: value })}
      >
        <SelectTrigger aria-label="Filter by category">
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
      {showDeadline ? (
        <Select
          value={searchParams.get('deadline') ?? ALL}
          onValueChange={(value) => update({ deadline: value })}
        >
          <SelectTrigger aria-label="Filter by deadline">
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
      ) : (
        <div className="hidden md:block" />
      )}
      <div className="flex gap-2">
        <Button type="submit" disabled={isPending} className="flex-1">
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
    </form>
  );
}
