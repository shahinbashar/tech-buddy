import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { paginate, toSkipTake } from '../../common/utils/pagination';
import { UploadsService } from '../uploads/uploads.service';
import { type CreateNoteDto, type ListNotesQueryDto, type UpdateNoteDto } from './dto/note.dto';

@Injectable()
export class NotesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploads: UploadsService,
  ) {}

  async list(query: ListNotesQueryDto) {
    const where: Prisma.NoteWhereInput = {
      ...(query.topicId ? { topicId: query.topicId } : {}),
      ...(query.subjectId ? { topic: { subjectId: query.subjectId } } : {}),
      ...(query.search ? { title: { contains: query.search, mode: 'insensitive' } } : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.note.findMany({
        where,
        omit: { content: true },
        include: {
          topic: {
            select: { id: true, title: true, subject: { select: { id: true, name: true } } },
          },
          _count: { select: { attachments: true } },
        },
        orderBy: [{ updatedAt: 'desc' }],
        ...toSkipTake(query.page, query.pageSize),
      }),
      this.prisma.note.count({ where }),
    ]);
    return paginate(items, total, query.page, query.pageSize);
  }

  async findById(id: string) {
    const note = await this.prisma.note.findUnique({
      where: { id },
      include: {
        topic: { select: { id: true, title: true, subjectId: true } },
        attachments: { orderBy: { createdAt: 'asc' } },
      },
    });
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  async create(dto: CreateNoteDto) {
    await this.assertTopicExists(dto.topicId);
    const note = await this.prisma.note.create({ data: dto });
    return this.findById(note.id);
  }

  async update(id: string, dto: UpdateNoteDto) {
    await this.findById(id);
    if (dto.topicId) await this.assertTopicExists(dto.topicId);
    await this.prisma.note.update({ where: { id }, data: dto });
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    const note = await this.findById(id);
    await this.prisma.note.delete({ where: { id } });
    await this.uploads.removeFiles(note.attachments.map((a) => a.fileName));
  }

  private async assertTopicExists(topicId: string): Promise<void> {
    if (!(await this.prisma.topic.count({ where: { id: topicId } }))) {
      throw new BadRequestException('Topic not found');
    }
  }
}
