import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/extensions/localization.dart';
import '../../../../domain/entities/exam_entity.dart';
import '../riverpod/exam_providers.dart';
import 'exam_navigation.dart';

/// Start, resume or review an exam depending on its state.
class ExamActionButton extends ConsumerWidget {
  const ExamActionButton({required this.exam, super.key});

  final ExamCardEntity exam;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isLaunching = ref.watch(examLauncherProvider).isLoading;
    final inProgress = exam.inProgressAttemptId;
    if (inProgress != null) {
      return FilledButton(
        onPressed: () => context.openExamRunner(inProgress),
        child: Text(context.locale.resumeExam),
      );
    }
    if (exam.canStart) {
      return FilledButton(
        onPressed: isLaunching
            ? null
            : () async {
                final attemptId = await ref
                    .read(examLauncherProvider.notifier)
                    .startExam(exam.id);
                if (attemptId != null && context.mounted) {
                  context.openExamRunner(attemptId);
                }
              },
        child: Text(context.locale.startExam),
      );
    }
    final lastAttempt = exam.lastAttemptId;
    if (lastAttempt != null) {
      return OutlinedButton(
        onPressed: () => context.openExamResult(lastAttempt),
        child: Text(context.locale.viewResult),
      );
    }
    return OutlinedButton(
      onPressed: null,
      child: Text(context.locale.premiumLocked),
    );
  }
}
