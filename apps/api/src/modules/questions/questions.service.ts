import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { paginate, toSkipTake } from '../../common/utils/pagination';
import {
  type CreateQuestionDto,
  type ListQuestionsQueryDto,
  type QuestionOptionInputDto,
  type UpdateQuestionDto,
} from './dto/question.dto';
import { type CsvLookups, parseQuestionCsv } from './question-csv';

const questionInclude = {
  subject: { select: { id: true, name: true } },
  topic: { select: { id: true, title: true } },
  options: { orderBy: { order: 'asc' } },
} satisfies Prisma.QuestionInclude;

export const MAX_CSV_BYTES = 1024 * 1024;

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: ListQuestionsQueryDto) {
    const where: Prisma.QuestionWhereInput = {
      ...(query.subjectId ? { subjectId: query.subjectId } : {}),
      ...(query.topicId ? { topicId: query.topicId } : {}),
      ...(query.difficulty ? { difficulty: query.difficulty } : {}),
      ...(query.accessLevel ? { accessLevel: query.accessLevel } : {}),
      ...(query.published !== undefined ? { isPublished: query.published } : {}),
      ...(query.search
        ? {
            OR: [
              { text: { contains: query.search, mode: 'insensitive' } },
              { textBn: { contains: query.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.question.findMany({
        where,
        include: { ...questionInclude, _count: { select: { examQuestions: true } } },
        orderBy: { createdAt: 'desc' },
        ...toSkipTake(query.page, query.pageSize),
      }),
      this.prisma.question.count({ where }),
    ]);
    return paginate(items, total, query.page, query.pageSize);
  }

  async findById(id: string) {
    const question = await this.prisma.question.findUnique({
      where: { id },
      include: questionInclude,
    });
    if (!question) throw new NotFoundException('Question not found');
    return question;
  }

  async create(dto: CreateQuestionDto) {
    await this.assertSubjectAndTopic(dto.subjectId, dto.topicId ?? null);
    const { options, correctOptionIndex, ...data } = dto;
    this.assertDistinctOptions(options);
    const question = await this.prisma.question.create({
      data: { ...data, options: { create: this.optionRows(options, correctOptionIndex) } },
    });
    return this.findById(question.id);
  }

  async update(id: string, dto: UpdateQuestionDto) {
    const existing = await this.findById(id);
    const subjectId = dto.subjectId ?? existing.subjectId;
    const topicId = dto.topicId === undefined ? existing.topicId : dto.topicId;
    if (dto.subjectId !== undefined || dto.topicId !== undefined) {
      await this.assertSubjectAndTopic(subjectId, topicId);
    }

    if (dto.accessLevel === 'PREMIUM' && existing.accessLevel === 'FREE') {
      const freeExams = await this.prisma.examQuestion.count({
        where: { questionId: id, exam: { accessLevel: 'FREE' } },
      });
      if (freeExams) {
        throw new BadRequestException(
          `This question is used in ${freeExams} free exam(s), so it cannot become premium.`,
        );
      }
    }

    const { options, correctOptionIndex, ...data } = dto;
    const nextOptions = options ?? existing.options.map(({ text, textBn }) => ({ text, textBn }));
    const nextCorrect = correctOptionIndex ?? existing.options.findIndex((o) => o.isCorrect);
    this.assertDistinctOptions(nextOptions);

    // Options are updated in place (by position) so their ids stay stable.
    await this.prisma.$transaction([
      this.prisma.question.update({ where: { id }, data }),
      ...this.optionRows(nextOptions, nextCorrect).map((option) =>
        this.prisma.questionOption.upsert({
          where: { questionId_order: { questionId: id, order: option.order } },
          create: { ...option, questionId: id },
          update: option,
        }),
      ),
    ]);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);
    const usage = await this.prisma.examQuestion.count({ where: { questionId: id } });
    if (usage) {
      throw new BadRequestException(
        `This question is used in ${usage} exam(s). Unpublish it instead of deleting it.`,
      );
    }
    await this.prisma.question.delete({ where: { id } });
  }

  /** All-or-nothing CSV import: nothing is written if any row is invalid. */
  async importCsv(file: Express.Multer.File | undefined) {
    if (!file) throw new BadRequestException('A CSV file is required (form field "file")');
    if (file.size > MAX_CSV_BYTES)
      throw new BadRequestException('CSV files must be 1 MB or smaller');
    if (!file.originalname.toLowerCase().endsWith('.csv'))
      throw new BadRequestException('Only .csv files are accepted');

    const { rows, errors } = parseQuestionCsv(
      file.buffer.toString('utf8'),
      await this.csvLookups(),
    );
    if (errors.length) return { imported: 0, errors };

    await this.prisma.$transaction(
      rows.map(({ options, correctOptionIndex, ...data }) =>
        this.prisma.question.create({
          data: {
            ...data,
            options: {
              create: this.optionRows(
                options.map((text) => ({ text })),
                correctOptionIndex,
              ),
            },
          },
        }),
      ),
    );
    return { imported: rows.length, errors: [] };
  }

  private async csvLookups(): Promise<CsvLookups> {
    const [subjects, topics] = await Promise.all([
      this.prisma.subject.findMany({ select: { id: true, slug: true, name: true } }),
      this.prisma.topic.findMany({
        select: { id: true, slug: true, title: true, subjectId: true },
      }),
    ]);
    const subjectMap = new Map<string, string>();
    subjects.forEach((s) => {
      subjectMap.set(s.slug.toLowerCase(), s.id);
      subjectMap.set(s.name.toLowerCase(), s.id);
    });
    const topicMap = new Map<string, string>();
    topics.forEach((t) => {
      topicMap.set(`${t.subjectId}:${t.slug.toLowerCase()}`, t.id);
      topicMap.set(`${t.subjectId}:${t.title.toLowerCase()}`, t.id);
    });
    return { subjects: subjectMap, topics: topicMap };
  }

  private optionRows(
    options: Pick<QuestionOptionInputDto, 'text' | 'textBn'>[],
    correctIndex: number,
  ) {
    return options.map((option, order) => ({
      text: option.text,
      textBn: option.textBn ?? null,
      isCorrect: order === correctIndex,
      order,
    }));
  }

  private assertDistinctOptions(options: Pick<QuestionOptionInputDto, 'text'>[]): void {
    if (new Set(options.map((o) => o.text.trim().toLowerCase())).size !== options.length) {
      throw new BadRequestException('Answer options must be distinct');
    }
  }

  private async assertSubjectAndTopic(subjectId: string, topicId: string | null): Promise<void> {
    if (!(await this.prisma.subject.count({ where: { id: subjectId } }))) {
      throw new BadRequestException('Subject not found');
    }
    if (topicId && !(await this.prisma.topic.count({ where: { id: topicId, subjectId } }))) {
      throw new BadRequestException('Topic not found in the selected subject');
    }
  }
}
