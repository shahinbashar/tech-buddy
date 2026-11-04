/// A study subject with the user's progress through its topics.
class SubjectEntity {
  const SubjectEntity({
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

  /// Share of topics completed, from 0 to 1.
  double get progress => topicCount == 0 ? 0 : completedCount / topicCount;
}

/// A node of a subject's topic tree (one level of subtopics).
class TopicNodeEntity {
  const TopicNodeEntity({
    required this.id,
    required this.slug,
    required this.title,
    required this.isPremium,
    required this.isLocked,
    required this.isCompleted,
    required this.noteCount,
    this.description,
    this.children = const [],
  });

  final String id;
  final String slug;
  final String title;
  final String? description;
  final bool isPremium;

  /// Premium content the user has no access to.
  final bool isLocked;
  final bool isCompleted;
  final int noteCount;
  final List<TopicNodeEntity> children;
}

class SubjectDetailEntity {
  const SubjectDetailEntity({required this.subject, required this.topics});

  final SubjectEntity subject;
  final List<TopicNodeEntity> topics;
}

/// A neighbouring topic, for previous/next navigation.
class TopicLinkEntity {
  const TopicLinkEntity({required this.slug, required this.title});

  final String slug;
  final String title;
}

class NoteEntity {
  const NoteEntity({
    required this.id,
    required this.title,
    required this.isLocked,
    this.summary,
    this.content,
  });

  final String id;
  final String title;
  final String? summary;

  /// Markdown. Null when the note is locked.
  final String? content;
  final bool isLocked;
}

class TopicDetailEntity {
  const TopicDetailEntity({
    required this.id,
    required this.slug,
    required this.title,
    required this.subjectSlug,
    required this.subjectName,
    required this.isLocked,
    required this.isCompleted,
    required this.notes,
    this.description,
    this.content,
    this.subtopics = const [],
    this.previous,
    this.next,
  });

  final String id;
  final String slug;
  final String title;
  final String? description;

  /// The topic's own Markdown overview. Null when locked or not written.
  final String? content;
  final String subjectSlug;
  final String subjectName;
  final bool isLocked;
  final bool isCompleted;
  final List<NoteEntity> notes;
  final List<TopicLinkEntity> subtopics;
  final TopicLinkEntity? previous;
  final TopicLinkEntity? next;
}
