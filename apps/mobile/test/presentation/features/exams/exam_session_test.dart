import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:tech_buddy/src/core/base/result.dart';
import 'package:tech_buddy/src/core/base/unit.dart';
import 'package:tech_buddy/src/core/di/dependency_injection.dart';
import 'package:tech_buddy/src/domain/entities/exam_entity.dart';
import 'package:tech_buddy/src/domain/failures/business_failure.dart';
import 'package:tech_buddy/src/domain/repositories/exam_repository.dart';
import 'package:tech_buddy/src/domain/use_cases/exam_use_case.dart';
import 'package:tech_buddy/src/presentation/features/exams/riverpod/exam_session_provider.dart';

const _questions = [
  AttemptQuestionEntity(
    answerId: 'a1',
    order: 0,
    text: 'Q1',
    subjectName: 'CS',
    options: [
      OptionEntity(id: 'o1', text: 'A'),
      OptionEntity(id: 'o2', text: 'B'),
    ],
  ),
  AttemptQuestionEntity(
    answerId: 'a2',
    order: 1,
    text: 'Q2',
    subjectName: 'CS',
    options: [
      OptionEntity(id: 'o3', text: 'C'),
      OptionEntity(id: 'o4', text: 'D'),
    ],
  ),
];

const _result = ExamResultEntity(
  totalQuestions: 2,
  correctCount: 1,
  incorrectCount: 0,
  unansweredCount: 1,
  obtainedMarks: 1,
  totalMarks: 2,
  percentage: 50,
  accuracy: 100,
  timeSpentSeconds: 30,
);

/// In-memory repository that records what the session sends.
class _FakeExamRepository implements ExamRepository {
  _FakeExamRepository({this.submitted = false});

  final bool submitted;
  final saves = <(String, String?)>[];
  Map<String, String?>? submittedAnswers;

  @override
  Future<Result<AttemptEntity, BusinessFailure>> getAttempt(
    String attemptId,
  ) async {
    final now = DateTime.now();
    if (submitted) {
      return const Success(
        SubmittedAttemptEntity(
          id: 'att',
          examId: 'exam',
          examTitle: 'Daily',
          isPractice: false,
          result: _result,
          questions: [],
        ),
      );
    }
    return Success(
      InProgressAttemptEntity(
        id: 'att',
        examId: 'exam',
        examTitle: 'Daily',
        isPractice: false,
        expiresAt: now.add(const Duration(minutes: 20)),
        serverTime: now,
        questions: _questions,
      ),
    );
  }

  @override
  Future<Result<Unit, BusinessFailure>> saveAnswer({
    required String attemptId,
    required String answerId,
    required String? optionId,
  }) async {
    // Make earlier saves slower: the session must still deliver them in order.
    await Future<void>.delayed(Duration(milliseconds: saves.isEmpty ? 30 : 1));
    saves.add((answerId, optionId));
    return const Success(Unit.value);
  }

  @override
  Future<Result<SubmittedAttemptEntity, BusinessFailure>> submit({
    required String attemptId,
    required Map<String, String?> answers,
  }) async {
    submittedAnswers = answers;
    return const Success(
      SubmittedAttemptEntity(
        id: 'att',
        examId: 'exam',
        examTitle: 'Daily',
        isPractice: false,
        result: _result,
        questions: [],
      ),
    );
  }

  @override
  dynamic noSuchMethod(Invocation invocation) => super.noSuchMethod(invocation);
}

ProviderContainer _container(_FakeExamRepository repo) {
  final container = ProviderContainer(
    // Mirrors bootstrap(): provider retry is disabled app-wide.
    retry: (_, _) => null,
    overrides: [
      getAttemptUseCaseProvider.overrideWith((ref) => GetAttemptUseCase(repo)),
      saveAnswerUseCaseProvider.overrideWith((ref) => SaveAnswerUseCase(repo)),
      submitAttemptUseCaseProvider.overrideWith(
        (ref) => SubmitAttemptUseCase(repo),
      ),
    ],
  );
  addTearDown(container.dispose);
  return container;
}

void main() {
  test('loads the attempt and starts the countdown', () async {
    final container = _container(_FakeExamRepository());
    final sub = container.listen(examSessionProvider('att'), (_, _) {});
    addTearDown(sub.close);
    final session = await container.read(examSessionProvider('att').future);

    expect(session.total, 2);
    expect(session.answeredCount, 0);
    expect(session.secondsLeft, inInclusiveRange(1190, 1200));
  });

  test(
    'saves answers in the order they were chosen and submits all answers',
    () async {
      final repo = _FakeExamRepository();
      final container = _container(repo);
      final sub = container.listen(examSessionProvider('att'), (_, _) {});
      addTearDown(sub.close);
      await container.read(examSessionProvider('att').future);
      final notifier = container.read(examSessionProvider('att').notifier);

      notifier.select('o1');
      notifier.select('o2');
      notifier.goTo(1);
      notifier.select('o4');
      notifier.select(null);
      await notifier.submit();

      expect(repo.saves, [
        ('a1', 'o1'),
        ('a1', 'o2'),
        ('a2', 'o4'),
        ('a2', null),
      ]);
      expect(repo.submittedAnswers, {'a1': 'o2', 'a2': null});
      final state = container.read(examSessionProvider('att')).value!;
      expect(state.submitted?.result.percentage, 50);
      expect(state.isSubmitting, isFalse);
    },
  );

  test('ignores answers after submission and cannot submit twice', () async {
    final repo = _FakeExamRepository();
    final container = _container(repo);
    final sub = container.listen(examSessionProvider('att'), (_, _) {});
    addTearDown(sub.close);
    await container.read(examSessionProvider('att').future);
    final notifier = container.read(examSessionProvider('att').notifier);

    await notifier.submit();
    notifier.select('o1');
    await notifier.submit();

    expect(repo.saves, isEmpty);
  });

  test(
    'reports an already-submitted attempt so the UI can show the result',
    () async {
      final container = _container(_FakeExamRepository(submitted: true));
      final sub = container.listen(examSessionProvider('att'), (_, _) {});
      addTearDown(sub.close);
      await expectLater(
        container.read(examSessionProvider('att').future),
        throwsA(isA<AttemptAlreadySubmitted>()),
      );
    },
  );
}
