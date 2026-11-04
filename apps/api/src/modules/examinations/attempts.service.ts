import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { type ExamAnswer, type ExamAttempt, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { type AuthUser } from '../../common/types/auth-user';
import { dhakaDate } from '../../common/utils/dhaka-time';
import { paginate, toSkipTake } from '../../common/utils/pagination';
import { type PaginationQueryDto } from '../../common/dto/pagination.dto';
import { canAccess } from '../premium/premium-access';
import { PremiumAccessService } from '../premium/premium-access.service';
import { buildAnswerSnapshots, parseSnapshotOptions } from './attempt-snapshot';
import { type SaveAnswerDto } from './dto/exam.dto';
import { isWithinAttemptWindow } from './exam.constants';
import { computeScore, timeSpentSeconds } from './scoring';

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
      if (isWithinAttemptWindow(inProgress.expiresAt)) {
        return { attemptId: inProgress.id, resumed: true };
      }
      await this.finalize(inProgress.id);
    }
    if (previous.length && !exam.allowMultipleAttempts) {
      throw new BadRequestException('You have already attempted this exam');
    }

    const startedAt = new Date();
    const snapshots = buildAnswerSnapshots(exam.questions.map((q) => q.question));
    let attempt: ExamAttempt;
    try {
      attempt = await this.prisma.examAttempt.create({
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
    } catch (error) {
      // A parallel request (e.g. double click) created the attempt first — resume it.
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        const existing = await this.prisma.examAttempt.findFirst({
          where: { examId, userId: user.id, status: 'IN_PROGRESS' },
        });
        if (existing) return { attemptId: existing.id, resumed: true };
      }
      throw error;
    }
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
    if (attempt.status === 'IN_PROGRESS' && answers.length) {
      // Late flushes are dropped silently: whatever was saved in time gets scored.
      await this.applyAnswers(attempt, answers, { strict: false });
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

  /**
   * Scores and closes an attempt exactly once. The attempt row is locked so a concurrent
   * answer write cannot change answers between scoring and closing.
   */
  async finalize(attemptId: string): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const attempt = await this.lockAttempt(tx, attemptId);
      if (!attempt || attempt.status === 'SUBMITTED') return;

      const answers = await tx.examAnswer.findMany({ where: { attemptId } });
      const now = new Date();
      const score = computeScore(answers, attempt);
      await tx.examAttempt.update({
        where: { id: attemptId },
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

  private isWritable(attempt: Pick<ExamAttempt, 'status' | 'expiresAt'>): boolean {
    return attempt.status === 'IN_PROGRESS' && isWithinAttemptWindow(attempt.expiresAt);
  }

  private assertWritable(attempt: Pick<ExamAttempt, 'status' | 'expiresAt'>): void {
    if (attempt.status !== 'IN_PROGRESS') {
      throw new BadRequestException('This attempt has already been submitted');
    }
    if (!isWithinAttemptWindow(attempt.expiresAt)) {
      throw new BadRequestException('Time is up for this attempt');
    }
  }

  /** Row-locks the attempt for the rest of the transaction (serializes answer writes vs. finalize). */
  private async lockAttempt(tx: Prisma.TransactionClient, attemptId: string) {
    const rows = await tx.$queryRaw<
      Pick<
        ExamAttempt,
        'id' | 'status' | 'startedAt' | 'expiresAt' | 'marksPerQuestion' | 'negativeMarking'
      >[]
    >`
      SELECT "id", "status", "startedAt", "expiresAt", "marksPerQuestion", "negativeMarking"
      FROM "ExamAttempt" WHERE "id" = ${attemptId} FOR UPDATE`;
    return rows[0] ?? null;
  }

  /** Validates and stores answers while holding the attempt lock. */
  private async applyAnswers(
    attempt: AttemptWithAnswers,
    updates: SaveAnswerDto[],
    { strict }: { strict: boolean } = { strict: true },
  ): Promise<void> {
    const byId = new Map(attempt.answers.map((a) => [a.id, a]));
    const changes = updates.map((update) => {
      const answer = byId.get(update.answerId);
      if (!answer) throw new BadRequestException('Answer does not belong to this attempt');
      const selected = update.selectedOptionId ?? null;
      if (selected && !parseSnapshotOptions(answer.options).some((o) => o.id === selected)) {
        throw new BadRequestException('Selected option is not valid for this question');
      }
      return { id: answer.id, selected };
    });

    await this.prisma.$transaction(async (tx) => {
      const locked = await this.lockAttempt(tx, attempt.id);
      if (!locked) throw new NotFoundException('Attempt not found');
      if (!strict && !this.isWritable(locked)) return;
      this.assertWritable(locked);
      const answeredAt = new Date();
      for (const change of changes) {
        await tx.examAnswer.update({
          where: { id: change.id },
          data: {
            selectedOptionId: change.selected,
            answeredAt: change.selected ? answeredAt : null,
          },
        });
      }
    });
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
