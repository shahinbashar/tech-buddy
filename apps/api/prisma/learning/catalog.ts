import { type SubjectCategory } from '@prisma/client';

/**
 * Which Learning pages become which Tech Buddy subjects. Pages not listed here are not
 * imported: today, log, study-plan, bydate and home hold the author's personal schedule and
 * scores; arch, general and math are topic lists without notes yet.
 */

export interface PageConfig {
  /** Learning page id = file name without .md; also the id used in its in-site links. */
  page: string;
  /** Subject this page belongs to (several pages can share one, see past papers). */
  subject: string;
  /**
   * 'subject': the page's sections become the subject's topics.
   * 'topic': the whole page becomes one topic of a shared subject (its sections become
   * subtopics when `subtopics` is set).
   */
  as: 'subject' | 'topic';
  /** For `as: 'topic'`: the topic's slug (page titles carry dates and dashes). */
  topicSlug?: string;
  subtopics?: boolean;
}

export interface SubjectConfig {
  slug: string;
  name: string;
  category: SubjectCategory;
  description: string;
}

const order = (n: number) => 100 + n; // after any hand-made subjects

export const SUBJECTS: (SubjectConfig & { order: number })[] = [
  {
    slug: 'telecom-cellular-networks',
    name: 'Telecom & Cellular Networks',
    category: 'TECHNICAL',
    description:
      'Signals and radio basics through 2G–5G cores, IMS, NFV, O-RAN, slicing, telecom power and the Bangladesh telecom industry.',
  },
  {
    slug: 'programming-in-c',
    name: 'Programming in C',
    category: 'TECHNICAL',
    description:
      'Loops, recursion, arrays, strings and pointers, with the programs exams ask you to write on paper.',
  },
  {
    slug: 'object-oriented-programming',
    name: 'Object-Oriented Programming',
    category: 'TECHNICAL',
    description:
      'The four pillars, inheritance, polymorphism, abstract class vs interface, UML, output traps and model written answers.',
  },
  {
    slug: 'networking-data-communication',
    name: 'Networking & Data Communication',
    category: 'TECHNICAL',
    description:
      'OSI and TCP/IP, network devices, topologies and media, addressing, NAT and the protocol facts exams test.',
  },
  {
    slug: 'operating-systems',
    name: 'Operating Systems',
    category: 'TECHNICAL',
    description:
      'Processes, scheduling, memory and deadlocks — and the mistakes candidates make most.',
  },
  {
    slug: 'data-structures-algorithms',
    name: 'Data Structures & Algorithms',
    category: 'TECHNICAL',
    description: 'Core structures, searching, sorting and complexity for written and MCQ papers.',
  },
  {
    slug: 'dbms-sql',
    name: 'DBMS & SQL',
    category: 'TECHNICAL',
    description: 'ER and relational models, normalization, SQL, transactions and indexing.',
  },
  {
    slug: 'software-engineering',
    name: 'Software Engineering',
    category: 'TECHNICAL',
    description: 'SDLC models, requirements, UML, design principles, testing and estimation.',
  },
  {
    slug: 'coding-practice',
    name: 'Coding Practice',
    category: 'TECHNICAL',
    description:
      'Exam-style programs to write on paper first, each with a mindmap and a hidden solution.',
  },
  {
    slug: 'pyq-priority-topics',
    name: 'PYQ Priority Topics',
    category: 'TECHNICAL',
    description:
      'The 13 most-asked topics in past IT written papers, each with a full 10-mark answer.',
  },
  {
    slug: 'written-past-papers',
    name: 'Written Past Papers',
    category: 'TECHNICAL',
    description:
      'Real written papers from Bangladesh Bank, state-owned banks, ICB, BUET-set and BPDB exams, with answer keys.',
  },
  {
    slug: 'math-practice',
    name: 'Math Practice',
    category: 'GENERAL',
    description: 'Written-exam math, worked step by step with practice sets.',
  },
  {
    slug: 'bangla-english-mcq',
    name: 'Bangla & English MCQ',
    category: 'GENERAL',
    description:
      'Bangla grammar and English usage for the language MCQ section, with practice sets.',
  },
  {
    slug: 'focus-writing',
    name: 'Focus Writing (বাংলা ও English)',
    category: 'GENERAL',
    description:
      'Method, phrase banks, fact bank, news notes and model answers for Bangla and English focus writing.',
  },
  {
    slug: 'revision-cards',
    name: 'Revision Cards',
    category: 'GENERAL',
    description: 'One recall card per topic: read, self-test and score yourself before moving on.',
  },
].map((s, i) => ({ ...s, category: s.category as SubjectCategory, order: order(i) }));

export const PAGES: PageConfig[] = [
  { page: 'telecom', subject: 'telecom-cellular-networks', as: 'subject' },
  { page: 'c', subject: 'programming-in-c', as: 'subject' },
  { page: 'oop', subject: 'object-oriented-programming', as: 'subject' },
  { page: 'networking', subject: 'networking-data-communication', as: 'subject' },
  { page: 'os', subject: 'operating-systems', as: 'subject' },
  { page: 'dsa', subject: 'data-structures-algorithms', as: 'subject' },
  { page: 'dbms', subject: 'dbms-sql', as: 'subject' },
  { page: 'se', subject: 'software-engineering', as: 'subject' },
  { page: 'coding', subject: 'coding-practice', as: 'subject' },
  { page: 'pyq', subject: 'pyq-priority-topics', as: 'subject' },
  { page: 'bmath', subject: 'math-practice', as: 'subject' },
  { page: 'langmcq', subject: 'bangla-english-mcq', as: 'subject' },
  { page: 'focus', subject: 'focus-writing', as: 'subject' },
  { page: 'revision', subject: 'revision-cards', as: 'subject' },
  {
    page: 'qbank',
    subject: 'written-past-papers',
    as: 'topic',
    topicSlug: 'bank-it-question-bank',
    subtopics: true,
  },
  { page: 'icb', subject: 'written-past-papers', as: 'topic', topicSlug: 'icb-securities-ap-2026' },
  {
    page: 'buet',
    subject: 'written-past-papers',
    as: 'topic',
    topicSlug: 'buet-dmtcl-section-engineer-2026',
  },
  {
    page: 'bpdb',
    subject: 'written-past-papers',
    as: 'topic',
    topicSlug: 'bpdb-assistant-engineer-cse-2026',
  },
];

/**
 * Sections dropped everywhere: the author's score logs and schedules, instructions for the AI
 * chat workflow, and index tables the topic list already replaces.
 */
export const SKIP_SECTIONS: RegExp[] = [
  /^Score log$/i,
  /^Topic plan$/i,
  /^How each topic works$/i,
  /^Paper accuracy log$/i,
  /^Schedule$/i,
  /^What this means for you$/i,
  /^Card index$/i,
  /^Index$/i,
];

/** Topic title replacements (pattern → title). */
export const TITLE_RENAMES: Record<string, string> = {
  '^Diagnostic misses': 'Common mistakes',
};
