'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
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
import { queryKeys } from '@/lib/query-keys';
import { profileSchema, type ProfileValues } from '@/lib/validation';
import type { User } from '@/types/api';

export function ProfileForm({ user }: { user: User }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullName: user.fullName, phone: user.phone ?? '' },
  });

  const save = useMutation({
    mutationFn: (values: ProfileValues) =>
      api.patch<User>('/users/me', { fullName: values.fullName, phone: values.phone || null }),
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKeys.me, updated);
      form.reset({ fullName: updated.fullName, phone: updated.phone ?? '' });
      toast.success('Profile updated');
      router.refresh();
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => save.mutate(values))}
        className="space-y-4"
        noValidate
      >
        <div className="grid gap-1">
          <span className="text-sm font-medium">Email</span>
          <span className="text-muted-foreground text-sm">{user.email}</span>
        </div>
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="01XXXXXXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={save.isPending || !form.formState.isDirty}>
          {save.isPending && <Loader2 className="animate-spin" />}
          Save changes
        </Button>
      </form>
    </Form>
  );
}
