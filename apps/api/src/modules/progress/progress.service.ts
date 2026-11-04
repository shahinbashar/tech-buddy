import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { type AuthUser } from '../../common/types/auth-user';
import { canAccess } from '../premium/premium-access';
import { PremiumAccessService } from '../premium/premium-access.service';
import { flattenTopicTree } from '../topics/topic-tree';

@Injectable()
export class ProgressService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly premiumAccess: PremiumAccessService,
  ) {}

  async markComplete(user: AuthUser, topicId: string) {
    const topic = await this.prisma.topic.findFirst({
      where: {
        id: topicId,
        isPublished: true,
        subject: { isPublished: true },
        // A subtopic is only visible while its parent topic is published.
        OR: [{ parentId: null }, { parent: { isPublished: true } }],
      },
      select: { id: true, accessLevel: true },
    });
    if (!topic) throw new NotFoundException('Topic not found');
    if (!canAccess(topic.accessLevel, await this.premiumAccess.hasPremiumAccess(user))) {
      throw new ForbiddenException('This topic requires premium access');
    }
    return this.prisma.userTopicProgress.upsert({
      where: { userId_topicId: { userId: user.id, topicId } },
      create: { userId: user.id, topicId },
      update: {},
    });
  }

  async unmarkComplete(userId: string, topicId: string): Promise<void> {
    await this.prisma.userTopicProgress.deleteMany({ where: { userId, topicId } });
  }

  /** Per-subject learning progress across all published topics and subtopics. */
  async overview(userId: string) {
    const [subjects, progress] = await Promise.all([
      this.prisma.subject.findMany({
        where: { isPublished: true },
        orderBy: [{ order: 'asc' }, { name: 'asc' }],
        select: {
          id: true,
          slug: true,
          name: true,
          nameBn: true,
          category: true,
          topics: {
            where: { isPublished: true },
            orderBy: [{ order: 'asc' }, { title: 'asc' }],
            select: { id: true, slug: true, title: true, parentId: true, accessLevel: true },
          },
        },
      }),
      this.prisma.userTopicProgress.findMany({
        where: { userId },
        select: { topicId: true, completedAt: true },
      }),
    ]);
    const completedAt = new Map(progress.map((p) => [p.topicId, p.completedAt]));

    const bySubject = subjects.map(({ topics, ...subject }) => {
      const ordered = flattenTopicTree(topics).map((t) => ({
        ...t,
        isCompleted: completedAt.has(t.id),
        completedAt: completedAt.get(t.id) ?? null,
      }));
      return {
        ...subject,
        totalTopics: ordered.length,
        completedTopics: ordered.filter((t) => t.isCompleted).length,
        topics: ordered,
      };
    });

    const totalTopics = bySubject.reduce((sum, s) => sum + s.totalTopics, 0);
    const completedTopics = bySubject.reduce((sum, s) => sum + s.completedTopics, 0);
    return { totalTopics, completedTopics, subjects: bySubject };
  }
}
