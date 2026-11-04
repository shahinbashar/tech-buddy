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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';
import { errorMessage } from '@/lib/api-error';
import { queryKeys } from '@/lib/query-keys';
import { registerSchema, type RegisterValues } from '@/lib/validation';
import type { User } from '@/types/api';

export function RegisterForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: '', email: '', phone: '', password: '', confirmPassword: '' },
  });

  const register = useMutation({
    mutationFn: ({ confirmPassword: _confirm, phone, ...values }: RegisterValues) =>
      api.post<{ user: User }>('/auth/register', { ...values, phone: phone || undefined }),
    onSuccess: ({ user }) => {
      queryClient.setQueryData(queryKeys.me, user);
      toast.success('Account created — welcome to Tech Buddy!');
      router.push('/onboarding');
      router.refresh();
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => register.mutate(values))}
        className="space-y-4"
        noValidate
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input autoComplete="name" placeholder="Rahim Uddin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" placeholder="you@example.com" {...field} />
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
              <FormLabel>Mobile number (optional)</FormLabel>
              <FormControl>
                <Input type="tel" autoComplete="tel" placeholder="01XXXXXXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="new-password" {...field} />
              </FormControl>
              <FormDescription>At least 8 characters with a letter and a number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={register.isPending}>
          {register.isPending && <Loader2 className="animate-spin" />}
          Create account
        </Button>
      </form>
    </Form>
  );
}
