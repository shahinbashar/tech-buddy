import {
  buildAnswerSnapshots,
  parseSnapshotOptions,
  type SourceQuestion,
} from './attempt-snapshot';

const question = (id: string): SourceQuestion => ({
  id,
  text: `Question ${id}`,
  textBn: null,
  explanation: 'Because.',
  difficulty: 'EASY',
  subject: { id: 's1', name: 'Computer Science' },
  topic: { id: 't1', title: 'Boolean Algebra' },
  options: ['a', 'b', 'c', 'd'].map((o, i) => ({
    id: `${id}-${o}`,
    text: o,
    textBn: null,
    isCorrect: i === 2,
  })),
});

describe('buildAnswerSnapshots', () => {
  it('captures the correct option and copies question data', () => {
    const [snapshot] = buildAnswerSnapshots([question('q1')]);
    expect(snapshot.correctOptionId).toBe('q1-c');
    expect(snapshot.questionText).toBe('Question q1');
    expect(snapshot.subjectName).toBe('Computer Science');
    expect(snapshot.topicName).toBe('Boolean Algebra');
  });

  it('never stores isCorrect flags in the option snapshot shown to candidates', () => {
    const [snapshot] = buildAnswerSnapshots([question('q1')]);
    const options = parseSnapshotOptions(snapshot.options as never);
    expect(options).toHaveLength(4);
    options.forEach((option) => expect(option).not.toHaveProperty('isCorrect'));
  });

  it('assigns sequential order after shuffling questions', () => {
    const snapshots = buildAnswerSnapshots(
      [question('q1'), question('q2'), question('q3')],
      () => 0,
    );
    expect(snapshots.map((s) => s.order)).toEqual([0, 1, 2]);
    expect(snapshots.map((s) => s.questionId)).toEqual(['q2', 'q3', 'q1']);
  });

  it('rejects questions without a correct option', () => {
    const broken = {
      ...question('q1'),
      options: question('q1').options.map((o) => ({ ...o, isCorrect: false })),
    };
    expect(() => buildAnswerSnapshots([broken])).toThrow('has no correct option');
  });
});
