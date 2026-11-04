import '../../domain/entities/exam_entity.dart';
import '../models/exam_model.dart';

class ExamMapper {
  const ExamMapper();

  ExamCardEntity toCard(ExamCardModel model) => ExamCardEntity(
    id: model.id,
    title: model.title,
    questionCount: model.questionCount,
    durationMinutes: model.durationMinutes,
    negativeMarking: model.negativeMarking,
    isLocked: model.isLocked,
    canStart: model.canStart,
    inProgressAttemptId: model.inProgressAttemptId,
    lastAttemptId: model.lastAttemptId,
    bestPercentage: model.bestPercentage,
  );

  AttemptEntity toAttempt(AttemptModel model) {
    final isPractice = model.exam.type == 'PRACTICE';
    final questions = model.questions.map(_question).toList(growable: false);
    final result = model.result;
    if (model.status == 'SUBMITTED' && result != null) {
      return SubmittedAttemptEntity(
        id: model.id,
        examId: model.exam.id,
        examTitle: model.examTitle,
        isPractice: isPractice,
        result: _result(result),
        questions: [
          for (var i = 0; i < model.questions.length; i++)
            ReviewQuestionEntity(
              question: questions[i],
              correctOptionId: model.questions[i].correctOptionId ?? '',
              explanation: model.questions[i].explanation ?? '',
              isCorrect: model.questions[i].isCorrect,
            ),
        ],
      );
    }
    return InProgressAttemptEntity(
      id: model.id,
      examId: model.exam.id,
      examTitle: model.examTitle,
      isPractice: isPractice,
      expiresAt: model.expiresAt,
      serverTime: model.serverTime,
      questions: questions,
    );
  }

  LeaderboardEntity toLeaderboard(LeaderboardModel model) => LeaderboardEntity(
    participants: model.participants,
    top: [
      for (final e in model.top)
        LeaderboardEntryEntity(
          rank: e.rank,
          name: e.name,
          obtainedMarks: e.obtainedMarks,
          isMe: e.isMe,
        ),
    ],
    myRank: model.me?.rank,
    myTopPercent: model.me?.topPercent,
  );

  AttemptQuestionEntity _question(AttemptQuestionModel model) =>
      AttemptQuestionEntity(
        answerId: model.answerId,
        order: model.order,
        text: model.text,
        textBn: model.textBn,
        options: [
          for (final o in model.options)
            OptionEntity(id: o.id, text: o.text, textBn: o.textBn),
        ],
        subjectName: model.subjectName,
        selectedOptionId: model.selectedOptionId,
      );

  ExamResultEntity _result(ResultModel model) => ExamResultEntity(
    totalQuestions: model.totalQuestions,
    correctCount: model.correctCount,
    incorrectCount: model.incorrectCount,
    unansweredCount: model.unansweredCount,
    obtainedMarks: model.obtainedMarks,
    totalMarks: model.totalMarks,
    percentage: model.percentage,
    accuracy: model.accuracy,
    timeSpentSeconds: model.timeSpentSeconds,
  );
}
