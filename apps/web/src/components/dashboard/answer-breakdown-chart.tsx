'use client';

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartCard } from '@/components/dashboard/chart-card';
import type { UserDashboard } from '@/types/api';

const SLICES = [
  { key: 'correct', name: 'Correct', color: 'var(--chart-2)' },
  { key: 'incorrect', name: 'Incorrect', color: 'var(--chart-3)' },
  { key: 'unanswered', name: 'Unanswered', color: 'var(--chart-5)' },
] as const;

export function AnswerBreakdownChart({ data }: { data: UserDashboard['answerBreakdown'] }) {
  const slices = SLICES.map((slice) => ({ ...slice, value: data[slice.key] }));
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);
  return (
    <ChartCard
      title="Correct vs incorrect"
      description="All answers across your exams"
      isEmpty={total === 0}
      emptyMessage="No answers recorded yet."
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={slices}
            dataKey="value"
            nameKey="name"
            innerRadius="55%"
            outerRadius="80%"
            paddingAngle={2}
          >
            {slices.map((slice) => (
              <Cell key={slice.key} fill={slice.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--border)' }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
