import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/extensions/localization.dart';
import '../../../core/theme/theme.dart';
import '../riverpod/exam_providers.dart';
import 'exam_navigation.dart';

/// "Practise my mistakes" and "Random practice" shortcuts.
class PracticeActions extends ConsumerWidget {
  const PracticeActions({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isLaunching = ref.watch(examLauncherProvider).isLoading;
    Future<void> start({required bool mistakesOnly}) async {
      final attemptId = await ref
          .read(examLauncherProvider.notifier)
          .startPractice(mistakesOnly: mistakesOnly);
      if (attemptId != null && context.mounted) {
        context.openExamRunner(attemptId);
      }
    }

    return Row(
      children: [
        Expanded(
          child: FilledButton.tonalIcon(
            onPressed: isLaunching ? null : () => start(mistakesOnly: true),
            icon: const Icon(Icons.replay),
            label: Text(
              context.locale.practiseMistakes,
              textAlign: TextAlign.center,
            ),
          ),
        ),
        SizedBox(width: context.dimensions.space.s8),
        Expanded(
          child: OutlinedButton.icon(
            onPressed: isLaunching ? null : () => start(mistakesOnly: false),
            icon: const Icon(Icons.shuffle),
            label: Text(
              context.locale.randomPractice,
              textAlign: TextAlign.center,
            ),
          ),
        ),
      ],
    );
  }
}
