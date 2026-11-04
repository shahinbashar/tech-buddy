import '../../core/base/result.dart';
import '../../core/base/unit.dart';
import '../entities/study_entity.dart';
import '../failures/business_failure.dart';

abstract interface class StudyRepository {
  Future<Result<List<SubjectEntity>, BusinessFailure>> getSubjects();

  Future<Result<SubjectDetailEntity, BusinessFailure>> getSubject(String slug);

  Future<Result<TopicDetailEntity, BusinessFailure>> getTopic({
    required String subjectSlug,
    required String topicSlug,
  });

  Future<Result<Unit, BusinessFailure>> setTopicCompleted(
    String topicId, {
    required bool completed,
  });
}
