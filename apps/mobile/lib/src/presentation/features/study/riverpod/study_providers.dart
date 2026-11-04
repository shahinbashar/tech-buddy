import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../../../../core/base/result.dart';
import '../../../../core/di/dependency_injection.dart';
import '../../../../core/extensions/result_extensions.dart';
import '../../../../domain/entities/study_entity.dart';
import '../../home/riverpod/dashboard_provider.dart';

part 'study_providers.g.dart';

@riverpod
Future<List<SubjectEntity>> subjects(Ref ref) async {
  return (await ref.watch(getSubjectsUseCaseProvider).call()).getOrThrow();
}

@riverpod
Future<SubjectDetailEntity> subjectDetail(Ref ref, String slug) async {
  return (await ref.watch(getSubjectDetailUseCaseProvider).call(slug))
      .getOrThrow();
}

@riverpod
Future<TopicDetailEntity> topicDetail(
  Ref ref,
  String subjectSlug,
  String topicSlug,
) async {
  return (await ref
          .watch(getTopicDetailUseCaseProvider)
          .call(subjectSlug: subjectSlug, topicSlug: topicSlug))
      .getOrThrow();
}

/// Marks a topic complete or not, then refreshes every view that shows
/// progress: the topic, its subject, the subject list and the dashboard.
///
/// State is the last outcome, so the page can show a busy button and a
/// snackbar on failure.
@riverpod
class TopicCompletion extends _$TopicCompletion {
  @override
  AsyncValue<void> build() => const AsyncData(null);

  Future<void> setCompleted(
    TopicDetailEntity topic, {
    required bool completed,
  }) async {
    if (state.isLoading) return;
    state = const AsyncLoading();
    final result = await ref
        .read(setTopicCompletedUseCaseProvider)
        .call(topic.id, completed: completed);
    if (!ref.mounted) return;
    switch (result) {
      case Success():
        ref
          ..invalidate(topicDetailProvider(topic.subjectSlug, topic.slug))
          ..invalidate(subjectDetailProvider(topic.subjectSlug))
          ..invalidate(subjectsProvider)
          ..invalidate(dashboardProvider);
        state = const AsyncData(null);
      case Error(:final error):
        state = AsyncError(error, StackTrace.current);
    }
  }
}
