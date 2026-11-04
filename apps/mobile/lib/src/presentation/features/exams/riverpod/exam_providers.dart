import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../../../../core/base/result.dart';
import '../../../../core/di/dependency_injection.dart';
import '../../../../core/extensions/result_extensions.dart';
import '../../../../domain/entities/exam_entity.dart';
import '../../../../domain/failures/business_failure.dart';

part 'exam_providers.g.dart';

@riverpod
Future<List<ExamCardEntity>> todayExams(Ref ref) async {
  return (await ref.watch(getTodayExamsUseCaseProvider).call()).getOrThrow();
}

/// A submitted attempt for the result screen.
@riverpod
Future<SubmittedAttemptEntity> attemptResult(Ref ref, String attemptId) async {
  final attempt = (await ref.watch(getAttemptUseCaseProvider).call(attemptId))
      .getOrThrow();
  return switch (attempt) {
    SubmittedAttemptEntity() => attempt,
    InProgressAttemptEntity() => throw StateError(
      'Attempt $attemptId is still in progress',
    ),
  };
}

@riverpod
Future<LeaderboardEntity> leaderboard(Ref ref, String examId) async {
  return (await ref.watch(getLeaderboardUseCaseProvider).call(examId))
      .getOrThrow();
}

/// Starts exams and practice sets. The state is the in-flight request, so
/// buttons can show progress; the result is the attempt id to open.
@riverpod
class ExamLauncher extends _$ExamLauncher {
  @override
  AsyncValue<String?> build() => const AsyncData(null);

  Future<String?> startExam(String examId) =>
      _run(() => ref.read(startExamUseCaseProvider).call(examId));

  Future<String?> startPractice({
    required bool mistakesOnly,
    String? topicId,
  }) => _run(
    () => ref
        .read(startPracticeUseCaseProvider)
        .call(mistakesOnly: mistakesOnly, topicId: topicId),
  );

  Future<String?> _run(
    Future<Result<String, BusinessFailure>> Function() action,
  ) async {
    if (state.isLoading) return null;
    state = const AsyncLoading();
    final result = await action();
    if (!ref.mounted) return null;
    state = switch (result) {
      Success(:final data) => AsyncData(data),
      Error(:final error) => AsyncError(error, StackTrace.current),
    };
    return state.value;
  }
}
