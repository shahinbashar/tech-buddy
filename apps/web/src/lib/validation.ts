import { z } from 'zod';

/** Mirrors backend rules so users see errors before submitting. The API remains the source of truth. */
export const PASSWORD_RULE = /^(?=.*[A-Za-z])(?=.*\d).{8,72}$/;
export const BD_PHONE_RULE = /^(?:\+?88)?01[3-9]\d{8}$/;

const password = z
  .string()
  .regex(PASSWORD_RULE, 'Use 8–72 characters with at least one letter and one number');

export const loginSchema = z.object({
  email: z.email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});
export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullName: z.string().trim().min(2, 'Enter your full name').max(100),
    email: z.email('Enter a valid email address'),
    phone: z
      .string()
      .trim()
      .refine(
        (value) => value === '' || BD_PHONE_RULE.test(value),
        'Enter a valid Bangladeshi mobile number',
      ),
    password,
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
export type RegisterValues = z.infer<typeof registerSchema>;

export const profileSchema = z.object({
  fullName: z.string().trim().min(2, 'Enter your full name').max(100),
  phone: z
    .string()
    .trim()
    .refine(
      (value) => value === '' || BD_PHONE_RULE.test(value),
      'Enter a valid Bangladeshi mobile number',
    ),
});
export type ProfileValues = z.infer<typeof profileSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: password,
    confirmPassword: z.string(),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

/** Only same-site relative paths are allowed as post-login redirects. */
export function safeRedirect(target: string | null | undefined, fallback: string): string {
  if (!target || !target.startsWith('/') || target.startsWith('//') || target.startsWith('/\\'))
    return fallback;
  return target;
}
