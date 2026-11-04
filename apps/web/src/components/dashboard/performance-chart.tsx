'use client';

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartCard } from '@/components/dashboard/chart-card';
import { formatDate } from '@/lib/format';
import type { UserDashboard } from '@/types/api';

export function PerformanceChart({ data }: { data: UserDashboard['performanceOverTime'] }) {
  const points = data.map((point) => ({ ...point, label: formatDate(point.date) }));
  return (
    <ChartCard
      title="Exam performance over time"
      description="Score (%) of your last 20 exams"
      isEmpty={points.length === 0}
      emptyMessage="Take your first exam to see your score trend."
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={points} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12 }}
            stroke="var(--muted-foreground)"
            unit="%"
          />
          <Tooltip
            formatter={(value) => [`${value}%`, 'Score']}
            labelFormatter={(_label, payload) => payload?.[0]?.payload?.examTitle ?? ''}
            contentStyle={{ borderRadius: 8, border: '1px solid var(--border)' }}
          />
          <Line
            type="monotone"
            dataKey="percentage"
            stroke="var(--chart-1)"
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
