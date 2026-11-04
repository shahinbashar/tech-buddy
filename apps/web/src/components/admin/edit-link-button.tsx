import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function EditLinkButton({ href, label }: { href: string; label: string }) {
  return (
    <Button asChild variant="ghost" size="icon" aria-label={label}>
      <Link href={href}>
        <Pencil />
      </Link>
    </Button>
  );
}
