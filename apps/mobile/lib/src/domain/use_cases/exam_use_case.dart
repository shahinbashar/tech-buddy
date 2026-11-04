import '../../core/base/result.dart';
import '../../core/base/unit.dart';
import '../entities/exam_entity.dart';
import '../failures/business_failure.dart';
import '../repositories/exam_repository.dart';

final class GetTodayExamsUseCase {
  const GetTodayExamsUseCase(this.repository);

  final ExamRepository repository;

  Future<Result<List<ExamCardEntity>, BusinessFailure>> call() =>
      repository.getTodayExams();
}

final class StartExamUseCase {
  const StartExamUseCase(this.repository);

  final ExamRepository repository;

  Future<Result<String, BusinessFailure>> call(String examId) =>
      repository.startExam(examId);
}

final class StartPracticeUseCase {
  const StartPracticeUseCase(this.repository);

  final ExamRepository repository;

  Future<Result<String, BusinessFailure>> call({
    required bool mistakesOnly,
    String? topicId,
    String? reference,
    int questionCount = 10,
  }) => repository.startPractice(
    mistakesOnly: mistakesOnly,
    topicId: topicId,
    reference: reference,
    questionCount: questionCount,
  );
}

final class GetPracticeSourcesUseCase {
  const GetPracticeSourcesUseCase(this.repository);

  final ExamRepository repository;

  Future<Result<List<PracticeSourceEntity>, BusinessFailure>> call() =>
      repository.getPracticeSources();
}

final class GetAttemptUseCase {
  const GetAttemptUseCase(this.repository);

  final ExamRepository repository;

  Future<Result<AttemptEntity, BusinessFailure>> call(String attemptId) =>
      repository.getAttempt(attemptId);
}

final class SaveAnswerUseCase {
  const SaveAnswerUseCase(this.repository);

  final ExamRepository repository;

  Future<Result<Unit, BusinessFailure>> call({
    required String attemptId,
    required String answerId,
    required String? optionId,
  }) => repository.saveAnswer(
    attemptId: attemptId,
    answerId: answerId,
    optionId: optionId,
  );
}

final class SubmitAttemptUseCase {
  const SubmitAttemptUseCase(this.repository);

  final ExamRepository repository;

  Future<Result<SubmittedAttemptEntity, BusinessFailure>> call({
    required String attemptId,
    required Map<String, String?> answers,
  }) => repository.submit(attemptId: attemptId, answers: answers);
}

final class GetLeaderboardUseCase {
  const GetLeaderboardUseCase(this.repository);

  final ExamRepository repository;

  Future<Result<LeaderboardEntity, BusinessFailure>> call(String examId) =>
      repository.getLeaderboard(examId);
}
