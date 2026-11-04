import '../../domain/entities/study_entity.dart';
import '../models/study_model.dart';

class StudyMapper {
  const StudyMapper();

  static const _premium = 'PREMIUM';

  SubjectEntity toSubject(SubjectModel model) => SubjectEntity(
    id: model.id,
    slug: model.slug,
    name: model.name,
    nameBn: model.nameBn,
    description: model.description,
    topicCount: model.topicCount,
    completedCount: model.completedCount,
  );

  SubjectDetailEntity toSubjectDetail(SubjectDetailModel model) =>
      SubjectDetailEntity(
        subject: SubjectEntity(
          id: model.id,
          slug: model.slug,
          name: model.name,
          nameBn: model.nameBn,
          description: model.description,
          topicCount: model.topicCount,
          completedCount: model.completedCount,
        ),
        topics: [for (final topic in model.topics) toTopicNode(topic)],
      );

  TopicNodeEntity toTopicNode(TopicNodeModel model) => TopicNodeEntity(
    id: model.id,
    slug: model.slug,
    title: model.title,
    description: model.description,
    isPremium: model.accessLevel == _premium,
    isLocked: model.isLocked,
    isCompleted: model.isCompleted,
    noteCount: model.noteCount,
    children: [for (final child in model.children) toTopicNode(child)],
  );

  TopicDetailEntity toTopicDetail(TopicDetailModel model) => TopicDetailEntity(
    id: model.id,
    slug: model.slug,
    title: model.title,
    description: model.description,
    content: _blankToNull(model.content),
    subjectSlug: model.subject.slug,
    subjectName: model.subject.name,
    isLocked: model.isLocked,
    isCompleted: model.isCompleted,
    notes: [for (final note in model.notes) _toNote(note)],
    subtopics: [for (final child in model.children) _toLink(child)],
    previous: model.previous == null ? null : _toLink(model.previous!),
    next: model.next == null ? null : _toLink(model.next!),
  );

  NoteEntity _toNote(NoteModel model) => NoteEntity(
    id: model.id,
    title: model.title,
    summary: model.summary,
    content: _blankToNull(model.content),
    isLocked: model.isLocked,
  );

  TopicLinkEntity _toLink(TopicLinkModel model) =>
      TopicLinkEntity(slug: model.slug, title: model.title);

  String? _blankToNull(String? value) =>
      (value == null || value.trim().isEmpty) ? null : value;
}
