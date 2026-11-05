import { Injectable, NotFoundException } from '@nestjs/common';
import { type ExamAttempt, type Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { type AuthUser } from '../../common/types/auth-user';
import { dhakaDate, toIsoDate } from '../../common/utils/dhaka-time';
import { paginate, toSkipTake } from '../../common/utils/pagination';
import { type PaginationQueryDto } from '../../common/dto/pagination.dto';
import { canAccess } from '../premium/premium-access';
import { PremiumAccessService } from '../premium/premium-access.service';
import { ExamGeneratorService } from './exam-generator.service';
import { displayName, rankAttempts, topPercent } from './leaderboard';
import { examVisibleTo, isWithinAttemptWindow, PUBLIC_EXAM_WHERE } from './exam.constants';

const examCardInclude = { _count: { select: { questions: true } } } satisfies Prisma.ExamInclude;
type ExamWithCount = Prisma.ExamGetPayload<{ include: typeof examCardInclude }>;
type AttemptSummary = Pick<
  ExamAttempt,
  'id' | 'status' | 'percentage' | 'submittedAt' | 'expiresAt' | 'examId'
>;

@Injectable()
export class ExamsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly generator: ExamGeneratorService,
    private readonly premiumAccess: PremiumAccessService,
  ) {}

  /** Today's exams (Asia/Dhaka). Auto-creates the daily exam when configured. */
  async today(user: AuthUser) {
    await this.generator.ensureTodaysDailyExam();
    const exams = await this.prisma.exam.findMany({
      where: { ...PUBLIC_EXAM_WHERE, examDate: dhakaDate() },
      include: examCardInclude,
      orderBy: [{ type: 'asc' }, { createdAt: 'asc' }],
    });
    return this.toCards(user, exams);
  }

  /**
   * Published exams from previous days, newest first — lets candidates practise days they
   * missed. Today's exams come from `today()`, so they are not repeated here.
   */
  async list(user: AuthUser, query: PaginationQueryDto) {
    const where: Prisma.ExamWhereInput = {
      ...PUBLIC_EXAM_WHERE,
      examDate: { lt: dhakaDate() },
      ...(query.search ? { title: { contains: query.search, mode: 'insensitive' } } : {}),
    };
    const [exams, total] = await this.prisma.$transaction([
      this.prisma.exam.findMany({
        where,
        include: examCardInclude,
        orderBy: [{ examDate: 'desc' }, { createdAt: 'desc' }],
        ...toSkipTake(query.page, query.pageSize),
      }),
      this.prisma.exam.count({ where }),
    ]);
    return paginate(await this.toCards(user, exams), total, query.page, query.pageSize);
  }

  async findOne(user: AuthUser, id: string) {
    const exam = await this.prisma.exam.findFirst({
      where: { id, ...examVisibleTo(user.id) },
      include: examCardInclude,
    });
    if (!exam) throw new NotFoundException('Exam not found');
    const [card] = await this.toCards(user, [exam]);
    const attempts = await this.prisma.examAttempt.findMany({
      where: { examId: id, userId: user.id },
      select: {
        id: true,
        attemptNumber: true,
        status: true,
        startedAt: true,
        submittedAt: true,
        obtainedMarks: true,
        totalMarks: true,
        percentage: true,
      },
      orderBy: { attemptNumber: 'desc' },
    });
    return { ...card, attempts };
  }

  /**
   * Merit list from each candidate's first submitted attempt (retakes don't count).
   * Not available for private practice sets.
   */
  async leaderboard(user: AuthUser, examId: string, limit = 10) {
    const exam = await this.prisma.exam.findFirst({
      where: { id: examId, ...PUBLIC_EXAM_WHERE },
      select: { id: true, title: true },
    });
    if (!exam) throw new NotFoundException('Exam not found');

    const attempts = await this.prisma.examAttempt.findMany({
      where: { examId, attemptNumber: 1, status: 'SUBMITTED' },
      select: {
        userId: true,
        obtainedMarks: true,
        percentage: true,
        timeSpentSeconds: true,
        user: { select: { fullName: true } },
      },
      orderBy: [{ obtainedMarks: 'desc' }, { timeSpentSeconds: 'asc' }, { submittedAt: 'asc' }],
    });
    const ranked = rankAttempts(
      attempts.map(({ user: u, ...a }) => ({ ...a, fullName: u.fullName })),
    );
    const mine = ranked.find((a) => a.userId === user.id);
    const toEntry = (a: (typeof ranked)[number]) => ({
      rank: a.rank,
      name: displayName(a.fullName),
      obtainedMarks: a.obtainedMarks,
      percentage: a.percentage,
      timeSpentSeconds: a.timeSpentSeconds,
      isMe: a.userId === user.id,
    });
    return {
      examId: exam.id,
      examTitle: exam.title,
      participants: ranked.length,
      top: ranked.slice(0, limit).map(toEntry),
      me: mine ? { ...toEntry(mine), topPercent: topPercent(mine.rank, ranked.length) } : null,
    };
  }

  private async toCards(user: AuthUser, exams: ExamWithCount[]) {
    const hasPremium = await this.premiumAccess.hasPremiumAccess(user);
    const attempts: AttemptSummary[] = exams.length
      ? await this.prisma.examAttempt.findMany({
          where: { userId: user.id, examId: { in: exams.map((e) => e.id) } },
          select: {
            id: true,
            status: true,
            percentage: true,
            submittedAt: true,
            expiresAt: true,
            examId: true,
          },
          orderBy: { attemptNumber: 'desc' },
        })
      : [];
    const today = dhakaDate();
    const now = Date.now();

    return exams.map(({ _count, ...exam }) => {
      const mine = attempts.filter((a) => a.examId === exam.id);
      const submitted = mine.filter((a) => a.status === 'SUBMITTED');
      const inProgress = mine.find(
        (a) => a.status === 'IN_PROGRESS' && isWithinAttemptWindow(a.expiresAt, now),
      );
      const isLocked = !canAccess(exam.accessLevel, hasPremium);
      const isOpen = exam.examDate <= today;
      return {
        id: exam.id,
        title: exam.title,
        description: exam.description,
        type: exam.type,
        examDate: toIsoDate(exam.examDate),
        durationMinutes: exam.durationMinutes,
        marksPerQuestion: exam.marksPerQuestion,
        negativeMarking: exam.negativeMarking,
        allowMultipleAttempts: exam.allowMultipleAttempts,
        accessLevel: exam.accessLevel,
        questionCount: _count.questions,
        isLocked,
        attemptCount: submitted.length,
        bestPercentage: submitted.length ? Math.max(...submitted.map((a) => a.percentage)) : null,
        lastAttemptId: submitted[0]?.id ?? null,
        inProgressAttemptId: inProgress?.id ?? null,
        canStart:
          isOpen &&
          !isLocked &&
          _count.questions > 0 &&
          (exam.allowMultipleAttempts || mine.length === 0 || Boolean(inProgress)),
      };
    });
  }
}
