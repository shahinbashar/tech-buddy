import 'package:dart_mappable/dart_mappable.dart';

part 'exam_model.mapper.dart';

@MappableClass(generateMethods: GenerateMethods.decode)
class ExamCardModel with ExamCardModelMappable {
  ExamCardModel({
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

  static const fromJson = ExamCardModelMapper.fromJson;
}

@MappableClass(generateMethods: GenerateMethods.decode)
class OptionModel with OptionModelMappable {
  OptionModel({required this.id, required this.text, this.textBn});

  final String id;
  final String text;
  final String? textBn;
}

/// One question of an attempt. Answer fields are present only after submission.
@MappableClass(generateMethods: GenerateMethods.decode)
class AttemptQuestionModel with AttemptQuestionModelMappable {
  AttemptQuestionModel({
    required this.answerId,
    required this.order,
    required this.text,
    required this.options,
    required this.subjectName,
    this.textBn,
    this.selectedOptionId,
    this.correctOptionId,
    this.explanation,
    this.isCorrect,
  });

  final String answerId;
  final int order;
  final String text;
  final String? textBn;
  final List<OptionModel> options;
  final String subjectName;
  final String? selectedOptionId;
  final String? correctOptionId;
  final String? explanation;
  final bool? isCorrect;
}

@MappableClass(generateMethods: GenerateMethods.decode)
class ExamRefModel with ExamRefModelMappable {
  ExamRefModel({required this.id, this.type});

  final String id;
  final String? type;
}

@MappableClass(generateMethods: GenerateMethods.decode)
class ResultModel with ResultModelMappable {
  ResultModel({
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

@MappableClass(generateMethods: GenerateMethods.decode)
class AttemptModel with AttemptModelMappable {
  AttemptModel({
    required this.id,
    required this.status,
    required this.exam,
    required this.examTitle,
    required this.expiresAt,
    required this.serverTime,
    required this.questions,
    this.result,
  });

  final String id;
  final String status;
  final ExamRefModel exam;
  final String examTitle;
  final DateTime expiresAt;
  final DateTime serverTime;
  final List<AttemptQuestionModel> questions;
  final ResultModel? result;

  static const fromJson = AttemptModelMapper.fromJson;
}

@MappableClass(generateMethods: GenerateMethods.decode)
class LeaderboardEntryModel with LeaderboardEntryModelMappable {
  LeaderboardEntryModel({
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

@MappableClass(generateMethods: GenerateMethods.decode)
class LeaderboardMeModel with LeaderboardMeModelMappable {
  LeaderboardMeModel({required this.rank, required this.topPercent});

  final int rank;
  final int topPercent;
}

@MappableClass(generateMethods: GenerateMethods.decode)
class LeaderboardModel with LeaderboardModelMappable {
  LeaderboardModel({required this.participants, required this.top, this.me});

  final int participants;
  final List<LeaderboardEntryModel> top;
  final LeaderboardMeModel? me;

  static const fromJson = LeaderboardModelMapper.fromJson;
}
