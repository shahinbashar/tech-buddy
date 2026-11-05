import { PAGES, SKIP_SECTIONS, SUBJECTS, TITLE_RENAMES, type SubjectConfig } from './catalog';
import {
  type Mcq,
  type ParsedPage,
  cleanTitle,
  extractMcqs,
  parsePage,
  rewriteLinks,
  sanitize,
  slugify,
  summarize,
} from './parse';

/** What the importer will write, computed from the page files alone (no database). */
export interface PlannedTopic {
  slug: string;
  title: string;
  description: string | null;
  content: string;
  order: number;
  parentSlug: string | null;
  mcqs: Mcq[];
}

export interface PlannedSubject extends SubjectConfig {
  order: number;
  topics: PlannedTopic[];
}

const OVERVIEW_MIN_CHARS = 80;

/**
 * Builds the full import plan from page contents (page id → Markdown). Two passes: the first
 * places every heading anchor on a topic, so the second can rewrite links between pages.
 */
export function buildPlan(pages: Record<string, string>): PlannedSubject[] {
  type Raw = Omit<PlannedTopic, 'content' | 'description' | 'mcqs'> & { body: string };
  const raw = new Map<string, Raw[]>(); // subject slug → topics
  const anchorTarget = new Map<string, string>(); // "page.anchor" → URL
  const pageTarget = new Map<string, string>(); // "page" → URL

  for (const config of PAGES) {
    const markdown = pages[config.page];
    if (markdown === undefined) throw new Error(`Missing Learning page: ${config.page}.md`);
    const parsed = parsePage(markdown, SKIP_SECTIONS);
    const topics = raw.get(config.subject) ?? [];
    const url = (topic?: string) =>
      topic ? `/subjects/${config.subject}/${topic}` : `/subjects/${config.subject}`;
    const used = new Set(topics.map((t) => t.slug));
    const unique = (slug: string) => {
      let s = slug;
      for (let n = 2; used.has(s); n++) s = `${slug}-${n}`;
      used.add(s);
      return s;
    };

    let parentSlug: string | null = null;
    if (config.as === 'topic') {
      // The whole page is one topic; its sections become subtopics when asked.
      const parent = unique(config.topicSlug ?? slugify(parsed.title));
      parentSlug = parent;
      topics.push({
        slug: parent,
        title: parsed.title,
        order: topics.length,
        parentSlug: null,
        body: config.subtopics ? parsed.intro : wholePage(parsed),
      });
      pageTarget.set(config.page, url(parent));
      parsed.headings.forEach((h) => anchorTarget.set(`${config.page}.${h.anchor}`, url(parent)));
      if (!config.subtopics) {
        raw.set(config.subject, topics);
        continue;
      }
    } else {
      pageTarget.set(config.page, url());
      if (plainLength(parsed.intro) >= OVERVIEW_MIN_CHARS) {
        const slug = unique('overview');
        topics.push({ slug, title: 'Overview', order: 0, parentSlug: null, body: parsed.intro });
      }
    }

    parsed.sections.forEach((section, i) => {
      const title = cleanTitle(section.heading.text, TITLE_RENAMES);
      // Clean URLs from the clean title; old in-site anchors still map here (below).
      const fromTitle = slugify(title);
      const slug = unique(fromTitle === 'section' ? section.heading.anchor : fromTitle);
      topics.push({
        slug,
        title,
        order: i + 1,
        parentSlug,
        body: section.body,
      });
      // Every heading inside this section links to the section's topic page.
      const end = parsed.sections[i + 1]?.heading.line ?? Infinity;
      parsed.headings
        .filter((h) => h.line >= section.heading.line && h.line < end)
        .forEach((h) => anchorTarget.set(`${config.page}.${h.anchor}`, url(slug)));
    });
    raw.set(config.subject, topics);
  }

  const resolve = (page: string, anchor: string | null) =>
    (anchor && anchorTarget.get(`${page}.${anchor}`)) || pageTarget.get(page) || null;

  return SUBJECTS.filter((s) => raw.has(s.slug)).map((subject) => ({
    ...subject,
    topics: raw.get(subject.slug)!.map(({ body, ...topic }) => {
      const content = rewriteLinks(sanitize(body), resolve);
      return {
        ...topic,
        content,
        description: summarize(content),
        mcqs: extractMcqs(body),
      };
    }),
  }));
}

function plainLength(markdown: string): number {
  return markdown.replace(/[#|*`>\-\s]/g, '').length;
}

/** A single-topic page: its intro and kept sections, back in one document. */
function wholePage(parsed: ParsedPage): string {
  const parts = [parsed.intro];
  for (const section of parsed.sections) parts.push(`## ${section.heading.text}`, section.body);
  return parts.join('\n\n').trim();
}
