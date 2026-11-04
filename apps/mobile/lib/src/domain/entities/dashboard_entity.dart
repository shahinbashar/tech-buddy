class DashboardOverviewEntity {
  const DashboardOverviewEntity({
    required this.examsTaken,
    required this.averageScore,
    required this.accuracy,
    required this.completedTopics,
    required this.totalTopics,
    required this.currentStreak,
  });

  final int examsTaken;
  final double averageScore;
  final double accuracy;
  final int completedTopics;
  final int totalTopics;
  final int currentStreak;
}

class WeakTopicEntity {
  const WeakTopicEntity({
    required this.topicId,
    required this.topicName,
    required this.subjectName,
    required this.accuracy,
    this.subjectSlug,
    this.topicSlug,
  });

  final String topicId;
  final String topicName;
  final String subjectName;
  final double accuracy;

  /// Where to revise; null when the topic is no longer published.
  final String? subjectSlug;
  final String? topicSlug;
}

class ClosingSoonEntity {
  const ClosingSoonEntity({
    required this.slug,
    required this.title,
    required this.organizationName,
    required this.applicationDeadline,
  });

  final String slug;
  final String title;
  final String organizationName;
  final DateTime applicationDeadline;
}

class DashboardEntity {
  const DashboardEntity({
    required this.overview,
    required this.weakTopics,
    required this.closingSoon,
  });

  final DashboardOverviewEntity overview;
  final List<WeakTopicEntity> weakTopics;
  final List<ClosingSoonEntity> closingSoon;
}
