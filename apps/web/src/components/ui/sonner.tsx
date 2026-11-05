'use client';

import { Toaster as Sonner, type ToasterProps } from 'sonner';

function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="light"
      richColors
      closeButton
      position="top-right"
      // Sonner's built-in rich colours fall below WCAG AA (e.g. warning 3:1), so every type uses
      // the app's tokens: a light tint of the status colour with its AA-checked text colour.
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--success-bg': 'color-mix(in oklch, var(--success) 8%, white)',
          '--success-border': 'color-mix(in oklch, var(--success) 30%, white)',
          '--success-text': 'var(--success-strong)',
          '--error-bg': 'color-mix(in oklch, var(--destructive) 6%, white)',
          '--error-border': 'color-mix(in oklch, var(--destructive) 30%, white)',
          '--error-text': 'var(--destructive-strong)',
          '--warning-bg': 'color-mix(in oklch, var(--warning) 15%, white)',
          '--warning-border': 'color-mix(in oklch, var(--warning) 50%, white)',
          '--warning-text': 'var(--warning-foreground)',
          '--info-bg': 'color-mix(in oklch, var(--primary) 6%, white)',
          '--info-border': 'color-mix(in oklch, var(--primary) 25%, white)',
          '--info-text': 'var(--primary)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

export { Toaster };
