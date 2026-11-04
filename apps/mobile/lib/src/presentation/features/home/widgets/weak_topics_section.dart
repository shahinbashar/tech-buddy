import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/extensions/localization.dart';
import '../../../../domain/entities/dashboard_entity.dart';
import '../../../core/formatters/deadline_formatter.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/section_header.dart';
import '../../../core/widgets/status_chip.dart';
import '../../exams/riverpod/exam_providers.dart';
import '../../exams/widgets/exam_navigation.dart';
import '../../study/widgets/study_navigation.dart';

class WeakTopicsSection extends ConsumerWidget {
  const WeakTopicsSection({required this.topics, super.key});

  final List<WeakTopicEntity> topics;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final colors = context.color;
    final isLaunching = ref.watch(examLauncherProvider).isLoading;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SectionHeader(title: context.locale.weakTopics),
        if (topics.isEmpty)
          Text(
            context.locale.noWeakTopics,
            style: TextStyle(color: colors.text.muted),
          ),
        for (final topic in topics)
          ListTile(
            contentPadding: EdgeInsets.zero,
            // Tapping the topic opens its notes for revision.
            onTap: topic.subjectSlug == null || topic.topicSlug == null
                ? null
                : () => context.openTopic(
                    subjectSlug: topic.subjectSlug!,
                    topicSlug: topic.topicSlug!,
                  ),
            title: Text(topic.topicName),
            subtitle: Text(topic.subjectName),
            leading: StatusChip(
              label: '${formatNumber(topic.accuracy)}%',
              color: colors.status.danger,
              background: colors.status.dangerTint,
            ),
            trailing: TextButton(
              onPressed: isLaunching
                  ? null
                  : () async {
                      final attemptId = await ref
                          .read(examLauncherProvider.notifier)
                          .startPractice(
                            mistakesOnly: false,
                            topicId: topic.topicId,
                          );
                      if (attemptId != null && context.mounted) {
                        context.openExamRunner(attemptId);
                      }
                    },
              child: Text(context.locale.practise),
            ),
          ),
      ],
    );
  }
}
