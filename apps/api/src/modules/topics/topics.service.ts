import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { type AuthUser } from '../../common/types/auth-user';
import { paginate, toSkipTake } from '../../common/utils/pagination';
import { findAvailableSlug } from '../../common/utils/slug';
import { canAccess } from '../premium/premium-access';
import { PremiumAccessService } from '../premium/premium-access.service';
import { UploadsService } from '../uploads/uploads.service';
import { flattenTopicTree } from './topic-tree';
import { type CreateTopicDto, type ListTopicsQueryDto, type UpdateTopicDto } from './dto/topic.dto';

const navSelect = { id: true, slug: true, title: true } satisfies Prisma.TopicSelect;

@Injectable()
export class TopicsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly premiumAccess: PremiumAccessService,
    private readonly uploads: UploadsService,
  ) {}

  // ─────────────── Public ───────────────

  /** Topic page: overview, notes (premium bodies stripped when locked), subtopics, navigation. */
  async findPublic(subjectSlug: string, topicSlug: string, user?: AuthUser) {
    const topic = await this.prisma.topic.findFirst({
      where: {
        slug: topicSlug,
        isPublished: true,
        subject: { slug: subjectSlug, isPublished: true },
      },
      include: {
        subject: { select: { id: true, slug: true, name: true, nameBn: true } },
        parent: { select: { ...navSelect, isPublished: true } },
        children: {
          where: { isPublished: true },
          orderBy: [{ order: 'asc' }, { title: 'asc' }],
          select: { ...navSelect, description: true, accessLevel: true },
        },
        notes: {
          where: { isPublished: true },
          orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
          include: {
            attachments: {
              select: { id: true, originalName: true, mimeType: true, size: true, url: true },
            },
          },
        },
      },
    });
    if (!topic || (topic.parent && !topic.parent.isPublished))
      throw new NotFoundException('Topic not found');

    const [hasPremium, progress, sequence] = await Promise.all([
      this.premiumAccess.hasPremiumAccess(user),
      user
        ? this.prisma.userTopicProgress.findUnique({
            where: { userId_topicId: { userId: user.id, topicId: topic.id } },
          })
        : null,
      this.readingOrder(topic.subjectId),
    ]);

    const topicUnlocked = canAccess(topic.accessLevel, hasPremium);
    const position = sequence.findIndex((t) => t.id === topic.id);
    const { notes, ...rest } = topic;

    return {
      ...rest,
      content: topicUnlocked ? topic.content : null,
      isLocked: !topicUnlocked,
      isCompleted: Boolean(progress),
      completedAt: progress?.completedAt ?? null,
      notes: notes.map((note) => {
        const unlocked = topicUnlocked && canAccess(note.accessLevel, hasPremium);
        return {
          ...note,
          content: unlocked ? note.content : null,
          attachments: unlocked ? note.attachments : [],
          isLocked: !unlocked,
        };
      }),
      previous: position > 0 ? sequence[position - 1] : null,
      next: position >= 0 && position < sequence.length - 1 ? sequence[position + 1] : null,
    };
  }

  // ─────────────── Admin ───────────────

  async listAdmin(query: ListTopicsQueryDto) {
    const where: Prisma.TopicWhereInput = {
      ...(query.subjectId ? { subjectId: query.subjectId } : {}),
      ...(query.search ? { title: { contains: query.search, mode: 'insensitive' } } : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.topic.findMany({
        where,
        omit: { content: true },
        include: {
          subject: { select: { id: true, name: true } },
          parent: { select: { id: true, title: true } },
          _count: { select: { notes: true, questions: true, children: true } },
        },
        orderBy: [
          { subject: { order: 'asc' } },
          { parentId: { sort: 'asc', nulls: 'first' } },
          { order: 'asc' },
        ],
        ...toSkipTake(query.page, query.pageSize),
      }),
      this.prisma.topic.count({ where }),
    ]);
    return paginate(items, total, query.page, query.pageSize);
  }

  /** Lightweight list for select inputs. */
  options(subjectId?: string) {
    return this.prisma.topic.findMany({
      where: subjectId ? { subjectId } : {},
      select: { id: true, title: true, subjectId: true, parentId: true },
      orderBy: [{ order: 'asc' }, { title: 'asc' }],
    });
  }

  async findById(id: string) {
    const topic = await this.prisma.topic.findUnique({
      where: { id },
      include: { subject: { select: { id: true, name: true, slug: true } } },
    });
    if (!topic) throw new NotFoundException('Topic not found');
    return topic;
  }

  async create(dto: CreateTopicDto) {
    const subject = await this.prisma.subject.findUnique({ where: { id: dto.subjectId } });
    if (!subject) throw new BadRequestException('Subject not found');
    await this.assertValidParent(dto.subjectId, dto.parentId ?? null, null);
    return this.prisma.topic.create({
      data: { ...dto, slug: await this.availableSlug(dto.subjectId, dto.title) },
    });
  }

  async update(id: string, dto: UpdateTopicDto) {
    const existing = await this.findById(id);
    const subjectId = dto.subjectId ?? existing.subjectId;
    const parentId = dto.parentId === undefined ? existing.parentId : dto.parentId;

    if (subjectId !== existing.subjectId) {
      const childCount = await this.prisma.topic.count({ where: { parentId: id } });
      if (childCount)
        throw new BadRequestException('Move or delete subtopics before changing the subject');
    }
    await this.assertValidParent(subjectId, parentId, id);

    const slug =
      subjectId !== existing.subjectId
        ? await this.availableSlug(subjectId, dto.title ?? existing.title)
        : undefined;
    return this.prisma.topic.update({ where: { id }, data: { ...dto, ...(slug ? { slug } : {}) } });
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);
    const files = await this.prisma.attachment.findMany({
      where: { note: { topic: { OR: [{ id }, { parentId: id }] } } },
      select: { fileName: true },
    });
    await this.prisma.topic.delete({ where: { id } });
    await this.uploads.removeFiles(files.map((f) => f.fileName));
  }

  // ─────────────── Helpers ───────────────

  /** Published topics of a subject flattened in reading order (root, its subtopics, next root…). */
  private async readingOrder(subjectId: string) {
    const topics = await this.prisma.topic.findMany({
      where: { subjectId, isPublished: true },
      select: { ...navSelect, parentId: true },
      orderBy: [{ order: 'asc' }, { title: 'asc' }],
    });
    return flattenTopicTree(topics).map(({ id, slug, title }) => ({ id, slug, title }));
  }

  /** Enforces one level of nesting within the same subject. */
  private async assertValidParent(
    subjectId: string,
    parentId: string | null,
    selfId: string | null,
  ) {
    if (!parentId) return;
    if (parentId === selfId) throw new BadRequestException('A topic cannot be its own parent');
    const parent = await this.prisma.topic.findUnique({ where: { id: parentId } });
    if (!parent) throw new BadRequestException('Parent topic not found');
    if (parent.subjectId !== subjectId)
      throw new BadRequestException('Parent topic belongs to another subject');
    if (parent.parentId) throw new BadRequestException('Subtopics cannot have their own subtopics');
    if (selfId && (await this.prisma.topic.count({ where: { parentId: selfId } }))) {
      throw new BadRequestException('A topic with subtopics cannot become a subtopic');
    }
  }

  private availableSlug(subjectId: string, title: string): Promise<string> {
    return findAvailableSlug(
      title,
      async (slug) => (await this.prisma.topic.count({ where: { subjectId, slug } })) > 0,
    );
  }
}
