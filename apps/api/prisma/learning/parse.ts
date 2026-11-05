/**
 * Turns pages of the "Learning" study site (github.com/shahinbashar/learning-exam-prep, docs/content)
 * into Tech Buddy subjects, topics and MCQs. Pure functions only — the database work is in
 * import.ts — so every rule here is unit-tested.
 *
 * Learning's Markdown conventions (see project/exam-prep-hub.md in that repo):
 * - one page per subject, `#` = page title;
 * - topics are `##` sections, or `#` chapters on pages with several `#` headings;
 * - links between pages are `[text](#page)` or `[text](#page.heading-slug)`;
 * - ```mindmap blocks and `#### Solution` folds (rendered by Tech Buddy's Markdown component).
 */

export interface Heading {
  line: number;
  level: number;
  /** Heading text with inline Markdown removed, as the Learning renderer sees it. */
  text: string;
  /** The Learning renderer's id for this heading (unique per page). */
  anchor: string;
}

export interface Section {
  heading: Heading;
  /** Markdown under the heading, up to the next heading at the split level or above. */
  body: string;
}

export interface ParsedPage {
  title: string;
  /** Text between the page title and the first topic, with skipped sections removed. */
  intro: string;
  sections: Section[];
  headings: Heading[];
  /** Where topics start: '#' chapters or '##' sections. */
  splitLevel: 1 | 2;
}

export interface Mcq {
  text: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  explanation: string;
}

const FENCE = /^\s*(```|~~~)/;
const HEADING = /^(#{1,6})\s+(.+?)\s*#*\s*$/;

/** Exactly the Learning renderer's slug (docs/index.html), so existing links keep resolving. */
export function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[^\w\s-]/g, '')
      .replace(/_/g, ' ')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 60) || 'section'
  );
}

/** What a heading's textContent would be once rendered: no emphasis, code ticks or link syntax. */
export function plainText(markdown: string): string {
  return markdown
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/`([^`]*)`/g, '$1')
    .trim();
}

/** All headings outside fenced code (so `#include` lines in C examples are not headings). */
export function headingsOf(markdown: string): Heading[] {
  const seen = new Map<string, number>();
  const headings: Heading[] = [];
  let inFence = false;
  markdown.split('\n').forEach((raw, line) => {
    if (FENCE.test(raw)) {
      inFence = !inFence;
      return;
    }
    const match = !inFence && raw.match(HEADING);
    if (!match) return;
    const level = match[1].length;
    const text = plainText(match[2]);
    let anchor = slugify(text);
    // The renderer numbers repeats across h1–h4 in page order: "mindmap", "mindmap-2", …
    if (level <= 4) {
      const count = seen.get(anchor);
      if (count) {
        seen.set(anchor, count + 1);
        anchor = `${anchor}-${count + 1}`;
      } else seen.set(anchor, 1);
    }
    headings.push({ line, level, text, anchor });
  });
  return headings;
}

/**
 * Splits a page into topic sections. Pages with several `#` headings are chapter pages (each
 * later `#` is a topic); otherwise each `##` is a topic. Sections whose title matches `skip`
 * are dropped wherever they appear (including inside the intro).
 */
export function parsePage(markdown: string, skip: RegExp[] = []): ParsedPage {
  const lines = markdown.split('\n');
  const headings = headingsOf(markdown);
  const h1s = headings.filter((h) => h.level === 1);
  const title = h1s[0]?.text ?? 'Untitled';
  const splitLevel: 1 | 2 = h1s.length > 1 ? 1 : 2;
  const isSkipped = (h: Heading) => skip.some((re) => re.test(h.text));

  const starts = headings.filter((h) =>
    splitLevel === 1 ? h.level === 1 && h !== h1s[0] : h.level === 2,
  );
  const endOf = (h: Heading) =>
    headings.find((n) => n.line > h.line && n.level <= h.level)?.line ?? lines.length;
  const bodyOf = (h: Heading) =>
    dropSkipped(lines.slice(h.line + 1, endOf(h)), h.line + 1, headings, isSkipped);

  const introStart = (h1s[0]?.line ?? -1) + 1;
  const introEnd = starts[0]?.line ?? lines.length;
  const intro = dropSkipped(lines.slice(introStart, introEnd), introStart, headings, isSkipped);

  const sections = starts
    .filter((h) => !isSkipped(h))
    .map((heading) => ({ heading, body: bodyOf(heading) }));
  return { title, intro, sections, headings, splitLevel };
}

/** Removes skipped sub-sections (a heading and everything under it) from a run of lines. */
function dropSkipped(
  lines: string[],
  offset: number,
  headings: Heading[],
  isSkipped: (h: Heading) => boolean,
): string {
  const removed = new Set<number>();
  for (const h of headings) {
    if (h.line < offset || h.line >= offset + lines.length || !isSkipped(h)) continue;
    const end = headings.find((n) => n.line > h.line && n.level <= h.level)?.line ?? Infinity;
    for (let i = h.line; i < Math.min(end, offset + lines.length); i++) removed.add(i);
  }
  return lines
    .filter((_, i) => !removed.has(offset + i))
    .join('\n')
    .trim();
}

/** A clean topic title: no study-day stamps, numbering or "Part N:" prefixes. */
export function cleanTitle(text: string, renames: Record<string, string> = {}): string {
  for (const [pattern, replacement] of Object.entries(renames)) {
    if (new RegExp(pattern).test(text)) return replacement;
  }
  return (
    text
      .replace(/\s*\((\d{1,2} [A-Z][a-z]{2})\)\s*$/, '') // "(7 Oct)"
      .replace(/^Part \d+\s*[:·]\s*/, '')
      .replace(/^(Topic\s+)?\d+\s*[.·]\s*/, '')
      .trim() || text
  );
}

/**
 * A topic's one-line description: the first sentence of its intro, i.e. prose before the first
 * heading. Topics that open straight into cards get none (a sentence lifted from a card reads
 * out of context), and provenance lines ("Source: …") are not descriptions.
 */
export function summarize(markdown: string, max = 180): string | null {
  for (const raw of markdown.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    if (/^#/.test(line) || FENCE.test(line)) return null; // reached the first card/heading
    if (/^(\||>|-|\*|\d+\.|<)/.test(line) || /^(\*\*)?Source:/i.test(line)) continue;
    // List lead-ins ("Topics:") and study-schedule stamps ("Week 1, day 2.") aren't summaries.
    if (/:\s*$/.test(line) || /^Week \d+, day \d+/i.test(line)) continue;
    const text = plainText(line);
    // End at . ! ? or । followed by a space and a capital/Bangla letter, so "pp. 802" survives.
    const sentence = text.match(/^.+?[.!?।](?=\s+[A-Z\u0980-\u09FF]|$)/)?.[0] ?? text;
    return sentence.length > max ? `${sentence.slice(0, max - 1).trimEnd()}…` : sentence;
  }
  return null;
}

export type LinkResolver = (page: string, anchor: string | null) => string | null;

/**
 * Rewrites Learning's in-site links (`#page` / `#page.anchor`) to Tech Buddy URLs. Links the
 * resolver can't place (pages that weren't imported) become plain text. Other links stay.
 */
export function rewriteLinks(markdown: string, resolve: LinkResolver): string {
  return mapOutsideCode(markdown, (text) =>
    text.replace(/\[([^\]]+)\]\(#([a-z0-9-]+)(?:\.([a-z0-9-]+))?\)/g, (_m, label, page, anchor) => {
      const url = resolve(page as string, (anchor as string | undefined) ?? null);
      return url ? `[${label}](${url})` : (label as string);
    }),
  );
}

/** Applies `fn` to the text outside fenced code blocks only. */
function mapOutsideCode(markdown: string, fn: (text: string) => string): string {
  const out: string[] = [];
  let buffer: string[] = [];
  let inFence = false;
  const flush = () => {
    if (buffer.length) out.push(inFence ? buffer.join('\n') : fn(buffer.join('\n')));
    buffer = [];
  };
  for (const line of markdown.split('\n')) {
    if (FENCE.test(line)) {
      if (!inFence) flush();
      buffer.push(line);
      if (inFence) flush();
      inFence = !inFence;
      continue;
    }
    buffer.push(line);
  }
  flush();
  return out.join('\n');
}

/** Removes notes that only made sense in the author's private study log. */
export function sanitize(markdown: string): string {
  return mapOutsideCode(markdown, (text) =>
    text
      .replace(/\s*\(Your diagnostic miss[^)]*\)/g, '')
      .replace(/\s*\(diagnostic miss\)/g, '')
      .replace(/see the diagnostic note above/g, 'see Common mistakes'),
  );
}

