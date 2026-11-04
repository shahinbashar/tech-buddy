export interface ScorableAnswer {
  correctOptionId: string;
  selectedOptionId: string | null;
}

export interface ScoringRules {
  marksPerQuestion: number;
  negativeMarking: number;
}

export interface ScoreSummary {
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  obtainedMarks: number;
  totalMarks: number;
  percentage: number;
}

const round2 = (value: number) => Math.round(value * 100) / 100;

/** Pure scoring. Obtained marks may be negative with negative marking; percentage is floored at 0. */
export function computeScore(
  answers: readonly ScorableAnswer[],
  rules: ScoringRules,
): ScoreSummary {
  let correctCount = 0;
  let incorrectCount = 0;
  for (const answer of answers) {
    if (!answer.selectedOptionId) continue;
    if (answer.selectedOptionId === answer.correctOptionId) correctCount++;
    else incorrectCount++;
  }
  const totalQuestions = answers.length;
  const totalMarks = round2(totalQuestions * rules.marksPerQuestion);
  const obtainedMarks = round2(
    correctCount * rules.marksPerQuestion - incorrectCount * rules.negativeMarking,
  );
  const percentage = totalMarks > 0 ? round2(Math.max(0, (obtainedMarks / totalMarks) * 100)) : 0;
  return {
    totalQuestions,
    correctCount,
    incorrectCount,
    unansweredCount: totalQuestions - correctCount - incorrectCount,
    obtainedMarks,
    totalMarks,
    percentage,
  };
}

/** Seconds actually available to the candidate, capped at the exam duration. */
export function timeSpentSeconds(startedAt: Date, finishedAt: Date, expiresAt: Date): number {
  const end = finishedAt < expiresAt ? finishedAt : expiresAt;
  return Math.max(0, Math.round((end.getTime() - startedAt.getTime()) / 1000));
}
