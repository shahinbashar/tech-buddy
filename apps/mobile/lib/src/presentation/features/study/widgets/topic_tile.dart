import 'package:flutter/material.dart';

import '../../../../core/extensions/localization.dart';
import '../../../../domain/entities/study_entity.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/status_chip.dart';
import 'study_navigation.dart';

/// One topic row in a subject's tree. Subtopics are indented under their
/// parent; the leading icon shows completion, the trailing chip premium.
class TopicTile extends StatelessWidget {
  const TopicTile({
    required this.subjectSlug,
    required this.topic,
    this.isChild = false,
    super.key,
  });

  final String subjectSlug;
  final TopicNodeEntity topic;
  final bool isChild;

  @override
  Widget build(BuildContext context) {
    final space = context.dimensions.space;
    final colors = context.color;

    return ListTile(
      contentPadding: EdgeInsetsDirectional.only(
        start: isChild ? context.dimensions.layout.treeIndent : space.s16,
        end: space.s16,
      ),
      onTap: () =>
          context.openTopic(subjectSlug: subjectSlug, topicSlug: topic.slug),
      leading: _CompletionIcon(isCompleted: topic.isCompleted),
      title: Text(topic.title),
      subtitle: topic.description == null
          ? null
          : Text(
              topic.description!,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
      trailing: topic.isPremium
          ? StatusChip(
              label: context.locale.premiumLocked,
              color: colors.status.warning,
              background: colors.status.warningTint,
              icon: topic.isLocked ? Icons.lock_outline_rounded : null,
            )
          : null,
    );
  }
}

class _CompletionIcon extends StatelessWidget {
  const _CompletionIcon({required this.isCompleted});

  final bool isCompleted;

  @override
  Widget build(BuildContext context) {
    final colors = context.color;

    return Icon(
      isCompleted ? Icons.check_circle_rounded : Icons.circle_outlined,
      color: isCompleted ? colors.status.success : colors.text.muted,
    );
  }
}