const QUESTION = /^(\d+)\.\s+(.*\(a\).*\(b\).*\(c\).*\(d\).*)$/;
const ANSWER = /^(\d+)\.\s+\*\*\(?([a-d])\)?\*\*\s*(.*)$/;

/**
 * Extracts MCQs from "Practice set" blocks: numbered questions with inline (a)–(d) options,
 * followed by a `#### Solution` list of `N. **(x)** explanation`. Questions without exactly
 * four options or without an answer are skipped rather than guessed.
 */
export function extractMcqs(markdown: string): Mcq[] {
  const mcqs: Mcq[] = [];
  const lines = markdown.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (!/^#{3,4}\s+.*Practice set/i.test(lines[i])) continue;

    const questions = new Map<number, { stem: string; options: string[] }>();
    const answers = new Map<number, { letter: string; explanation: string }>();
    let instruction = '';
    let inSolution = false;
    for (let j = i + 1; j < lines.length; j++) {
      const line = lines[j].trim();
      if (/^#{1,3}\s/.test(line)) break; // next card or topic
      if (/^####\s+Solution/i.test(line)) {
        inSolution = true;
        continue;
      }
      const q = !inSolution && line.match(QUESTION);
      const a = inSolution && line.match(ANSWER);
      if (q) {
        const parts = q[2].split(/\s*\(([a-d])\)\s*/);
        questions.set(Number(q[1]), {
          stem: parts[0].trim(),
          options: [parts[2], parts[4], parts[6], parts[8]].map((o) => (o ?? '').trim()),
        });
      } else if (a) {
        answers.set(Number(a[1]), { letter: a[2], explanation: a[3].trim() });
      } else if (!inSolution && line && !questions.size) {
        instruction = line;
      }
    }

    for (const [n, q] of questions) {
      const answer = answers.get(n);
      if (!answer || q.options.some((o) => !o) || q.options.length !== 4) continue;
      const stem = quoteBold(q.stem);
      mcqs.push({
        text: instruction
          ? `${quoteBold(instruction).replace(/in bold/i, 'in quotes')} ${stem}`
          : stem,
        options: q.options.map(quoteBold) as Mcq['options'],
        correct: 'abcd'.indexOf(answer.letter) as Mcq['correct'],
        explanation: quoteBold(answer.explanation) || `Answer: (${answer.letter}).`,
      });
    }
  }
  return mcqs;
}

/** Exam questions are shown as plain text, so **emphasis** becomes “quotes”. */
function quoteBold(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '“$1”');
}
