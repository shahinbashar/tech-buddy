import { type AccessLevel, type Difficulty } from '@prisma/client';
import { parse } from 'csv-parse/sync';

export const CSV_HEADERS = [
  'subject',
  'topic',
  'difficulty',
  'question',
  'question_bn',
  'option_a',
  'option_b',
  'option_c',
  'option_d',
  'correct',
  'explanation',
  'reference',
  'access',
  'published',
] as const;

export const REQUIRED_CSV_HEADERS = [
  'subject',
  'question',
  'option_a',
  'option_b',
  'option_c',
  'option_d',
  'correct',
  'explanation',
];

export const MAX_CSV_ROWS = 1000;

export interface CsvLookups {
  /** key: lower-cased subject slug or name → subject id */
  subjects: Map<string, string>;
  /** key: `${subjectId}:${lower-cased topic slug or title}` → topic id */
  topics: Map<string, string>;
}

export interface ParsedQuestionRow {
  subjectId: string;
  topicId: string | null;
  difficulty: Difficulty;
  text: string;
  textBn: string | null;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  reference: string | null;
  accessLevel: AccessLevel;
  isPublished: boolean;
}

export interface CsvRowError {
  row: number;
  message: string;
}

const DIFFICULTIES: Difficulty[] = ['EASY', 'MEDIUM', 'HARD'];
const LETTERS = ['A', 'B', 'C', 'D'];

/** Parses and validates a question CSV. Row numbers in errors are 1-based spreadsheet rows (header = 1). */
export function parseQuestionCsv(
  content: string,
  lookups: CsvLookups,
): { rows: ParsedQuestionRow[]; errors: CsvRowError[] } {
  let records: Record<string, string>[];
  try {
    records = parse(content, {
      columns: (header: string[]) => header.map((h) => h.trim().toLowerCase()),
      skip_empty_lines: true,
      trim: true,
      bom: true,
    });
  } catch (error) {
    return { rows: [], errors: [{ row: 0, message: `Invalid CSV: ${(error as Error).message}` }] };
  }

  if (records.length === 0)
    return { rows: [], errors: [{ row: 0, message: 'The file contains no data rows' }] };
  const missing = REQUIRED_CSV_HEADERS.filter((h) => !(h in records[0]));
  if (missing.length)
    return { rows: [], errors: [{ row: 1, message: `Missing columns: ${missing.join(', ')}` }] };
  if (records.length > MAX_CSV_ROWS) {
    return {
      rows: [],
      errors: [{ row: 0, message: `At most ${MAX_CSV_ROWS} rows can be imported at once` }],
    };
  }

  const rows: ParsedQuestionRow[] = [];
  const errors: CsvRowError[] = [];

  records.forEach((record, index) => {
    const row = index + 2;
    const problems: string[] = [];
    const get = (key: string) => (record[key] ?? '').trim();

    const subjectId = lookups.subjects.get(get('subject').toLowerCase());
    if (!subjectId) problems.push(`unknown subject "${get('subject')}"`);

    let topicId: string | null = null;
    if (get('topic') && subjectId) {
      topicId = lookups.topics.get(`${subjectId}:${get('topic').toLowerCase()}`) ?? null;
      if (!topicId) problems.push(`unknown topic "${get('topic')}" for this subject`);
    }

    const difficulty = (get('difficulty') || 'MEDIUM').toUpperCase() as Difficulty;
    if (!DIFFICULTIES.includes(difficulty))
      problems.push('difficulty must be EASY, MEDIUM or HARD');

    const options = ['option_a', 'option_b', 'option_c', 'option_d'].map(get);
    if (options.some((o) => !o)) problems.push('all four options are required');
    if (new Set(options.map((o) => o.toLowerCase())).size !== options.length)
      problems.push('options must be distinct');

    const correctOptionIndex = LETTERS.indexOf(get('correct').toUpperCase());
    if (correctOptionIndex < 0) problems.push('correct must be one of A, B, C, D');

    const text = get('question');
    if (text.length < 3) problems.push('question text is required');
    const explanation = get('explanation');
    if (!explanation) problems.push('explanation is required');

    const access = (get('access') || 'FREE').toUpperCase();
    if (access !== 'FREE' && access !== 'PREMIUM') problems.push('access must be FREE or PREMIUM');

    const published = (get('published') || 'true').toLowerCase();
    if (!['true', 'false', 'yes', 'no', '1', '0'].includes(published))
      problems.push('published must be true or false');

    if (problems.length) {
      errors.push({ row, message: problems.join('; ') });
      return;
    }
    rows.push({
      subjectId: subjectId!,
      topicId,
      difficulty,
      text,
      textBn: get('question_bn') || null,
      options,
      correctOptionIndex,
      explanation,
      reference: get('reference') || null,
      accessLevel: access as AccessLevel,
      isPublished: ['true', 'yes', '1'].includes(published),
    });
  });

  return { rows, errors };
}
