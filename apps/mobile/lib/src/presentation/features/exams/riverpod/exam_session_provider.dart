import 'dart:async';

import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../../../../core/base/result.dart';
import '../../../../core/di/dependency_injection.dart';
import '../../../../core/extensions/result_extensions.dart';
import '../../../../domain/entities/exam_entity.dart';
import 'exam_session_state.dart';

part 'exam_session_provider.g.dart';

/// Thrown by [ExamSession.build] when the attempt is already submitted, so the
/// screen can go straight to the result.
class AttemptAlreadySubmitted implements Exception {
  const AttemptAlreadySubmitted(this.attempt);

  final SubmittedAttemptEntity attempt;
}

/// Runs one exam attempt:
/// - countdown corrected for device clock drift using the server time;
/// - answers saved one request at a time (no out-of-order writes);
/// - auto-submits exactly once when time runs out.
@riverpod
class ExamSession extends _$ExamSession {
  Timer? _timer;
  Duration _clockOffset = Duration.zero;
  Future<void> _saves = Future.value();
  bool _autoSubmitted = false;

  @override
  Future<ExamSessionState> build(String attemptId) async {
    ref.onDispose(() => _timer?.cancel());
    final attempt = (await ref.read(getAttemptUseCaseProvider).call(attemptId))
        .getOrThrow();
    final running = switch (attempt) {
      InProgressAttemptEntity() => attempt,
      SubmittedAttemptEntity() => throw AttemptAlreadySubmitted(attempt),
    };
    _clockOffset = running.serverTime.difference(DateTime.now());
    _timer = Timer.periodic(const Duration(seconds: 1), (_) => _tick());
    return ExamSessionState(
      attempt: running,
      answers: {
        for (final q in running.questions) q.answerId: q.selectedOptionId,
      },
      currentIndex: 0,
      secondsLeft: _secondsLeft(running),
    );
  }

  int _secondsLeft(InProgressAttemptEntity attempt) {
    final remaining = attempt.expiresAt
        .difference(DateTime.now().add(_clockOffset))
        .inSeconds;
    return remaining < 0 ? 0 : remaining;
  }

  void _tick() {
    final current = state.value;
    if (current == null || current.submitted != null) return;
    final secondsLeft = _secondsLeft(current.attempt);
    state = AsyncData(current.copyWith(secondsLeft: secondsLeft));
    if (secondsLeft == 0 && !_autoSubmitted) {
      _autoSubmitted = true;
      unawaited(submit());
    }
  }

  void goTo(int index) {
    final current = state.value;
    if (current == null || index < 0 || index >= current.total) return;
    state = AsyncData(current.copyWith(currentIndex: index));
  }

  void select(String? optionId) {
    final current = state.value;
    if (current == null || current.isSubmitting || current.submitted != null) {
      return;
    }
    final answerId = current.question.answerId;
    state = AsyncData(
      current.copyWith(answers: {...current.answers, answerId: optionId}),
    );
    // Chain saves so they reach the server in the order they were made.
    // A failed save is harmless: every answer is resent on submission.
    _saves = _saves.then(
      (_) => ref
          .read(saveAnswerUseCaseProvider)
          .call(attemptId: attemptId, answerId: answerId, optionId: optionId),
    );
  }

  Future<void> submit() async {
    final current = state.value;
    if (current == null || current.isSubmitting || current.submitted != null) {
      return;
    }
    state = AsyncData(current.copyWith(isSubmitting: true, clearError: true));
    await _saves;
    final result = await ref
        .read(submitAttemptUseCaseProvider)
        .call(attemptId: attemptId, answers: current.answers);
    if (!ref.mounted) return;
    final latest = state.value ?? current;
    state = AsyncData(switch (result) {
      Success(:final data) => latest.copyWith(
        isSubmitting: false,
        submitted: data,
      ),
      Error(:final error) => latest.copyWith(
        isSubmitting: false,
        submitError: error,
      ),
    });
    if (result is Success) _timer?.cancel();
  }
}
