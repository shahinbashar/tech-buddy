import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { dhakaDate } from '../../common/utils/dhaka-time';
import { activeEntitlementWhere } from '../premium/premium-access';
import { ProgressService } from '../progress/progress.service';
import { currentStreak } from './streak';

const WEAK_TOPIC_MIN_ANSWERS = 3;
const DAY_MS = 24 * 60 * 60 * 1000;

const pct = (part: number, whole: number) =>
  whole ? Math.round((part / whole) * 10_000) / 100 : 0;

@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly progressService: ProgressService,
  ) {}

  async userDashboard(userId: string) {
    const submitted = { userId, status: 'SUBMITTED' as const };
    const [attempts, subjectGroups, topicGroups, progress, completions] = await Promise.all([
      this.prisma.examAttempt.findMany({
        where: submitted,
        select: {
          id: true,
          examTitle: true,
          submittedAt: true,
          percentage: true,
          obtainedMarks: true,
          totalMarks: true,
          correctCount: true,
          incorrectCount: true,
          unansweredCount: true,
        },
        orderBy: { submittedAt: 'asc' },
      }),
      this.prisma.examAnswer.groupBy({
        by: ['subjectName', 'isCorrect'],
        where: { attempt: submitted },
        _count: { _all: true },
      }),
      this.prisma.examAnswer.groupBy({
        by: ['topicId', 'topicName', 'subjectName', 'isCorrect'],
        where: { attempt: submitted, topicId: { not: null } },
        _count: { _all: true },
      }),
      this.progressService.overview(userId),
      this.prisma.userTopicProgress.findMany({ where: { userId }, select: { completedAt: true } }),
    ]);

    const totals = attempts.reduce(
      (acc, a) => ({
        correct: acc.correct + a.correctCount,
        incorrect: acc.incorrect + a.incorrectCount,
        unanswered: acc.unanswered + a.unansweredCount,
      }),
      { correct: 0, incorrect: 0, unanswered: 0 },
    );

    // Subject-wise performance
    const subjects = new Map<
      string,
      { subjectName: string; correct: number; incorrect: number; unanswered: number }
    >();
    for (const group of subjectGroups) {
      const entry = subjects.get(group.subjectName) ?? {
        subjectName: group.subjectName,
        correct: 0,
        incorrect: 0,
        unanswered: 0,
      };
      if (group.isCorrect === true) entry.correct += group._count._all;
      else if (group.isCorrect === false) entry.incorrect += group._count._all;
      else entry.unanswered += group._count._all;
      subjects.set(group.subjectName, entry);
    }

    // Weak topics: lowest accuracy among topics with enough answered questions
    const topics = new Map<
      string,
      { topicId: string; topicName: string; subjectName: string; correct: number; answered: number }
    >();
    for (const group of topicGroups) {
      if (!group.topicId || group.isCorrect === null) continue;
      const entry = topics.get(group.topicId) ?? {
        topicId: group.topicId,
        topicName: group.topicName ?? 'Unknown topic',
        subjectName: group.subjectName,
        correct: 0,
        answered: 0,
      };
      entry.answered += group._count._all;
      if (group.isCorrect) entry.correct += group._count._all;
      topics.set(group.topicId, entry);
    }
    const weakTopics = [...topics.values()]
      .filter((t) => t.answered >= WEAK_TOPIC_MIN_ANSWERS)
      .map((t) => ({ ...t, accuracy: pct(t.correct, t.answered) }))
      .filter((t) => t.accuracy < 70)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 5);

    const activity = [
      ...attempts.map((a) => a.submittedAt).filter((d): d is Date => d !== null),
      ...completions.map((c) => c.completedAt),
    ];

    return {
      overview: {
        examsTaken: attempts.length,
        averageScore: attempts.length
          ? Math.round((attempts.reduce((s, a) => s + a.percentage, 0) / attempts.length) * 100) /
            100
          : 0,
        bestScore: attempts.length ? Math.max(...attempts.map((a) => a.percentage)) : 0,
        accuracy: pct(totals.correct, totals.correct + totals.incorrect),
        completedTopics: progress.completedTopics,
        totalTopics: progress.totalTopics,
        currentStreak: currentStreak(activity),
      },
      answerBreakdown: totals,
      performanceOverTime: attempts.slice(-20).map((a) => ({
        attemptId: a.id,
        date: a.submittedAt,
        examTitle: a.examTitle,
        percentage: a.percentage,
      })),
      subjectPerformance: [...subjects.values()]
        .map((s) => ({ ...s, accuracy: pct(s.correct, s.correct + s.incorrect) }))
        .sort((a, b) => a.subjectName.localeCompare(b.subjectName)),
      topicProgress: progress.subjects
        .filter((s) => s.totalTopics > 0)
        .map((s) => ({
          subjectId: s.id,
          subjectSlug: s.slug,
          subjectName: s.name,
          completed: s.completedTopics,
          total: s.totalTopics,
        })),
      weakTopics,
      recentAttempts: attempts.slice(-5).reverse(),
    };
  }

  async adminOverview() {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * DAY_MS);
    const today = dhakaDate(now);
    const startOfToday = new Date(today.getTime() - 6 * 60 * 60 * 1000);
    const [
      users,
      newUsers,
      runningCirculars,
      circulars,
      subjects,
      topics,
      notes,
      questions,
      publishedQuestions,
      exams,
      attemptsToday,
      premiumUsers,
      recentUsers,
    ] = await this.prisma.$transaction([
      this.prisma.user.count({ where: { role: 'USER' } }),
      this.prisma.user.count({ where: { role: 'USER', createdAt: { gte: weekAgo } } }),
      this.prisma.jobCircular.count({
        where: { isPublished: true, applicationDeadline: { gte: now } },
      }),
      this.prisma.jobCircular.count(),
      this.prisma.subject.count(),
      this.prisma.topic.count(),
      this.prisma.note.count(),
      this.prisma.question.count(),
      this.prisma.question.count({ where: { isPublished: true } }),
      this.prisma.exam.count(),
      this.prisma.examAttempt.count({ where: { startedAt: { gte: startOfToday } } }),
      this.prisma.user.count({ where: { entitlements: { some: activeEntitlementWhere(now) } } }),
      this.prisma.user.findMany({
        where: { role: 'USER' },
        select: { id: true, fullName: true, email: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ]);
    return {
      counts: {
        users,
        newUsers,
        runningCirculars,
        circulars,
        subjects,
        topics,
        notes,
        questions,
        publishedQuestions,
        exams,
        attemptsToday,
        premiumUsers,
      },
      recentUsers,
    };
  }
}
