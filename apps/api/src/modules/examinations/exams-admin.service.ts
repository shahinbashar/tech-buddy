import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { type AccessLevel, type Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { dhakaDate, parseIsoDate, toIsoDate } from '../../common/utils/dhaka-time';
import { paginate, toSkipTake } from '../../common/utils/pagination';
import { type PaginationQueryDto } from '../../common/dto/pagination.dto';
import {
  type CreateExamDto,
  type ExamSettingsDto,
  type QuestionSelectionDto,
  type UpdateExamDto,
} from './dto/exam.dto';
import { ExamGeneratorService } from './exam-generator.service';

@Injectable()
export class ExamsAdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly generator: ExamGeneratorService,
  ) {}

  getSettings() {
    return this.generator.getSettings();
  }

  updateSettings(dto: ExamSettingsDto) {
    return this.generator.updateSettings(dto);
  }

  async list(query: PaginationQueryDto) {
    // Private practice sets belong to users and are not managed here.
    const where: Prisma.ExamWhereInput = {
      ownerId: null,
      ...(query.search ? { title: { contains: query.search, mode: 'insensitive' } } : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.exam.findMany({
        where,
        include: { _count: { select: { questions: true, attempts: true } } },
        orderBy: [{ examDate: 'desc' }, { createdAt: 'desc' }],
        ...toSkipTake(query.page, query.pageSize),
      }),
      this.prisma.exam.count({ where }),
    ]);
    return paginate(
      items.map(({ _count, ...exam }) => ({
        ...exam,
        examDate: toIsoDate(exam.examDate),
        questionCount: _count.questions,
        attemptCount: _count.attempts,
      })),
      total,
      query.page,
      query.pageSize,
    );
  }

  async findById(id: string) {
    const exam = await this.prisma.exam.findUnique({
      where: { id },
      include: {
        _count: { select: { attempts: true } },
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
    const { _count, questions, ...rest } = exam;
    return {
      ...rest,
      examDate: toIsoDate(exam.examDate),
      attemptCount: _count.attempts,
      questions: questions.map((q) => q.question),
    };
  }

  async create(dto: CreateExamDto) {
    const settings = await this.generator.getSettings();
    const examDate = dto.examDate ? parseIsoDate(dto.examDate) : dhakaDate();
    const accessLevel = dto.accessLevel ?? 'FREE';
    const questionIds = await this.resolveQuestions(
      dto.selection,
      accessLevel,
      settings.questionCount,
    );

    const exam = await this.prisma.exam.create({
      data: {
        title: dto.title ?? `Daily Exam — ${toIsoDate(examDate)}`,
        description: dto.description,
        type: dto.type ?? 'DAILY',
        examDate,
        durationMinutes: dto.durationMinutes ?? settings.durationMinutes,
        marksPerQuestion: dto.marksPerQuestion ?? settings.marksPerQuestion,
        negativeMarking: dto.negativeMarking ?? settings.negativeMarking,
        allowMultipleAttempts: dto.allowMultipleAttempts ?? settings.allowMultipleAttempts,
        accessLevel,
        isPublished: dto.isPublished ?? false,
        questions: { create: questionIds.map((questionId, order) => ({ questionId, order })) },
      },
    });
    return this.findById(exam.id);
  }

  async update(id: string, dto: UpdateExamDto) {
    const exam = await this.findById(id);
    if (dto.accessLevel === 'FREE' && exam.questions.some((q) => q.accessLevel === 'PREMIUM')) {
      throw new BadRequestException(
        'This exam contains premium questions; regenerate its questions first',
      );
    }
    const { examDate, ...data } = dto;
    await this.prisma.exam.update({
      where: { id },
      data: { ...data, ...(examDate ? { examDate: parseIsoDate(examDate) } : {}) },
    });
    return this.findById(id);
  }

  /** Replaces the question set. Only allowed before anyone has attempted the exam. */
  async replaceQuestions(id: string, selection: QuestionSelectionDto) {
    const exam = await this.findById(id);
    if (exam.attemptCount > 0) {
      throw new BadRequestException(
        'Questions cannot be changed after candidates have attempted this exam',
      );
    }
    const settings = await this.generator.getSettings();
    const questionIds = await this.resolveQuestions(
      selection,
      exam.accessLevel,
      selection.questionCount ?? (exam.questions.length || settings.questionCount),
    );
    await this.prisma.$transaction([
      this.prisma.examQuestion.deleteMany({ where: { examId: id } }),
      this.prisma.examQuestion.createMany({
        data: questionIds.map((questionId, order) => ({ examId: id, questionId, order })),
      }),
    ]);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    const exam = await this.findById(id);
    if (exam.attemptCount > 0) {
      throw new BadRequestException(
        'This exam has attempts and cannot be deleted. Unpublish it instead.',
      );
    }
    await this.prisma.exam.delete({ where: { id } });
  }

  private async resolveQuestions(
    selection: QuestionSelectionDto | undefined,
    accessLevel: AccessLevel,
    defaultCount: number,
  ): Promise<string[]> {
    if (selection?.questionIds?.length) {
      await this.generator.assertQuestionsUsable(selection.questionIds, accessLevel);
      return selection.questionIds;
    }
    const count = selection?.questionCount ?? defaultCount;
    const ids = await this.generator.pickRandomQuestionIds(
      count,
      accessLevel,
      selection?.subjectIds,
    );
    if (ids.length < count) {
      throw new BadRequestException(
        `Only ${ids.length} matching published ${accessLevel === 'FREE' ? 'free ' : ''}question(s) are available; ${count} requested`,
      );
    }
    return ids;
  }
}
