import 'package:flutter_test/flutter_test.dart';
import 'package:tech_buddy/src/data/mappers/exam_mapper.dart';
import 'package:tech_buddy/src/data/models/exam_model.dart';
import 'package:tech_buddy/src/domain/entities/exam_entity.dart';

Map<String, dynamic> _question({bool reviewed = false}) => {
  'answerId': 'ans1',
  'order': 0,
  'text': 'Which data structure is LIFO?',
  'textBn': null,
  'options': [
    {'id': 'o1', 'text': 'Queue', 'textBn': null},
    {'id': 'o2', 'text': 'Stack', 'textBn': null},
  ],
  'selectedOptionId': 'o1',
  'subjectName': 'Computer Science',
  if (reviewed) ...{
    'correctOptionId': 'o2',
    'isCorrect': false,
    'explanation': 'Stack is LIFO.',
  },
};

void main() {
  const mapper = ExamMapper();
  final base = {
    'id': 'att1',
    'exam': {'id': 'exam1', 'title': 'Daily', 'type': 'DAILY'},
    'examTitle': 'Daily Exam',
    'startedAt': '2026-11-04T10:00:00.000Z',
    'expiresAt': '2026-11-04T10:20:00.000Z',
    'serverTime': '2026-11-04T10:01:00.000Z',
    'totalQuestions': 1,
  };

  test('maps an in-progress attempt without answer data', () {
    final attempt = mapper.toAttempt(
      AttemptModel.fromJson({
        ...base,
        'status': 'IN_PROGRESS',
        'questions': [_question()],
      }),
    );

    expect(attempt, isA<InProgressAttemptEntity>());
    final running = attempt as InProgressAttemptEntity;
    expect(running.questions.single.options.map((o) => o.text), [
      'Queue',
      'Stack',
    ]);
    expect(running.questions.single.selectedOptionId, 'o1');
    expect(
      running.expiresAt.difference(running.serverTime),
      const Duration(minutes: 19),
    );
  });

  test('maps a submitted attempt with result and review', () {
    final attempt = mapper.toAttempt(
      AttemptModel.fromJson({
        ...base,
        'exam': {'id': 'exam1', 'type': 'PRACTICE'},
        'status': 'SUBMITTED',
        'submittedAt': '2026-11-04T10:05:00.000Z',
        'result': {
          'totalQuestions': 1,
          'correctCount': 0,
          'incorrectCount': 1,
          'unansweredCount': 0,
          'obtainedMarks': 0,
          'totalMarks': 1,
          'percentage': 0,
          'timeSpentSeconds': 300,
          'accuracy': 0,
        },
        'questions': [_question(reviewed: true)],
      }),
    );

    expect(attempt, isA<SubmittedAttemptEntity>());
    final submitted = attempt as SubmittedAttemptEntity;
    expect(submitted.isPractice, isTrue);
    expect(submitted.result.incorrectCount, 1);
    expect(submitted.questions.single.correctOptionId, 'o2');
    expect(submitted.questions.single.isCorrect, isFalse);
    expect(submitted.questions.single.explanation, 'Stack is LIFO.');
  });

  test('past papers are locked, partial or fully available', () {
    PracticeSourceEntity source(int available) => mapper.toPracticeSource(
      PracticeSourceModel.fromJson({
        'reference': 'Sample paper',
        'questionCount': 10,
        'availableCount': available,
      }),
    );

    expect(source(0).isLocked, isTrue);
    expect(source(0).isPartial, isFalse);
    expect(source(4).isPartial, isTrue);
    expect(source(10).isLocked, isFalse);
    expect(source(10).isPartial, isFalse);
  });
}
