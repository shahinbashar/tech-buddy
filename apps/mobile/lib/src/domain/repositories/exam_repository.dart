import '../../core/base/result.dart';
import '../../core/base/unit.dart';
import '../entities/exam_entity.dart';
import '../failures/business_failure.dart';

abstract interface class ExamRepository {
  Future<Result<List<ExamCardEntity>, BusinessFailure>> getTodayExams();

  /// Starts (or resumes) an attempt; returns its id.
  Future<Result<String, BusinessFailure>> startExam(String examId);

  /// Creates a private practice set from the user's mistakes (or random
  /// questions) and starts it; returns the attempt id.
  Future<Result<String, BusinessFailure>> startPractice({
    required bool mistakesOnly,
    int questionCount = 10,
    String? topicId,
  });

  Future<Result<AttemptEntity, BusinessFailure>> getAttempt(String attemptId);

  Future<Result<Unit, BusinessFailure>> saveAnswer({
    required String attemptId,
    required String answerId,
    required String? optionId,
  });

  Future<Result<SubmittedAttemptEntity, BusinessFailure>> submit({
    required String attemptId,
    required Map<String, String?> answers,
  });

  Future<Result<LeaderboardEntity, BusinessFailure>> getLeaderboard(
    String examId,
  );
}
