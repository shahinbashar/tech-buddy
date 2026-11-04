import type { Metadata } from 'next';
import { ChangePasswordForm } from '@/components/auth/change-password-form';
import { GoalPicker } from '@/components/auth/goal-picker';
import { ProfileForm } from '@/components/auth/profile-form';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { requireUser } from '@/lib/session';

export const metadata: Metadata = { title: 'Profile settings' };

export default async function ProfilePage() {
  const user = await requireUser('/profile');
  return (
    <div className="space-y-6">
      <PageHeader title="Profile settings" />
      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal information</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileForm user={user} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Use at least 8 characters with a letter and a number.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Preparation goal</CardTitle>
          <CardDescription>What are you preparing for?</CardDescription>
        </CardHeader>
        <CardContent>
          <GoalPicker initialGoal={user.preparationGoal} />
        </CardContent>
      </Card>
    </div>
  );
}
