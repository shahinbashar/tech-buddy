import '../../../../domain/entities/exam_entity.dart';

/// Immutable state of a running exam.
class ExamSessionState {
  const ExamSessionState({
    required this.attempt,
    required this.answers,
    required this.currentIndex,
    required this.secondsLeft,
    this.isSubmitting = false,
    this.submitted,
    this.submitError,
  });

  final InProgressAttemptEntity attempt;

  /// answerId → selected option id (null = unanswered).
  final Map<String, String?> answers;
  final int currentIndex;
  final int secondsLeft;
  final bool isSubmitting;

  /// Set once the server has scored the attempt; the screen then
  /// navigates to the result.
  final SubmittedAttemptEntity? submitted;
  final Object? submitError;

  AttemptQuestionEntity get question => attempt.questions[currentIndex];
  int get total => attempt.questions.length;
  int get answeredCount => answers.values.where((v) => v != null).length;
  bool get isLast => currentIndex == total - 1;

  ExamSessionState copyWith({
    Map<String, String?>? answers,
    int? currentIndex,
    int? secondsLeft,
    bool? isSubmitting,
    SubmittedAttemptEntity? submitted,
    Object? submitError,
    bool clearError = false,
  }) {
    return ExamSessionState(
      attempt: attempt,
      answers: answers ?? this.answers,
      currentIndex: currentIndex ?? this.currentIndex,
      secondsLeft: secondsLeft ?? this.secondsLeft,
      isSubmitting: isSubmitting ?? this.isSubmitting,
      submitted: submitted ?? this.submitted,
      submitError: clearError ? null : (submitError ?? this.submitError),
    );
  }
}
