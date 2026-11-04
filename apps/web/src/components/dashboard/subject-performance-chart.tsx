'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartCard } from '@/components/dashboard/chart-card';
import type { UserDashboard } from '@/types/api';

/** Horizontal bars so long subject names stay readable. */
export function SubjectPerformanceChart({ data }: { data: UserDashboard['subjectPerformance'] }) {
  return (
    <ChartCard
      title="Subject-wise performance"
      description="Correct vs incorrect answers per subject"
      isEmpty={data.length === 0}
      emptyMessage="Subject analytics appear after your first exam."
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 12, left: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
          <XAxis
            type="number"
            allowDecimals={false}
            tick={{ fontSize: 12 }}
            stroke="var(--muted-foreground)"
          />
          <YAxis
            type="category"
            dataKey="subjectName"
            width={120}
            tick={{ fontSize: 12 }}
            stroke="var(--muted-foreground)"
          />
          <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--border)' }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="correct" name="Correct" stackId="a" fill="var(--chart-2)" />
          <Bar
            dataKey="incorrect"
            name="Incorrect"
            stackId="a"
            fill="var(--chart-3)"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
