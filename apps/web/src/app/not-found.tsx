import { SearchX } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3 px-4 text-center">
      <SearchX className="text-muted-foreground size-12" aria-hidden />
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="text-muted-foreground max-w-md">
        The page you are looking for doesn’t exist or is no longer published.
      </p>
      <Button asChild className="mt-2">
        <Link href="/">Go to home</Link>
      </Button>
    </div>
  );
}
