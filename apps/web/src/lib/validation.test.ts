import { describe, expect, it } from 'vitest';
import { registerSchema, safeRedirect } from './validation';

describe('safeRedirect', () => {
  it('allows relative paths', () => {
    expect(safeRedirect('/exams?x=1', '/dashboard')).toBe('/exams?x=1');
  });

  it('rejects absolute and protocol-relative URLs', () => {
    expect(safeRedirect('https://evil.example', '/dashboard')).toBe('/dashboard');
    expect(safeRedirect('//evil.example', '/dashboard')).toBe('/dashboard');
    expect(safeRedirect('/\\evil.example', '/dashboard')).toBe('/dashboard');
    expect(safeRedirect(null, '/dashboard')).toBe('/dashboard');
  });
});

describe('registerSchema', () => {
  const valid = {
    fullName: 'Rahim',
    email: 'r@example.com',
    phone: '',
    password: 'Secret123',
    confirmPassword: 'Secret123',
  };

  it('accepts valid input with an optional phone', () => {
    expect(registerSchema.safeParse(valid).success).toBe(true);
    expect(registerSchema.safeParse({ ...valid, phone: '01712345678' }).success).toBe(true);
  });

  it('rejects weak passwords, mismatches and invalid phones', () => {
    expect(
      registerSchema.safeParse({ ...valid, password: 'password', confirmPassword: 'password' })
        .success,
    ).toBe(false);
    expect(registerSchema.safeParse({ ...valid, confirmPassword: 'Other123' }).success).toBe(false);
    expect(registerSchema.safeParse({ ...valid, phone: '12345' }).success).toBe(false);
  });
});
