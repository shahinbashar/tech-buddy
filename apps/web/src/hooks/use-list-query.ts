'use client';

import { keepPreviousData, type QueryKey, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { api } from '@/lib/api';
import type { Paginated } from '@/types/api';

type Filters = Record<string, string | undefined>;

interface ListQueryOptions {
  endpoint: string;
  queryKey: (params: object) => QueryKey;
  pageSize?: number;
  /** Filter keys that must be cleared when another filter changes, e.g. { subjectId: ['topicId'] }. */
  dependents?: Record<string, string[]>;
}

/**
 * State for a searchable, filterable, paginated list: debounced search, filters,
 * page reset on any change, and a query that keeps the previous page while loading.
 */
export function useListQuery<T>({
  endpoint,
  queryKey,
  pageSize = 20,
  dependents = {},
}: ListQueryOptions) {
  const [search, setSearchValue] = useState('');
  const [filters, setFilters] = useState<Filters>({});
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebouncedValue(search);
  const params = { search: debouncedSearch, ...filters, page, pageSize };

  const query = useQuery({
    queryKey: queryKey(params),
    queryFn: () => api.get<Paginated<T>>(endpoint, params),
    placeholderData: keepPreviousData,
  });

  const setSearch = (value: string) => {
    setSearchValue(value);
    setPage(1);
  };

  const setFilter = (key: string) => (value: string | undefined) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      for (const dependent of dependents[key] ?? []) delete next[dependent];
      return next;
    });
    setPage(1);
  };

  return { search, setSearch, filters, setFilter, setPage, query };
}
