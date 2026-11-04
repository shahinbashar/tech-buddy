'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';
import { errorMessage } from '@/lib/api-error';
import { changePasswordSchema, type ChangePasswordValues } from '@/lib/validation';

const FIELDS: { name: keyof ChangePasswordValues; label: string; autoComplete: string }[] = [
  { name: 'currentPassword', label: 'Current password', autoComplete: 'current-password' },
  { name: 'newPassword', label: 'New password', autoComplete: 'new-password' },
  { name: 'confirmPassword', label: 'Confirm new password', autoComplete: 'new-password' },
];

export function ChangePasswordForm() {
  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const change = useMutation({
    mutationFn: ({ currentPassword, newPassword }: ChangePasswordValues) =>
      api.post<void>('/users/me/password', { currentPassword, newPassword }),
    onSuccess: () => {
      form.reset();
      toast.success('Password changed');
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => change.mutate(values))}
        className="space-y-4"
        noValidate
      >
        {FIELDS.map((config) => (
          <FormField
            key={config.name}
            control={form.control}
            name={config.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{config.label}</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete={config.autoComplete} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" variant="outline" disabled={change.isPending}>
          {change.isPending && <Loader2 className="animate-spin" />}
          Change password
        </Button>
      </form>
    </Form>
  );
}
