import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Guards the design tokens in globals.css against WCAG AA text contrast (4.5:1). Almost every
 * contrast bug found by the axe scan came from a token pairing (status text on its own tint,
 * white on a light fill), so the pairings the components use are checked here, in CI.
 */

const css = readFileSync(resolve(__dirname, '../app/globals.css'), 'utf8');
const root = css.slice(css.indexOf(':root {'), css.indexOf('}', css.indexOf(':root {')));

type Rgb = [number, number, number]; // linear sRGB, 0–1

function token(name: string): Rgb {
  const match = root.match(new RegExp(`--${name}:\\s*oklch\\(([^)]+)\\)`));
  if (!match) throw new Error(`Token --${name} not found or not oklch()`);
  const [l, c, h] = match[1].trim().split(/\s+/).map(Number);
  return oklchToLinearSrgb(l, c, h);
}

function oklchToLinearSrgb(L: number, C: number, H: number): Rgb {
  const a = C * Math.cos((H * Math.PI) / 180);
  const b = C * Math.sin((H * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const clamp = (x: number) => Math.min(1, Math.max(0, x));
  return [
    clamp(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    clamp(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    clamp(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
}

const toGamma = (x: number) => (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055);
const toLinear = (x: number) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);

/** `bg-x/NN` over a surface, blended the way browsers do (in gamma-encoded sRGB). */
function tint(color: Rgb, alpha: number, over: Rgb): Rgb {
  return color.map((c, i) => toLinear(alpha * toGamma(c) + (1 - alpha) * toGamma(over[i]))) as Rgb;
}

const luminance = ([r, g, b]: Rgb) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
function contrast(a: Rgb, b: Rgb): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const AA = 4.5;
const white: Rgb = [1, 1, 1];

describe('design token contrast (WCAG AA, 4.5:1)', () => {
  const background = token('background');
  const card = token('card');
  const muted = token('muted');

  // [description, text colour, background colour] — each mirrors a real component pairing.
  const pairs: [string, Rgb, Rgb][] = [
    ['body text on page', token('foreground'), background],
    ['muted text on page', token('muted-foreground'), background],
    ['muted text on card', token('muted-foreground'), card],
    ['muted text on muted surface', token('muted-foreground'), muted],
    ['primary button', token('primary-foreground'), token('primary')],
    ['links / primary text on page', token('primary'), background],
    ['secondary badge', token('secondary-foreground'), token('secondary')],
    ['accent text on accent', token('accent-foreground'), token('accent')],
    ['success button', token('success-foreground'), token('success')],
    ['success text on page', token('success'), background],
    [
      'success badge (bg-success/15 on card)',
      token('success-strong'),
      tint(token('success'), 0.15, card),
    ],
    [
      'success badge on muted surface',
      token('success-strong'),
      tint(token('success'), 0.15, muted),
    ],
    ['destructive button', white, token('destructive')],
    ['error text on page', token('destructive'), background],
    [
      'destructive badge (bg-destructive/10 on card)',
      token('destructive-strong'),
      tint(token('destructive'), 0.1, card),
    ],
    [
      'destructive alert on muted surface',
      token('destructive-strong'),
      tint(token('destructive'), 0.1, muted),
    ],
    [
      'warning badge (bg-warning/20 on card)',
      token('warning-foreground'),
      tint(token('warning'), 0.2, card),
    ],
  ];

  it.each(pairs)('%s', (_name, text, surface) => {
    expect(contrast(text, surface)).toBeGreaterThanOrEqual(AA);
  });
});
