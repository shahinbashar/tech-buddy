import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { type ExamAnswer, type ExamAttempt } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { type AuthUser } from '../../common/types/auth-user';
import { dhakaDate } from '../../common/utils/dhaka-time';
import { paginate, toSkipTake } from '../../common/utils/pagination';
import { type PaginationQueryDto } from '../../common/dto/pagination.dto';
import { canAccess } from '../premium/premium-access';
import { PremiumAccessService } from '../premium/premium-access.service';
import { buildAnswerSnapshots, parseSnapshotOptions } from './attempt-snapshot';
import { type SaveAnswerDto } from './dto/exam.dto';
import { computeScore, timeSpentSeconds } from './scoring';

/** Answers arriving slightly after expiry (network latency) are still accepted. */
export const SUBMISSION_GRACE_MS = 15_000;

type AttemptWithAnswers = ExamAttempt & { answers: ExamAnswer[] };

@Injectable()
export class AttemptsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly premiumAccess: PremiumAccessService,
  ) {}

  /** Starts a new attempt, or returns the attempt already in progress. */
  async start(user: AuthUser, examId: string): Promise<{ attemptId: string; resumed: boolean }> {
    const exam = await this.prisma.exam.findFirst({
      where: { id: examId, isPublished: true },
      include: {
        questions: {
          orderBy: { order: 'asc' },
          include: {
            question: {
              include: {
                subject: { select: { id: true, name: true } },
                topic: { select: { id: true, title: true } },
                options: { orderBy: { order: 'asc' } },
              },
            },
          },
        },
      },
    });
    if (!exam) throw new NotFoundException('Exam not found');
    if (exam.examDate > dhakaDate()) throw new BadRequestException('This exam is not open yet');
    if (!exam.questions.length) throw new BadRequestException('This exam has no questions');
    if (!canAccess(exam.accessLevel, await this.premiumAccess.hasPremiumAccess(user))) {
      throw new ForbiddenException('This exam requires premium access');
    }

    const previous = await this.prisma.examAttempt.findMany({
      where: { examId, userId: user.id },
      orderBy: { attemptNumber: 'desc' },
    });
    const inProgress = previous.find((a) => a.status === 'IN_PROGRESS');
    if (inProgress) {
      if (inProgress.expiresAt.getTime() + SUBMISSION_GRACE_MS > Date.now()) {
        return { attemptId: inProgress.id, resumed: true };
      }
      await this.finalize(inProgress.id);
    }
    if (previous.length && !exam.allowMultipleAttempts) {
      throw new BadRequestException('You have already attempted this exam');
    }

    const startedAt = new Date();
    const snapshots = buildAnswerSnapshots(exam.questions.map((q) => q.question));
    const attempt = await this.prisma.examAttempt.create({
      data: {
        examId,
        userId: user.id,
        attemptNumber: (previous[0]?.attemptNumber ?? 0) + 1,
        startedAt,
        expiresAt: new Date(startedAt.getTime() + exam.durationMinutes * 60_000),
        totalQuestions: snapshots.length,
        totalMarks: snapshots.length * exam.marksPerQuestion,
        unansweredCount: snapshots.length,
        marksPerQuestion: exam.marksPerQuestion,
        negativeMarking: exam.negativeMarking,
        examTitle: exam.title,
        answers: { createMany: { data: snapshots } },
      },
    });
    return { attemptId: attempt.id, resumed: false };
  }

  async saveAnswer(
    userId: string,
    attemptId: string,
    dto: SaveAnswerDto,
  ): Promise<{ saved: true }> {
    const attempt = await this.getOwnedAttempt(userId, attemptId);
    this.assertWritable(attempt);
    await this.applyAnswers(attempt, [dto]);
    return { saved: true };
  }

  async submit(userId: string, attemptId: string, answers: SaveAnswerDto[] = []) {
    const attempt = await this.getOwnedAttempt(userId, attemptId);
    if (attempt.status === 'IN_PROGRESS' && answers.length && this.isWritable(attempt)) {
      await this.applyAnswers(attempt, answers);
    }
    await this.finalize(attemptId);
    return this.view(userId, attemptId);
  }

  /**
   * In-progress attempts never include correct answers or explanations.
   * Expired in-progress attempts are finalized on read.
   */
  async view(userId: string, attemptId: string) {
    let attempt = await this.getOwnedAttempt(userId, attemptId);
    if (attempt.status === 'IN_PROGRESS' && !this.isWritable(attempt)) {
      await this.finalize(attemptId);
      attempt = await this.getOwnedAttempt(userId, attemptId);
    }
    const exam = await this.prisma.exam.findUnique({
      where: { id: attempt.examId },
      select: {
        id: true,
        title: true,
        durationMinutes: true,
        allowMultipleAttempts: true,
        type: true,
      },
    });
    const base = {
      id: attempt.id,
      status: attempt.status,
      attemptNumber: attempt.attemptNumber,
      exam: exam ?? { id: attempt.examId, title: attempt.examTitle },
      examTitle: attempt.examTitle,
      startedAt: attempt.startedAt,
      expiresAt: attempt.expiresAt,
      serverTime: new Date(),
      totalQuestions: attempt.totalQuestions,
      marksPerQuestion: attempt.marksPerQuestion,
      negativeMarking: attempt.negativeMarking,
    };

    if (attempt.status === 'IN_PROGRESS') {
      return {
        ...base,
        questions: attempt.answers.map((a) => ({
          answerId: a.id,
          order: a.order,
          text: a.questionText,
          textBn: a.questionTextBn,
          options: parseSnapshotOptions(a.options),
          selectedOptionId: a.selectedOptionId,
          subjectName: a.subjectName,
        })),
      };
    }

    return {
      ...base,
      submittedAt: attempt.submittedAt,
      result: {
        totalQuestions: attempt.totalQuestions,
        correctCount: attempt.correctCount,
        incorrectCount: attempt.incorrectCount,
        unansweredCount: attempt.unansweredCount,
        obtainedMarks: attempt.obtainedMarks,
        totalMarks: attempt.totalMarks,
        percentage: attempt.percentage,
        timeSpentSeconds: attempt.timeSpentSeconds,
        accuracy: this.accuracy(attempt.correctCount, attempt.incorrectCount),
      },
      subjectBreakdown: this.subjectBreakdown(attempt.answers),
      questions: attempt.answers.map((a) => ({
        answerId: a.id,
        order: a.order,
        text: a.questionText,
        textBn: a.questionTextBn,
        options: parseSnapshotOptions(a.options),
        selectedOptionId: a.selectedOptionId,
        correctOptionId: a.correctOptionId,
        isCorrect: a.isCorrect,
        explanation: a.explanation,
        subjectName: a.subjectName,
        topicName: a.topicName,
        difficulty: a.difficulty,
      })),
    };
  }

  async history(userId: string, query: PaginationQueryDto) {
    const where = { userId, status: 'SUBMITTED' as const };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.examAttempt.findMany({
        where,
        omit: { marksPerQuestion: true, negativeMarking: true },
        orderBy: { submittedAt: 'desc' },
        ...toSkipTake(query.page, query.pageSize),
      }),
      this.prisma.examAttempt.count({ where }),
    ]);
    return paginate(
      items.map((a) => ({ ...a, accuracy: this.accuracy(a.correctCount, a.incorrectCount) })),
      total,
      query.page,
      query.pageSize,
    );
  }

  /** Scores and closes an attempt exactly once (idempotent; safe under concurrent calls). */
  async finalize(attemptId: string): Promise<void> {
    const attempt = await this.prisma.examAttempt.findUnique({
      where: { id: attemptId },
      include: { answers: true },
    });
    if (!attempt || attempt.status === 'SUBMITTED') return;

    const now = new Date();
    const score = computeScore(attempt.answers, attempt);
    await this.prisma.$transaction(async (tx) => {
      const { count } = await tx.examAttempt.updateMany({
        where: { id: attemptId, status: 'IN_PROGRESS' },
        data: {
          status: 'SUBMITTED',
          submittedAt: now,
          correctCount: score.correctCount,
          incorrectCount: score.incorrectCount,
          unansweredCount: score.unansweredCount,
          obtainedMarks: score.obtainedMarks,
          totalMarks: score.totalMarks,
          percentage: score.percentage,
          timeSpentSeconds: timeSpentSeconds(attempt.startedAt, now, attempt.expiresAt),
        },
      });
      if (!count) return;
      await tx.$executeRaw`
        UPDATE "ExamAnswer"
        SET "isCorrect" = CASE WHEN "selectedOptionId" IS NULL THEN NULL
                               ELSE "selectedOptionId" = "correctOptionId" END
        WHERE "attemptId" = ${attemptId}`;
    });
  }

  // ─────────────── Helpers ───────────────

  private async getOwnedAttempt(userId: string, attemptId: string): Promise<AttemptWithAnswers> {
    const attempt = await this.prisma.examAttempt.findUnique({
      where: { id: attemptId },
      include: { answers: { orderBy: { order: 'asc' } } },
    });
    // 404 (not 403) for other users' attempts so ids cannot be probed.
    if (!attempt || attempt.userId !== userId) throw new NotFoundException('Attempt not found');
    return attempt;
  }

  private isWritable(attempt: ExamAttempt): boolean {
    return (
      attempt.status === 'IN_PROGRESS' &&
      Date.now() <= attempt.expiresAt.getTime() + SUBMISSION_GRACE_MS
    );
  }

  private assertWritable(attempt: ExamAttempt): void {
    if (attempt.status !== 'IN_PROGRESS')
      throw new BadRequestException('This attempt has already been submitted');
    if (!this.isWritable(attempt)) throw new BadRequestException('Time is up for this attempt');
  }

  private async applyAnswers(attempt: AttemptWithAnswers, updates: SaveAnswerDto[]): Promise<void> {
    const byId = new Map(attempt.answers.map((a) => [a.id, a]));
    const operations = updates.map((update) => {
      const answer = byId.get(update.answerId);
      if (!answer) throw new BadRequestException('Answer does not belong to this attempt');
      const selected = update.selectedOptionId ?? null;
      if (selected && !parseSnapshotOptions(answer.options).some((o) => o.id === selected)) {
        throw new BadRequestException('Selected option is not valid for this question');
      }
      return this.prisma.examAnswer.update({
        where: { id: answer.id },
        data: { selectedOptionId: selected, answeredAt: selected ? new Date() : null },
      });
    });
    await this.prisma.$transaction(operations);
  }

  private accuracy(correct: number, incorrect: number): number {
    const answered = correct + incorrect;
    return answered ? Math.round((correct / answered) * 10_000) / 100 : 0;
  }

  private subjectBreakdown(answers: ExamAnswer[]) {
    const groups = new Map<
      string,
      { subjectName: string; correct: number; incorrect: number; unanswered: number }
    >();
    for (const answer of answers) {
      const group = groups.get(answer.subjectName) ?? {
        subjectName: answer.subjectName,
        correct: 0,
        incorrect: 0,
        unanswered: 0,
      };
      if (answer.isCorrect === true) group.correct++;
      else if (answer.isCorrect === false) group.incorrect++;
      else group.unanswered++;
      groups.set(answer.subjectName, group);
    }
    return [...groups.values()].map((g) => ({
      ...g,
      total: g.correct + g.incorrect + g.unanswered,
    }));
  }
}
