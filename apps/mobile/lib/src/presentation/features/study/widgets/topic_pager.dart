import 'package:flutter/material.dart';

import '../../../../core/extensions/localization.dart';
import '../../../../domain/entities/study_entity.dart';
import '../../../core/theme/theme.dart';
import 'study_navigation.dart';

/// Previous / next topic in the subject's reading order.
class TopicPager extends StatelessWidget {
  const TopicPager({required this.topic, super.key});

  final TopicDetailEntity topic;

  @override
  Widget build(BuildContext context) {
    final previous = topic.previous;
    final next = topic.next;
    if (previous == null && next == null) return const SizedBox.shrink();

    return Row(
      children: [
        Expanded(
          child: previous == null
              ? const SizedBox.shrink()
              : _PagerButton(
                  label: context.locale.previous,
                  link: previous,
                  subjectSlug: topic.subjectSlug,
                  isNext: false,
                ),
        ),
        SizedBox(width: context.dimensions.space.s8),
        Expanded(
          child: next == null
              ? const SizedBox.shrink()
              : _PagerButton(
                  label: context.locale.next,
                  link: next,
                  subjectSlug: topic.subjectSlug,
                  isNext: true,
                ),
        ),
      ],
    );
  }
}

class _PagerButton extends StatelessWidget {
  const _PagerButton({
    required this.label,
    required this.link,
    required this.subjectSlug,
    required this.isNext,
  });

  final String label;
  final TopicLinkEntity link;
  final String subjectSlug;
  final bool isNext;

  @override
  Widget build(BuildContext context) {
    final space = context.dimensions.space;

    return OutlinedButton(
      style: OutlinedButton.styleFrom(
        padding: EdgeInsets.symmetric(
          horizontal: space.s12,
          vertical: space.s8,
        ),
      ),
      onPressed: () =>
          context.replaceTopic(subjectSlug: subjectSlug, topicSlug: link.slug),
      child: Column(
        crossAxisAlignment: isNext
            ? CrossAxisAlignment.end
            : CrossAxisAlignment.start,
        children: [
          Text(label, style: Theme.of(context).textTheme.labelSmall),
          Text(link.title, maxLines: 1, overflow: TextOverflow.ellipsis),
        ],
      ),
    );
  }
}
