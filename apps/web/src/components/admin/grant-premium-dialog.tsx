'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Crown, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { SelectField, TextareaField, TextField } from '@/components/admin/form-fields';
import { UserPicker } from '@/components/admin/user-picker';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAdminMutation } from '@/hooks/use-admin-mutation';
import { grantSchema, type GrantFormValues } from '@/lib/admin-schemas';
import { api } from '@/lib/api';
import { fromDhakaInputValue } from '@/lib/format';
import { queryKeys } from '@/lib/query-keys';
import type { PremiumPlan } from '@/types/api';

interface GrantPremiumDialogProps {
  user?: { id: string; fullName: string; email: string };
  trigger?: React.ReactNode;
}

export function GrantPremiumDialog({ user, trigger }: GrantPremiumDialogProps) {
  const [open, setOpen] = useState(false);
  const [pickedLabel, setPickedLabel] = useState(user ? `${user.fullName} (${user.email})` : '');
  const { data: plans = [] } = useQuery({
    queryKey: queryKeys.plans,
    queryFn: () => api.get<PremiumPlan[]>('/premium/plans'),
  });
  const blank: GrantFormValues = { userId: user?.id ?? '', planId: null, expiresAt: '', note: '' };
  const form = useForm<GrantFormValues>({
    resolver: zodResolver(grantSchema),
    defaultValues: blank,
  });
  const planId = useWatch({ control: form.control, name: 'planId' });

  const grant = useAdminMutation<GrantFormValues>({
    mutationFn: (values) =>
      api.post('/admin/entitlements', {
        userId: values.userId,
        planId: values.planId ?? undefined,
        expiresAt: values.expiresAt ? fromDhakaInputValue(`${values.expiresAt}T23:59`) : undefined,
        note: values.note || undefined,
      }),
    successMessage: 'Premium access granted',
    onSuccess: () => setOpen(false),
  });

  const planOptions = plans.map((p) => ({
    value: p.id,
    label: `${p.name} — ৳${p.priceBdt}${p.durationDays ? ` / ${p.durationDays} days` : ' (lifetime)'}`,
  }));

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
          form.reset(blank);
          setPickedLabel(user ? `${user.fullName} (${user.email})` : '');
        }
      }}
    >
      <DialogTrigger asChild>
        {trigger ?? (
          <Button>
            <Crown /> Grant premium
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Grant premium access</DialogTitle>
          <DialogDescription>
            Use after confirming a manual payment. Choose a plan to set the expiry automatically, or
            set a custom expiry.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => grant.mutate(values))}
            className="space-y-4"
            noValidate
          >
            <FormItem>
              <FormLabel>User</FormLabel>
              {pickedLabel && (
                <p className="bg-muted rounded-md px-3 py-2 text-sm">{pickedLabel}</p>
              )}
              {!user && (
                <Controller
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <UserPicker
                      selectedId={field.value}
                      onSelect={(picked) => {
                        field.onChange(picked.id);
                        setPickedLabel(`${picked.fullName} (${picked.email})`);
                      }}
                    />
                  )}
                />
              )}
              <FormMessage>{form.formState.errors.userId?.message}</FormMessage>
            </FormItem>
            <SelectField
              control={form.control}
              name="planId"
              label="Plan"
              options={planOptions}
              noneLabel="Custom (no plan)"
            />
            <TextField
              control={form.control}
              name="expiresAt"
              label="Expiry date (optional)"
              type="date"
              description={
                planId ? 'Overrides the plan duration when set.' : 'Leave empty for no expiry.'
              }
            />
            <TextareaField
              control={form.control}
              name="note"
              label="Internal note"
              rows={2}
              placeholder="e.g. bKash TrxID 8N7A6…"
            />
            <Button type="submit" className="w-full" disabled={grant.isPending}>
              {grant.isPending && <Loader2 className="animate-spin" />}
              Grant access
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
