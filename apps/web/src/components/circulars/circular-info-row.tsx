export function CircularInfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  if (value === null || value === undefined || value === '') return null;
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-[200px_1fr] sm:gap-4">
      <dt className="text-muted-foreground text-sm font-medium">{label}</dt>
      <dd className="text-sm whitespace-pre-line">{value}</dd>
    </div>
  );
}
