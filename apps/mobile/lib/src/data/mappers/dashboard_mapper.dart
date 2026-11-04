import '../../domain/entities/dashboard_entity.dart';
import '../models/dashboard_model.dart';

class DashboardMapper {
  const DashboardMapper();

  DashboardEntity toEntity(DashboardModel model) => DashboardEntity(
    overview: DashboardOverviewEntity(
      examsTaken: model.overview.examsTaken,
      averageScore: model.overview.averageScore,
      accuracy: model.overview.accuracy,
      completedTopics: model.overview.completedTopics,
      totalTopics: model.overview.totalTopics,
      currentStreak: model.overview.currentStreak,
    ),
    weakTopics: [
      for (final t in model.weakTopics)
        WeakTopicEntity(
          topicId: t.topicId,
          topicName: t.topicName,
          subjectName: t.subjectName,
          accuracy: t.accuracy,
          subjectSlug: t.subjectSlug,
          topicSlug: t.topicSlug,
        ),
    ],
    closingSoon: [
      for (final c in model.savedClosingSoon)
        ClosingSoonEntity(
          slug: c.slug,
          title: c.title,
          organizationName: c.organizationName,
          applicationDeadline: c.applicationDeadline.toLocal(),
        ),
    ],
  );
}
