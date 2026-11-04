'use client';

import { Download, FileUp, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAdminMutation } from '@/hooks/use-admin-mutation';
import { api } from '@/lib/api';
import type { CsvImportResult } from '@/types/api';

export function CsvImportDialog() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<CsvImportResult | null>(null);

  const importCsv = useAdminMutation<File, CsvImportResult>({
    mutationFn: (csv) => api.upload<CsvImportResult>('/admin/questions/import', csv),
    successMessage: (r) =>
      r.imported ? `Imported ${r.imported} questions` : 'Nothing imported — fix the errors below',
    onSuccess: (r) => setResult(r),
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        setFile(null);
        setResult(null);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileUp /> Import CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Import questions from CSV</DialogTitle>
          <DialogDescription>
            All rows are validated first; nothing is imported if any row has an error. Subjects and
            topics are matched by name or slug.
          </DialogDescription>
        </DialogHeader>
        <Button asChild variant="link" className="w-fit px-0">
          <a href="/api/admin/questions/import/template" download>
            <Download /> Download template
          </a>
        </Button>
        <Input
          type="file"
          accept=".csv,text/csv"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
        />
        <Button
          disabled={!file || importCsv.isPending}
          onClick={() => file && importCsv.mutate(file)}
        >
          {importCsv.isPending && <Loader2 className="animate-spin" />}
          Validate & import
        </Button>
        {result && result.errors.length > 0 && (
          <Alert variant="destructive">
            <AlertTitle>{result.errors.length} problem(s) found</AlertTitle>
            <AlertDescription>
              <ul className="max-h-48 list-disc space-y-1 overflow-y-auto pl-4">
                {result.errors.map((error) => (
                  <li key={`${error.row}-${error.message}`}>
                    {error.row > 0 ? `Row ${error.row}: ` : ''}
                    {error.message}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
        {result && result.imported > 0 && (
          <Alert variant="success">
            <AlertTitle>Imported {result.imported} questions</AlertTitle>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
}
