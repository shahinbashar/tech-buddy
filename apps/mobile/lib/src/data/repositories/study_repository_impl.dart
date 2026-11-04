import '../../core/base/result.dart';
import '../../core/base/unit.dart';
import '../../domain/entities/study_entity.dart';
import '../../domain/failures/business_failure.dart';
import '../../domain/repositories/study_repository.dart';
import '../base/repository.dart';
import '../mappers/study_mapper.dart';
import '../models/study_model.dart';
import '../services/network/rest_client.dart';

final class StudyRepositoryImpl extends Repository implements StudyRepository {
  StudyRepositoryImpl({required this.remote, required super.crashReporter});

  final RestClient remote;
  static const _mapper = StudyMapper();

  @override
  Future<Result<List<SubjectEntity>, BusinessFailure>> getSubjects() {
    return asyncGuard(() async {
      final response = await remote.subjects();
      return [
        for (final item in response.data as List<dynamic>)
          _mapper.toSubject(
            SubjectModel.fromJson(item as Map<String, dynamic>),
          ),
      ];
    });
  }

  @override
  Future<Result<SubjectDetailEntity, BusinessFailure>> getSubject(String slug) {
    return asyncGuard(() async {
      final response = await remote.subjectDetail(slug);
      return _mapper.toSubjectDetail(
        SubjectDetailModel.fromJson(response.data as Map<String, dynamic>),
      );
    });
  }

  @override
  Future<Result<TopicDetailEntity, BusinessFailure>> getTopic({
    required String subjectSlug,
    required String topicSlug,
  }) {
    return asyncGuard(() async {
      final response = await remote.topicDetail(subjectSlug, topicSlug);
      return _mapper.toTopicDetail(
        TopicDetailModel.fromJson(response.data as Map<String, dynamic>),
      );
    });
  }

  @override
  Future<Result<Unit, BusinessFailure>> setTopicCompleted(
    String topicId, {
    required bool completed,
  }) {
    return asyncGuard(() async {
      if (completed) {
        await remote.completeTopic(topicId);
      } else {
        await remote.uncompleteTopic(topicId);
      }
      return Unit.value;
    });
  }
}
