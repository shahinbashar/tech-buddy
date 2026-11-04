import 'package:dart_mappable/dart_mappable.dart';

part 'dashboard_model.mapper.dart';

@MappableClass(generateMethods: GenerateMethods.decode)
class DashboardOverviewModel with DashboardOverviewModelMappable {
  DashboardOverviewModel({
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

@MappableClass(generateMethods: GenerateMethods.decode)
class WeakTopicModel with WeakTopicModelMappable {
  WeakTopicModel({
    required this.topicId,
    required this.topicName,
    required this.subjectName,
    required this.accuracy,
  });

  final String topicId;
  final String topicName;
  final String subjectName;
  final double accuracy;
}

@MappableClass(generateMethods: GenerateMethods.decode)
class ClosingSoonModel with ClosingSoonModelMappable {
  ClosingSoonModel({
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

@MappableClass(generateMethods: GenerateMethods.decode)
class DashboardModel with DashboardModelMappable {
  DashboardModel({
    required this.overview,
    required this.weakTopics,
    required this.savedClosingSoon,
  });

  final DashboardOverviewModel overview;
  final List<WeakTopicModel> weakTopics;
  final List<ClosingSoonModel> savedClosingSoon;

  static const fromJson = DashboardModelMapper.fromJson;
}
