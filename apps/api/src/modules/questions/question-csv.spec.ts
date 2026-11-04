import { parseQuestionCsv, type CsvLookups } from './question-csv';

const lookups: CsvLookups = {
  subjects: new Map([
    ['computer-science', 'subj-cs'],
    ['computer science', 'subj-cs'],
  ]),
  topics: new Map([['subj-cs:boolean algebra', 'topic-ba']]),
};

const header =
  'subject,topic,difficulty,question,question_bn,option_a,option_b,option_c,option_d,correct,explanation,reference,access,published';

describe('parseQuestionCsv', () => {
  it('parses valid rows including quoted commas', () => {
    const csv = `${header}\nComputer Science,Boolean Algebra,easy,"What is A + A', exactly?",,0,1,A,A',B,Complement law,,premium,false`;
    const { rows, errors } = parseQuestionCsv(csv, lookups);
    expect(errors).toEqual([]);
    expect(rows).toEqual([
      {
        subjectId: 'subj-cs',
        topicId: 'topic-ba',
        difficulty: 'EASY',
        text: "What is A + A', exactly?",
        textBn: null,
        options: ['0', '1', 'A', "A'"],
        correctOptionIndex: 1,
        explanation: 'Complement law',
        reference: null,
        accessLevel: 'PREMIUM',
        isPublished: false,
      },
    ]);
  });

  it('applies defaults for optional columns', () => {
    const csv =
      'subject,question,option_a,option_b,option_c,option_d,correct,explanation\ncomputer-science,Which is LIFO?,Queue,Stack,Tree,Graph,b,Stack is LIFO';
    const { rows } = parseQuestionCsv(csv, lookups);
    expect(rows[0]).toMatchObject({
      difficulty: 'MEDIUM',
      accessLevel: 'FREE',
      isPublished: true,
      topicId: null,
    });
  });

  it('reports every invalid row with its spreadsheet row number', () => {
    const csv = `${header}\nPhysics,,easy,Q1?,,a,b,c,d,A,x,,,\ncomputer-science,Unknown,extreme,Q2?,,a,a,c,,E,,,gold,maybe`;
    const { rows, errors } = parseQuestionCsv(csv, lookups);
    expect(rows).toHaveLength(0);
    expect(errors[0]).toEqual({ row: 2, message: 'unknown subject "Physics"' });
    expect(errors[1].row).toBe(3);
    expect(errors[1].message).toContain('unknown topic');
    expect(errors[1].message).toContain('difficulty must be');
    expect(errors[1].message).toContain('all four options are required');
    expect(errors[1].message).toContain('correct must be one of');
    expect(errors[1].message).toContain('explanation is required');
  });

  it('rejects files with missing required columns', () => {
    const { errors } = parseQuestionCsv('subject,question\ncs,Q?', lookups);
    expect(errors[0].message).toContain('Missing columns');
  });
});
