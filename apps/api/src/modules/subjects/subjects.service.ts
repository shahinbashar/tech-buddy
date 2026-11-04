import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { type AuthUser } from '../../common/types/auth-user';
import { slugify } from '../../common/utils/slug';
import { PremiumAccessService } from '../premium/premium-access.service';
import { canAccess } from '../premium/premium-access';
import { type CreateSubjectDto, type UpdateSubjectDto } from './dto/subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly premiumAccess: PremiumAccessService,
  ) {}

  // ─────────────── Public ───────────────

  async listPublic(user?: AuthUser) {
    const subjects = await this.prisma.subject.findMany({
      where: { isPublished: true },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
      include: { topics: { where: { isPublished: true }, select: { id: true } } },
    });
    const completed = user ? await this.completedTopicIds(user.id) : new Set<string>();
    return subjects.map(({ topics, ...subject }) => ({
      ...subject,
      topicCount: topics.length,
      completedCount: topics.filter((t) => completed.has(t.id)).length,
    }));
  }

  async findPublicBySlug(slug: string, user?: AuthUser) {
    const subject = await this.prisma.subject.findFirst({
      where: { slug, isPublished: true },
      include: {
        topics: {
          where: { isPublished: true },
          orderBy: [{ order: 'asc' }, { title: 'asc' }],
          select: {
            id: true,
            slug: true,
            title: true,
            description: true,
            accessLevel: true,
            parentId: true,
            order: true,
            _count: { select: { notes: { where: { isPublished: true } } } },
          },
        },
      },
    });
    if (!subject) throw new NotFoundException('Subject not found');

    const [completed, hasPremium] = await Promise.all([
      user ? this.completedTopicIds(user.id) : Promise.resolve(new Set<string>()),
      this.premiumAccess.hasPremiumAccess(user),
    ]);
    const nodes = subject.topics.map(({ _count, ...topic }) => ({
      ...topic,
      noteCount: _count.notes,
      isCompleted: completed.has(topic.id),
      isLocked: !canAccess(topic.accessLevel, hasPremium),
    }));
    // Subtopics whose parent is unpublished are hidden together with it.
    const roots = nodes
      .filter((n) => !n.parentId)
      .map((root) => ({ ...root, children: nodes.filter((n) => n.parentId === root.id) }));
    const visible = roots.flatMap((root) => [root, ...root.children]);

    const { topics: _topics, ...rest } = subject;
    return {
      ...rest,
      topicCount: visible.length,
      completedCount: visible.filter((n) => n.isCompleted).length,
      topics: roots,
    };
  }

  // ─────────────── Admin ───────────────

  async listAdmin() {
    const subjects = await this.prisma.subject.findMany({
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
      include: { _count: { select: { topics: true, questions: true } } },
    });
    return subjects.map(({ _count, ...s }) => ({
      ...s,
      topicCount: _count.topics,
      questionCount: _count.questions,
    }));
  }

  async findById(id: string) {
    const subject = await this.prisma.subject.findUnique({ where: { id } });
    if (!subject) throw new NotFoundException('Subject not found');
    return subject;
  }

  async create(dto: CreateSubjectDto) {
    return this.prisma.subject.create({
      data: { ...dto, slug: await this.availableSlug(dto.name) },
    });
  }

  async update(id: string, dto: UpdateSubjectDto) {
    await this.findById(id);
    return this.prisma.subject.update({ where: { id }, data: dto });
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);
    // Questions restrict deletion (FK) — the Prisma filter turns that into a 409.
    await this.prisma.subject.delete({ where: { id } });
  }

  private async availableSlug(name: string): Promise<string> {
    const base = slugify(name);
    let slug = base;
    for (let i = 2; await this.prisma.subject.count({ where: { slug } }); i++)
      slug = `${base}-${i}`;
    return slug;
  }

  private async completedTopicIds(userId: string): Promise<Set<string>> {
    const rows = await this.prisma.userTopicProgress.findMany({
      where: { userId },
      select: { topicId: true },
    });
    return new Set(rows.map((r) => r.topicId));
  }
}
