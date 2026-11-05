import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  cleanTitle,
  extractMcqs,
  headingsOf,
  parsePage,
  rewriteLinks,
  sanitize,
  slugify,
  summarize,
} from './parse';
import { buildPlan } from './plan';

describe('slugify (same as the Learning renderer)', () => {
  it.each([
    ['Part 5: Polymorphism', 'part-5-polymorphism'],
    ['OSI and TCP/IP models', 'osi-and-tcpip-models'],
    ['Bangla 1 · সন্ধি', 'bangla-1'],
    ['সন্ধি', 'section'],
  ])('%s → %s', (text, slug) => expect(slugify(text)).toBe(slug));
});

describe('headingsOf', () => {
  it('ignores # lines inside code and numbers repeated anchors', () => {
    const md = ['# Page', '### Mindmap', '```c', '#include <stdio.h>', '```', '### Mindmap'].join(
      '\n',
    );
    expect(headingsOf(md).map((h) => h.anchor)).toEqual(['page', 'mindmap', 'mindmap-2']);
  });
});

describe('parsePage', () => {
  it('splits a single-title page at ## and drops skipped sections', () => {
    const md = [
      '# OS',
      'Intro text.',
      '## Scheduling',
      'FCFS…',
      '### Mindmap',
      'x',
      '## Score log',
      '| me |',
    ].join('\n');
    const page = parsePage(md, [/^Score log$/]);
    expect(page.splitLevel).toBe(2);
    expect(page.intro).toBe('Intro text.');
    expect(page.sections.map((s) => s.heading.text)).toEqual(['Scheduling']);
    expect(page.sections[0].body).toContain('### Mindmap');
  });

  it('treats a page with several # headings as chapters, keeping ## inside them', () => {
    const md = [
      '# Telecom',
      '## How to use',
      'Read top down.',
      '## Score log',
      'mine',
      '# 1 · Basics',
      '## Signals',
      'dB',
    ].join('\n');
    const page = parsePage(md, [/^Score log$/]);
    expect(page.splitLevel).toBe(1);
    expect(page.intro).toContain('Read top down.');
    expect(page.intro).not.toContain('mine');
    expect(page.sections).toHaveLength(1);
    expect(page.sections[0].body).toContain('## Signals');
  });
});

describe('cleanTitle', () => {
  it.each([
    ['Loops and must-write programs (7 Oct)', 'Loops and must-write programs'],
    ['Part 5: Polymorphism', 'Polymorphism'],
    ['1 · Telecom basics', 'Telecom basics'],
    ['Topic 1 · Percentage', 'Percentage'],
    ['3. Subnetting', 'Subnetting'],
    ['P4 — Bangladesh Bank', 'P4 — Bangladesh Bank'],
  ])('%s → %s', (text, title) => expect(cleanTitle(text)).toBe(title));

  it('applies renames first', () => {
    expect(
      cleanTitle('Diagnostic misses (2 Oct)', { '^Diagnostic misses': 'Common mistakes' }),
    ).toBe('Common mistakes');
  });
});

describe('rewriteLinks', () => {
  const resolve = (page: string, anchor: string | null) =>
    page === 'oop' ? `/subjects/oop/${anchor ?? ''}`.replace(/\/$/, '') : null;

  it('maps in-site links, unlinks pages that were not imported, leaves code alone', () => {
    const md = [
      'See [Part 5](#oop.part-5) and [today](#today).',
      '```',
      '[keep](#oop)',
      '```',
      '[web](https://example.com)',
    ].join('\n');
    expect(rewriteLinks(md, resolve)).toBe(
      [
        'See [Part 5](/subjects/oop/part-5) and today.',
        '```',
        '[keep](#oop)',
        '```',
        '[web](https://example.com)',
      ].join('\n'),
    );
  });
});

describe('sanitize', () => {
  it('drops personal study-log asides', () => {
    expect(sanitize('→ **encapsulation**. (Your diagnostic miss on 2 Oct.)')).toBe(
      '→ **encapsulation**.',
    );
  });
});

describe('summarize', () => {
  it('takes the first sentence of the intro', () => {
    expect(summarize('A hub copies to all ports. A switch learns.\n### Picture it')).toBe(
      'A hub copies to all ports.',
    );
  });

  it('gives none when the topic opens with a card, and skips source lines', () => {
    expect(summarize('### Picture it\nThink of two trains.')).toBeNull();
    expect(summarize('Source: a book (2026).\n## Questions')).toBeNull();
    expect(summarize('Topics:\n- Sets\n- Logic')).toBeNull();
    expect(summarize('Week 1, day 1.\n### Picture it')).toBeNull();
  });

  it('does not stop at abbreviations', () => {
    expect(summarize('Questions from pp. 802–871 of the book. More text.')).toBe(
      'Questions from pp. 802–871 of the book.',
    );
  });
});

describe('extractMcqs', () => {
  const md = [
    '### Part 4 · Practice set (10 MCQ, 6 min)',
    'Name the part of speech of the word in bold.',
    '1. He ran **fast** home. (a) adjective (b) adverb (c) verb (d) noun',
    '2. Broken. (a) one (b) two',
    '3. No answer here. (a) w (b) x (c) y (d) z',
    '',
    '#### Solution',
    '1. **(b)** describes the verb "ran".',
    '2. **(a)** n/a',
    '',
    '### Recall check',
  ].join('\n');

  it('reads inline options and the answer key; skips incomplete questions', () => {
    expect(extractMcqs(md)).toEqual([
      {
        text: 'Name the part of speech of the word in quotes. He ran “fast” home.',
        options: ['adjective', 'adverb', 'verb', 'noun'],
        correct: 1,
        explanation: 'describes the verb "ran".',
      },
    ]);
  });
});

describe('buildPlan on the real Learning pages', () => {
  const dir = join(__dirname, 'content');
  const pages = Object.fromEntries(
    readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => [f.replace(/\.md$/, ''), readFileSync(join(dir, f), 'utf8')]),
  );
  const plan = buildPlan(pages);
  const topics = plan.flatMap((s) => s.topics.map((t) => ({ ...t, subject: s.slug })));

  it('creates every subject with topics and unique slugs', () => {
    expect(plan).toHaveLength(15);
    for (const subject of plan) {
      expect(subject.topics.length).toBeGreaterThan(0);
      const slugs = subject.topics.map((t) => t.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  it('turns the language practice sets into 20 MCQs with explanations', () => {
    const mcqs = topics.flatMap((t) => t.mcqs);
    expect(mcqs).toHaveLength(20);
    expect(mcqs.every((m) => m.options.length === 4 && m.explanation)).toBe(true);
  });

  it('rewrites links between pages to topic URLs', () => {
    const oop = topics.find(
      (t) => t.subject === 'object-oriented-programming' && t.slug === 'past-questions-on-oop',
    );
    expect(oop?.content).toContain('](/subjects/object-oriented-programming/polymorphism)');
    // No in-site "#page" links remain anywhere outside code.
    for (const t of topics) expect(t.content).not.toMatch(/\]\(#[a-z]/);
  });

  it('leaves out personal logs and schedules', () => {
    for (const t of topics) {
      expect(t.title).not.toMatch(/score log|diagnostic misses|paper accuracy log/i);
      expect(t.content).not.toMatch(/Your diagnostic miss|^## Score log/m);
    }
  });

  it('nests the bank question papers under one past-papers topic', () => {
    const papers = plan.find((s) => s.slug === 'written-past-papers')!;
    const children = papers.topics.filter((t) => t.parentSlug === 'bank-it-question-bank');
    expect(children.length).toBeGreaterThanOrEqual(19);
  });
});
