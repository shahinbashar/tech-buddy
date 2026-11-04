'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { loginSchema, safeRedirect, type LoginValues } from '@/lib/validation';
import type { User } from '@/types/api';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const login = useMutation({
    mutationFn: (values: LoginValues) => api.post<{ user: User }>('/auth/login', values),
    onSuccess: ({ user }) => {
      queryClient.setQueryData(queryKeys.me, user);
      toast.success(`Welcome back, ${user.fullName.split(' ')[0]}!`);
      router.push(
        safeRedirect(searchParams.get('next'), user.role === 'ADMIN' ? '/admin' : '/dashboard'),
      );
      router.refresh();
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => login.mutate(values))}
        className="space-y-4"
        noValidate
      >
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="current-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={login.isPending}>
          {login.isPending && <Loader2 className="animate-spin" />}
          Log in
        </Button>
      </form>
    </Form>
  );
}
