import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:tech_buddy/src/core/base/result.dart';
import 'package:tech_buddy/src/core/base/unit.dart';
import 'package:tech_buddy/src/core/di/dependency_injection.dart';
import 'package:tech_buddy/src/domain/entities/study_entity.dart';
import 'package:tech_buddy/src/domain/failures/business_failure.dart';
import 'package:tech_buddy/src/domain/repositories/study_repository.dart';
import 'package:tech_buddy/src/presentation/features/study/riverpod/study_providers.dart';

const _subject = SubjectEntity(
  id: 's1',
  slug: 'ict',
  name: 'ICT',
  topicCount: 1,
  completedCount: 0,
);

/// Serves one topic whose completion flag the toggles flip, and counts
/// topic loads so tests can see the provider refetch.
class _FakeStudyRepository implements StudyRepository {
  bool completed = false;
  bool failNextToggle = false;
  int topicLoads = 0;

  @override
  Future<Result<List<SubjectEntity>, BusinessFailure>> getSubjects() async =>
      const Success([_subject]);

  @override
  Future<Result<SubjectDetailEntity, BusinessFailure>> getSubject(
    String slug,
  ) async => const Success(SubjectDetailEntity(subject: _subject, topics: []));

  @override
  Future<Result<TopicDetailEntity, BusinessFailure>> getTopic({
    required String subjectSlug,
    required String topicSlug,
  }) async {
    topicLoads++;
    return Success(
      TopicDetailEntity(
        id: 't1',
        slug: topicSlug,
        title: 'Networking',
        subjectSlug: subjectSlug,
        subjectName: 'ICT',
        isLocked: false,
        isCompleted: completed,
        notes: const [],
      ),
    );
  }

  @override
  Future<Result<Unit, BusinessFailure>> setTopicCompleted(
    String topicId, {
    required bool completed,
  }) async {
    if (failNextToggle) {
      failNextToggle = false;
      return const Error(BusinessFailure.unreachable());
    }
    this.completed = completed;
    return const Success(Unit.value);
  }
}

void main() {
  late _FakeStudyRepository repository;
  late ProviderContainer container;
  final topic = topicDetailProvider('ict', 'networking');

  setUp(() {
    repository = _FakeStudyRepository();
    container = ProviderContainer(
      retry: (_, _) => null,
      overrides: [studyRepositoryProvider.overrideWithValue(repository)],
    );
    // Keep the topic alive and observed, as the open page would.
    container.listen(topic, (_, _) {});
  });

  tearDown(() => container.dispose());

  test('completing a topic saves it and refreshes the topic', () async {
    final before = await container.read(topic.future);
    expect(before.isCompleted, isFalse);

    await container
        .read(topicCompletionProvider.notifier)
        .setCompleted(before, completed: true);

    final after = await container.read(topic.future);
    expect(after.isCompleted, isTrue);
    expect(repository.topicLoads, 2);
    expect(container.read(topicCompletionProvider).hasError, isFalse);
  });

  test('a failed toggle surfaces the failure and keeps the topic', () async {
    final before = await container.read(topic.future);
    repository.failNextToggle = true;

    await container
        .read(topicCompletionProvider.notifier)
        .setCompleted(before, completed: true);

    expect(
      container.read(topicCompletionProvider).error,
      isA<BusinessFailure>(),
    );
    expect(repository.topicLoads, 1);
    expect((await container.read(topic.future)).isCompleted, isFalse);
  });
}
