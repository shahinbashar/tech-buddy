import '../../core/base/result.dart';
import '../../core/base/unit.dart';
import '../../domain/entities/exam_entity.dart';
import '../../domain/failures/business_failure.dart';
import '../../domain/repositories/exam_repository.dart';
import '../base/repository.dart';
import '../mappers/exam_mapper.dart';
import '../models/exam_model.dart';
import '../services/network/rest_client.dart';

final class ExamRepositoryImpl extends Repository implements ExamRepository {
  ExamRepositoryImpl({required this.remote, required super.crashReporter});

  final RestClient remote;
  static const _mapper = ExamMapper();

  @override
  Future<Result<List<ExamCardEntity>, BusinessFailure>> getTodayExams() {
    return asyncGuard(() async {
      final response = await remote.todayExams();
      return [
        for (final item in response.data as List<dynamic>)
          _mapper.toCard(ExamCardModel.fromJson(item as Map<String, dynamic>)),
      ];
    });
  }

  @override
  Future<Result<String, BusinessFailure>> startExam(String examId) {
    return asyncGuard(() async {
      final response = await remote.startExam(examId);
      return (response.data as Map<String, dynamic>)['attemptId'] as String;
    });
  }

  @override
  Future<Result<String, BusinessFailure>> startPractice({
    required bool mistakesOnly,
    int questionCount = 10,
    String? topicId,
    String? reference,
  }) {
    return asyncGuard(() async {
      final response = await remote.startPractice({
        'mode': mistakesOnly ? 'mistakes' : 'random',
        'questionCount': questionCount,
        'topicId': ?topicId,
        'reference': ?reference,
      });
      return (response.data as Map<String, dynamic>)['attemptId'] as String;
    });
  }

  @override
  Future<Result<List<PracticeSourceEntity>, BusinessFailure>>
  getPracticeSources() {
    return asyncGuard(() async {
      final response = await remote.practiceSources();
      return [
        for (final item in response.data as List<dynamic>)
          _mapper.toPracticeSource(
            PracticeSourceModel.fromJson(item as Map<String, dynamic>),
          ),
      ];
    });
  }

  @override
  Future<Result<AttemptEntity, BusinessFailure>> getAttempt(String attemptId) {
    return asyncGuard(() async {
      final response = await remote.attempt(attemptId);
      return _mapper.toAttempt(
        AttemptModel.fromJson(response.data as Map<String, dynamic>),
      );
    });
  }

  @override
  Future<Result<Unit, BusinessFailure>> saveAnswer({
    required String attemptId,
    required String answerId,
    required String? optionId,
  }) {
    return asyncGuard(() async {
      await remote.saveAnswer(attemptId, {
        'answerId': answerId,
        'selectedOptionId': optionId,
      });
      return Unit.value;
    });
  }

  @override
  Future<Result<SubmittedAttemptEntity, BusinessFailure>> submit({
    required String attemptId,
    required Map<String, String?> answers,
  }) {
    return asyncGuard(() async {
      final response = await remote.submitAttempt(attemptId, {
        'answers': [
          for (final entry in answers.entries)
            {'answerId': entry.key, 'selectedOptionId': entry.value},
        ],
      });
      final attempt = _mapper.toAttempt(
        AttemptModel.fromJson(response.data as Map<String, dynamic>),
      );
      return attempt as SubmittedAttemptEntity;
    });
  }

  @override
  Future<Result<LeaderboardEntity, BusinessFailure>> getLeaderboard(
    String examId,
  ) {
    return asyncGuard(() async {
      final response = await remote.leaderboard(examId);
      return _mapper.toLeaderboard(
        LeaderboardModel.fromJson(response.data as Map<String, dynamic>),
      );
    });
  }
}
