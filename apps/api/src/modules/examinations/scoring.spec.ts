import { computeScore, timeSpentSeconds } from './scoring';

const answer = (correct: string, selected: string | null) => ({
  correctOptionId: correct,
  selectedOptionId: selected,
});

describe('computeScore', () => {
  const answers = [answer('a', 'a'), answer('b', 'b'), answer('c', 'd'), answer('d', null)];

  it('counts correct, incorrect and unanswered questions', () => {
    expect(computeScore(answers, { marksPerQuestion: 1, negativeMarking: 0 })).toEqual({
      totalQuestions: 4,
      correctCount: 2,
      incorrectCount: 1,
      unansweredCount: 1,
      obtainedMarks: 2,
      totalMarks: 4,
      percentage: 50,
    });
  });

  it('applies negative marking only to incorrect answers', () => {
    const score = computeScore(answers, { marksPerQuestion: 1, negativeMarking: 0.5 });
    expect(score.obtainedMarks).toBe(1.5);
    expect(score.percentage).toBe(37.5);
  });

  it('never reports a negative percentage', () => {
    const score = computeScore([answer('a', 'b'), answer('a', 'c')], {
      marksPerQuestion: 1,
      negativeMarking: 1,
    });
    expect(score.obtainedMarks).toBe(-2);
    expect(score.percentage).toBe(0);
  });

  it('handles an empty answer list', () => {
    expect(computeScore([], { marksPerQuestion: 1, negativeMarking: 0 }).percentage).toBe(0);
  });
});

describe('timeSpentSeconds', () => {
  const start = new Date('2026-11-04T10:00:00Z');
  const expires = new Date('2026-11-04T10:20:00Z');

  it('measures time until submission', () => {
    expect(timeSpentSeconds(start, new Date('2026-11-04T10:05:30Z'), expires)).toBe(330);
  });

  it('is capped at the exam duration', () => {
    expect(timeSpentSeconds(start, new Date('2026-11-04T11:00:00Z'), expires)).toBe(1200);
  });
});
