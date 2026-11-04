/// A published exam as listed to the candidate.
class ExamCardEntity {
  const ExamCardEntity({
    required this.id,
    required this.title,
    required this.questionCount,
    required this.durationMinutes,
    required this.negativeMarking,
    required this.isLocked,
    required this.canStart,
    this.inProgressAttemptId,
    this.lastAttemptId,
    this.bestPercentage,
  });

  final String id;
  final String title;
  final int questionCount;
  final int durationMinutes;
  final double negativeMarking;
  final bool isLocked;
  final bool canStart;
  final String? inProgressAttemptId;
  final String? lastAttemptId;
  final double? bestPercentage;
}

class OptionEntity {
  const OptionEntity({required this.id, required this.text, this.textBn});

  final String id;
  final String text;
  final String? textBn;
}

/// A question as shown during an attempt (no answer data).
class AttemptQuestionEntity {
  const AttemptQuestionEntity({
    required this.answerId,
    required this.order,
    required this.text,
    required this.options,
    required this.subjectName,
    this.textBn,
    this.selectedOptionId,
  });

  final String answerId;
  final int order;
  final String text;
  final String? textBn;
  final List<OptionEntity> options;
  final String subjectName;
  final String? selectedOptionId;
}

/// A reviewed question after submission.
class ReviewQuestionEntity {
  const ReviewQuestionEntity({
    required this.question,
    required this.correctOptionId,
    required this.explanation,
    this.isCorrect,
  });

  final AttemptQuestionEntity question;
  final String correctOptionId;
  final String explanation;

  /// null when unanswered.
  final bool? isCorrect;
}

class ExamResultEntity {
  const ExamResultEntity({
    required this.totalQuestions,
    required this.correctCount,
    required this.incorrectCount,
    required this.unansweredCount,
    required this.obtainedMarks,
    required this.totalMarks,
    required this.percentage,
    required this.accuracy,
    required this.timeSpentSeconds,
  });

  final int totalQuestions;
  final int correctCount;
  final int incorrectCount;
  final int unansweredCount;
  final double obtainedMarks;
  final double totalMarks;
  final double percentage;
  final double accuracy;
  final int timeSpentSeconds;
}

/// An attempt is either in progress (questions only) or submitted
/// (result + review).
sealed class AttemptEntity {
  const AttemptEntity({
    required this.id,
    required this.examId,
    required this.examTitle,
    required this.isPractice,
  });

  final String id;
  final String examId;
  final String examTitle;
  final bool isPractice;
}

final class InProgressAttemptEntity extends AttemptEntity {
  const InProgressAttemptEntity({
    required super.id,
    required super.examId,
    required super.examTitle,
    required super.isPractice,
    required this.expiresAt,
    required this.serverTime,
    required this.questions,
  });

  final DateTime expiresAt;
  final DateTime serverTime;
  final List<AttemptQuestionEntity> questions;
}

final class SubmittedAttemptEntity extends AttemptEntity {
  const SubmittedAttemptEntity({
    required super.id,
    required super.examId,
    required super.examTitle,
    required super.isPractice,
    required this.result,
    required this.questions,
  });

  final ExamResultEntity result;
  final List<ReviewQuestionEntity> questions;
}

class LeaderboardEntryEntity {
  const LeaderboardEntryEntity({
    required this.rank,
    required this.name,
    required this.obtainedMarks,
    required this.isMe,
  });

  final int rank;
  final String name;
  final double obtainedMarks;
  final bool isMe;
}

class LeaderboardEntity {
  const LeaderboardEntity({
    required this.participants,
    required this.top,
    this.myRank,
    this.myTopPercent,
  });

  final int participants;
  final List<LeaderboardEntryEntity> top;
  final int? myRank;
  final int? myTopPercent;
}

/// A past paper the user can practise as a whole set.
class PracticeSourceEntity {
  const PracticeSourceEntity({
    required this.reference,
    required this.questionCount,
    required this.availableCount,
  });

  final String reference;
  final int questionCount;

  /// Questions this user may draw: all with premium, free ones otherwise.
  final int availableCount;

  /// Every question in the paper is premium and the user has no access.
  bool get isLocked => availableCount == 0;

  /// Some, but not all, of the paper is available on the user's plan.
  bool get isPartial => !isLocked && availableCount < questionCount;
}
