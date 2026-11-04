import 'package:dart_mappable/dart_mappable.dart';

part 'study_model.mapper.dart';

@MappableClass(generateMethods: GenerateMethods.decode)
class SubjectModel with SubjectModelMappable {
  SubjectModel({
    required this.id,
    required this.slug,
    required this.name,
    required this.topicCount,
    required this.completedCount,
    this.nameBn,
    this.description,
  });

  final String id;
  final String slug;
  final String name;
  final String? nameBn;
  final String? description;
  final int topicCount;
  final int completedCount;

  static const fromJson = SubjectModelMapper.fromJson;
}

@MappableClass(generateMethods: GenerateMethods.decode)
class TopicNodeModel with TopicNodeModelMappable {
  TopicNodeModel({
    required this.id,
    required this.slug,
    required this.title,
    required this.accessLevel,
    required this.isLocked,
    required this.isCompleted,
    this.noteCount = 0,
    this.description,
    this.children = const [],
  });

  final String id;
  final String slug;
  final String title;
  final String? description;
  final String accessLevel;
  final bool isLocked;
  final bool isCompleted;
  final int noteCount;
  final List<TopicNodeModel> children;
}

@MappableClass(generateMethods: GenerateMethods.decode)
class SubjectDetailModel with SubjectDetailModelMappable {
  SubjectDetailModel({
    required this.id,
    required this.slug,
    required this.name,
    required this.topicCount,
    required this.completedCount,
    required this.topics,
    this.nameBn,
    this.description,
  });

  final String id;
  final String slug;
  final String name;
  final String? nameBn;
  final String? description;
  final int topicCount;
  final int completedCount;
  final List<TopicNodeModel> topics;

  static const fromJson = SubjectDetailModelMapper.fromJson;
}

@MappableClass(generateMethods: GenerateMethods.decode)
class TopicLinkModel with TopicLinkModelMappable {
  TopicLinkModel({required this.slug, required this.title});

  final String slug;
  final String title;
}

@MappableClass(generateMethods: GenerateMethods.decode)
class TopicSubjectModel with TopicSubjectModelMappable {
  TopicSubjectModel({required this.slug, required this.name});

  final String slug;
  final String name;
}

@MappableClass(generateMethods: GenerateMethods.decode)
class NoteModel with NoteModelMappable {
  NoteModel({
    required this.id,
    required this.title,
    required this.isLocked,
    this.summary,
    this.content,
  });

  final String id;
  final String title;
  final String? summary;
  final String? content;
  final bool isLocked;
}

@MappableClass(generateMethods: GenerateMethods.decode)
class TopicDetailModel with TopicDetailModelMappable {
  TopicDetailModel({
    required this.id,
    required this.slug,
    required this.title,
    required this.subject,
    required this.isLocked,
    required this.isCompleted,
    this.description,
    this.content,
    this.notes = const [],
    this.children = const [],
    this.previous,
    this.next,
  });

  final String id;
  final String slug;
  final String title;
  final String? description;
  final String? content;
  final TopicSubjectModel subject;
  final bool isLocked;
  final bool isCompleted;
  final List<NoteModel> notes;
  final List<TopicLinkModel> children;
  final TopicLinkModel? previous;
  final TopicLinkModel? next;

  static const fromJson = TopicDetailModelMapper.fromJson;
}
