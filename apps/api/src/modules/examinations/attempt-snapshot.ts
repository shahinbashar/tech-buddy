import { type Difficulty, type Prisma } from '@prisma/client';
import { shuffle } from '../../common/utils/shuffle';

export interface SnapshotOption {
  id: string;
  text: string;
  textBn: string | null;
}

export interface SourceQuestion {
  id: string;
  text: string;
  textBn: string | null;
  explanation: string;
  difficulty: Difficulty;
  subject: { id: string; name: string };
  topic: { id: string; title: string } | null;
  options: { id: string; text: string; textBn: string | null; isCorrect: boolean }[];
}

/**
 * Builds the immutable per-attempt snapshot: question order and option order are shuffled,
 * and the correct option id is captured so later edits never change historical results.
 */
export function buildAnswerSnapshots(
  questions: readonly SourceQuestion[],
  random?: (max: number) => number,
): Omit<Prisma.ExamAnswerCreateManyInput, 'attemptId'>[] {
  return shuffle(questions, random).map((question, order) => {
    const correct = question.options.find((o) => o.isCorrect);
    if (!correct) throw new Error(`Question ${question.id} has no correct option`);
    const options: SnapshotOption[] = shuffle(question.options, random).map(
      ({ id, text, textBn }) => ({
        id,
        text,
        textBn,
      }),
    );
    return {
      questionId: question.id,
      order,
      questionText: question.text,
      questionTextBn: question.textBn,
      options: options as unknown as Prisma.InputJsonValue,
      correctOptionId: correct.id,
      explanation: question.explanation,
      subjectId: question.subject.id,
      subjectName: question.subject.name,
      topicId: question.topic?.id ?? null,
      topicName: question.topic?.title ?? null,
      difficulty: question.difficulty,
    };
  });
}

export function parseSnapshotOptions(value: Prisma.JsonValue): SnapshotOption[] {
  return Array.isArray(value) ? (value as unknown as SnapshotOption[]) : [];
}
