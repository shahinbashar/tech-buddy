import '../../core/base/result.dart';
import '../../core/base/unit.dart';
import '../entities/study_entity.dart';
import '../failures/business_failure.dart';
import '../repositories/study_repository.dart';

final class GetSubjectsUseCase {
  const GetSubjectsUseCase(this.repository);

  final StudyRepository repository;

  Future<Result<List<SubjectEntity>, BusinessFailure>> call() =>
      repository.getSubjects();
}

final class GetSubjectDetailUseCase {
  const GetSubjectDetailUseCase(this.repository);

  final StudyRepository repository;

  Future<Result<SubjectDetailEntity, BusinessFailure>> call(String slug) =>
      repository.getSubject(slug);
}

final class GetTopicDetailUseCase {
  const GetTopicDetailUseCase(this.repository);

  final StudyRepository repository;

  Future<Result<TopicDetailEntity, BusinessFailure>> call({
    required String subjectSlug,
    required String topicSlug,
  }) => repository.getTopic(subjectSlug: subjectSlug, topicSlug: topicSlug);
}

final class SetTopicCompletedUseCase {
  const SetTopicCompletedUseCase(this.repository);

  final StudyRepository repository;

  Future<Result<Unit, BusinessFailure>> call(
    String topicId, {
    required bool completed,
  }) => repository.setTopicCompleted(topicId, completed: completed);
}
