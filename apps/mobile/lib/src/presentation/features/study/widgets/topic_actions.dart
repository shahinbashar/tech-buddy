import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/extensions/localization.dart';
import '../../../../domain/entities/study_entity.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/error_snack_bar_listener.dart';
import '../../exams/riverpod/exam_providers.dart';
import '../../exams/widgets/exam_navigation.dart';
import '../../exams/widgets/launch_error_listener.dart';
import '../riverpod/study_providers.dart';

/// Bottom bar on a topic: toggle completion and start a practice set on
/// this topic. Failures of either action surface as snackbars.
class TopicActions extends ConsumerWidget {
  const TopicActions({required this.topic, super.key});

  final TopicDetailEntity topic;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isSaving = ref.watch(topicCompletionProvider).isLoading;
    final isLaunching = ref.watch(examLauncherProvider).isLoading;
    final space = context.dimensions.space;

    void toggleCompleted() => ref
        .read(topicCompletionProvider.notifier)
        .setCompleted(topic, completed: !topic.isCompleted);

    Future<void> practise() async {
      final attemptId = await ref
          .read(examLauncherProvider.notifier)
          .startPractice(mistakesOnly: false, topicId: topic.id);
      if (attemptId != null && context.mounted) {
        context.openExamRunner(attemptId);
      }
    }

    return ErrorSnackBarListener(
      provider: topicCompletionProvider,
      child: LaunchErrorListener(
        child: SafeArea(
          child: Padding(
            padding: EdgeInsets.fromLTRB(
              space.s16,
              space.s8,
              space.s16,
              space.s8,
            ),
            child: Row(
              children: [
                // The theme makes buttons full-width, so each one needs a
                // bounded share of the row.
                Expanded(
                  flex: 3,
                  child: topic.isCompleted
                      ? OutlinedButton.icon(
                          onPressed: isSaving ? null : toggleCompleted,
                          icon: const Icon(Icons.check_circle_rounded),
                          label: Text(
                            context.locale.completedTapToUndo,
                            textAlign: TextAlign.center,
                          ),
                        )
                      : FilledButton.icon(
                          onPressed: isSaving ? null : toggleCompleted,
                          icon: const Icon(Icons.done_rounded),
                          label: Text(
                            context.locale.markComplete,
                            textAlign: TextAlign.center,
                          ),
                        ),
                ),
                SizedBox(width: space.s8),
                Expanded(
                  flex: 2,
                  child: Tooltip(
                    message: context.locale.practiseThisTopic,
                    child: FilledButton.tonalIcon(
                      onPressed: isLaunching ? null : practise,
                      icon: const Icon(Icons.bolt_rounded),
                      label: Text(context.locale.practise),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
