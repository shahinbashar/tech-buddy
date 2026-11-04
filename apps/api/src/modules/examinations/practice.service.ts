import { BadRequestException, Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { type AuthUser } from '../../common/types/auth-user';
import { dhakaDate } from '../../common/utils/dhaka-time';
import { shuffle } from '../../common/utils/shuffle';
import { PremiumAccessService } from '../premium/premium-access.service';
import { AttemptsService } from './attempts.service';
import { type CreatePracticeDto } from './dto/practice.dto';

export interface PracticeSource {
  reference: string;
  /** Published questions in the paper. */
  questionCount: number;
  /** Of those, how many this user may practise (all, or only free ones without premium). */
  availableCount: number;
}

/** Seconds allowed per practice question (a little more generous than the daily exam). */
const SECONDS_PER_QUESTION = 60;

/**
 * Personal practice sets: random questions from a subject, topic or past paper, or the
 * questions the user most recently got wrong. They reuse the exam engine (snapshots, timer, server scoring) as
 * private PRACTICE exams that are never listed publicly or ranked.
 */
@Injectable()
export class PracticeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly premiumAccess: PremiumAccessService,
    private readonly attempts: AttemptsService,
  ) {}

  async create(
    user: AuthUser,
    dto: CreatePracticeDto,
  ): Promise<{ attemptId: string; questionCount: number }> {
    const hasPremium = await this.premiumAccess.hasPremiumAccess(user);
    const scope: Prisma.QuestionWhereInput = {
      isPublished: true,
      ...(hasPremium ? {} : { accessLevel: 'FREE' }),
      ...(dto.subjectId ? { subjectId: dto.subjectId } : {}),
      ...(dto.topicId
        ? { OR: [{ topicId: dto.topicId }, { topic: { parentId: dto.topicId } }] }
        : {}),
      ...(dto.reference ? { reference: dto.reference } : {}),
    };

    const candidateIds =
      dto.mode === 'mistakes'
        ? await this.mistakeQuestionIds(user.id, scope)
        : await this.questionIds(scope);
    if (!candidateIds.length) {
      throw new BadRequestException(
        dto.mode === 'mistakes'
          ? 'No mistakes to practise yet — great job! Try a random practice set instead.'
          : 'No questions are available for this selection yet.',
      );
    }
    const questionIds = shuffle(candidateIds).slice(0, dto.questionCount);

    const exam = await this.prisma.exam.create({
      data: {
        title: await this.title(dto),
        type: 'PRACTICE',
        ownerId: user.id,
        examDate: dhakaDate(),
        durationMinutes: Math.max(1, Math.ceil((questionIds.length * SECONDS_PER_QUESTION) / 60)),
        allowMultipleAttempts: true,
        accessLevel: hasPremium ? 'PREMIUM' : 'FREE',
        isPublished: true,
        questions: { create: questionIds.map((questionId, order) => ({ questionId, order })) },
      },
    });
    const { attemptId } = await this.attempts.start(user, exam.id);
    return { attemptId, questionCount: questionIds.length };
  }

  /**
   * Past papers (question `reference`s) with how many of their questions this user can
   * practise. A paper whose questions are all premium is listed with `availableCount: 0`, so
   * clients can show it as locked rather than hide it.
   */
  async sources(user: AuthUser): Promise<PracticeSource[]> {
    const hasPremium = await this.premiumAccess.hasPremiumAccess(user);
    const groups = await this.prisma.question.groupBy({
      by: ['reference', 'accessLevel'],
      where: { isPublished: true, reference: { not: null } },
      _count: { _all: true },
    });
    const byReference = new Map<string, PracticeSource>();
    for (const group of groups) {
      if (!group.reference) continue;
      const source = byReference.get(group.reference) ?? {
        reference: group.reference,
        questionCount: 0,
        availableCount: 0,
      };
      source.questionCount += group._count._all;
      if (hasPremium || group.accessLevel === 'FREE') source.availableCount += group._count._all;
      byReference.set(group.reference, source);
    }
    return [...byReference.values()].sort((a, b) => a.reference.localeCompare(b.reference));
  }

  private async questionIds(scope: Prisma.QuestionWhereInput): Promise<string[]> {
    const rows = await this.prisma.question.findMany({ where: scope, select: { id: true } });
    return rows.map((r) => r.id);
  }

  /** Questions whose most recent answer by this user was wrong. */
  private async mistakeQuestionIds(
    userId: string,
    scope: Prisma.QuestionWhereInput,
  ): Promise<string[]> {
    const answers = await this.prisma.examAnswer.findMany({
      where: {
        attempt: { userId, status: 'SUBMITTED' },
        questionId: { not: null },
        isCorrect: { not: null },
      },
      select: { questionId: true, isCorrect: true },
      orderBy: { attempt: { submittedAt: 'desc' } },
    });
    const latest = new Map<string, boolean>();
    for (const answer of answers) {
      if (answer.questionId && !latest.has(answer.questionId))
        latest.set(answer.questionId, Boolean(answer.isCorrect));
    }
    const wrong = [...latest].filter(([, correct]) => !correct).map(([id]) => id);
    if (!wrong.length) return [];
    return this.questionIds({ ...scope, id: { in: wrong } });
  }

  private async title(dto: CreatePracticeDto): Promise<string> {
    const prefix = dto.mode === 'mistakes' ? 'Mistakes practice' : 'Practice';
    if (dto.reference) return `${prefix} — ${dto.reference}`;
    if (dto.topicId) {
      const topic = await this.prisma.topic.findUnique({
        where: { id: dto.topicId },
        select: { title: true },
      });
      if (topic) return `${prefix} — ${topic.title}`;
    }
    if (dto.subjectId) {
      const subject = await this.prisma.subject.findUnique({
        where: { id: dto.subjectId },
        select: { name: true },
      });
      if (subject) return `${prefix} — ${subject.name}`;
    }
    return `${prefix} — All subjects`;
  }
}
