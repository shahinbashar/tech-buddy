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

    return Column(
      children: [
        _PracticeOptionCard(
          icon: Icons.replay_rounded,
          title: context.locale.practiseMistakes,
          subtitle: context.locale.practiseMistakesHint,
          onTap: isLaunching ? null : () => start(mistakesOnly: true),
        ),
        SizedBox(height: context.dimensions.space.s8),
        _PracticeOptionCard(
          icon: Icons.shuffle_rounded,
          title: context.locale.randomPractice,
          subtitle: context.locale.randomPracticeHint,
          onTap: isLaunching ? null : () => start(mistakesOnly: false),
        ),
      ],
    );
  }
}

class _PracticeOptionCard extends StatelessWidget {
  const _PracticeOptionCard({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.onTap,
  });

  final IconData icon;
  final String title;
  final String subtitle;

  /// Null while a practice set is being created, which disables the card.
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.zero,
      clipBehavior: Clip.antiAlias,
      child: ListTile(
        enabled: onTap != null,
        onTap: onTap,
        leading: CircleAvatar(
          backgroundColor: context.color.primary.tint,
          child: Icon(icon, color: context.color.primary.defaultValue),
        ),
        title: Text(title),
        subtitle: Text(subtitle),
        trailing: const Icon(Icons.chevron_right_rounded),
      ),
    );
  }
}
