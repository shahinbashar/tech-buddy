import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/extensions/localization.dart';
import '../../../../domain/entities/exam_entity.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/section_header.dart';
import '../../../core/widgets/status_chip.dart';
import '../riverpod/exam_providers.dart';
import 'exam_navigation.dart';

/// Past papers to practise as whole sets. Renders nothing until loaded, or
/// when there are none, so the Exams tab never shows an empty section.
class PastPapersSection extends ConsumerWidget {
  const PastPapersSection({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final sources = ref.watch(practiceSourcesProvider).value;
    if (sources == null || sources.isEmpty) return const SizedBox.shrink();

    return Padding(
      padding: EdgeInsets.only(top: context.dimensions.space.s24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          SectionHeader(title: context.locale.pastPapers),
          Card(
            margin: EdgeInsets.zero,
            clipBehavior: Clip.antiAlias,
            child: Column(
              children: [
                for (final (index, source) in sources.indexed) ...[
                  if (index > 0) const Divider(height: 1),
                  _PastPaperTile(source: source),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _PastPaperTile extends ConsumerWidget {
  const _PastPaperTile({required this.source});

  final PracticeSourceEntity source;

  /// The API's largest practice set. Asking for it draws the whole paper:
  /// the server only uses as many questions as the paper has.
  static const int _wholePaper = 50;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final colors = context.color;
    final isLaunching = ref.watch(examLauncherProvider).isLoading;

    Future<void> start() async {
      final attemptId = await ref
          .read(examLauncherProvider.notifier)
          .startPractice(
            mistakesOnly: false,
            reference: source.reference,
            questionCount: _wholePaper,
          );
      if (attemptId != null && context.mounted) {
        context.openExamRunner(attemptId);
      }
    }

    return ListTile(
      enabled: !source.isLocked && !isLaunching,
      onTap: start,
      leading: Icon(
        Icons.history_edu_rounded,
        color: colors.primary.defaultValue,
      ),
      title: Text(source.reference),
      subtitle: Text(
        source.isPartial
            ? context.locale.pastPaperPartial(
                '${source.availableCount}',
                '${source.questionCount}',
              )
            : context.locale.pastPaperQuestions('${source.questionCount}'),
      ),
      trailing: source.isLocked
          ? StatusChip(
              label: context.locale.premiumLocked,
              color: colors.status.warning,
              background: colors.status.warningTint,
              icon: Icons.lock_outline_rounded,
            )
          : const Icon(Icons.chevron_right_rounded),
    );
  }
}
