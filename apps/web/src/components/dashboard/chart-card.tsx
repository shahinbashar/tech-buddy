import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartCardProps {
  title: string;
  description?: string;
  isEmpty: boolean;
  emptyMessage: string;
  children: React.ReactNode;
}

export function ChartCard({ title, description, isEmpty, emptyMessage, children }: ChartCardProps) {
  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <div className="text-muted-foreground flex h-56 items-center justify-center rounded-lg border border-dashed text-center text-sm">
            {emptyMessage}
          </div>
        ) : (
          <div className="h-64">{children}</div>
        )}
      </CardContent>
    </Card>
  );
}
