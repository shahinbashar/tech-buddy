'use client';

import { useQuery } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { SearchInput } from '@/components/admin/search-input';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/query-keys';
import { cn } from '@/lib/utils';
import type { AdminUserRow, Paginated } from '@/types/api';

interface UserPickerProps {
  selectedId: string;
  onSelect: (user: AdminUserRow) => void;
}

/** Search-as-you-type user selector for admin dialogs. */
export function UserPicker({ selectedId, onSelect }: UserPickerProps) {
  const [search, setSearch] = useState('');
  const debounced = useDebouncedValue(search);
  const params = { search: debounced, role: 'USER', pageSize: 6, page: 1 };
  const { data, isFetching } = useQuery({
    queryKey: queryKeys.admin.users(params),
    queryFn: () => api.get<Paginated<AdminUserRow>>('/admin/users', params),
    enabled: debounced.trim().length >= 2,
  });

  return (
    <div className="space-y-2">
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search by name, email or phone…"
      />
      {debounced.trim().length >= 2 && (
        <ul className="max-h-52 divide-y overflow-y-auto rounded-md border" aria-busy={isFetching}>
          {data?.items.length ? (
            data.items.map((user) => (
              <li key={user.id}>
                <button
                  type="button"
                  onClick={() => onSelect(user)}
                  className={cn(
                    'hover:bg-muted flex w-full items-center gap-2 px-3 py-2 text-left text-sm',
                    selectedId === user.id && 'bg-primary/5',
                  )}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{user.fullName}</span>
                    <span className="text-muted-foreground block truncate text-xs">
                      {user.email}
                    </span>
                  </span>
                  {selectedId === user.id && (
                    <Check className="text-primary size-4" aria-label="Selected" />
                  )}
                </button>
              </li>
            ))
          ) : (
            <li className="text-muted-foreground px-3 py-2 text-sm">
              {isFetching ? 'Searching…' : 'No users found'}
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
