import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/extensions/localization.dart';
import '../../../../domain/entities/study_entity.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/async_value_view.dart';
import '../../../core/widgets/markdown_content.dart';
import '../../../core/widgets/section_header.dart';
import '../../../core/widgets/text/typography.dart';
import '../riverpod/study_providers.dart';
import '../widgets/locked_topic_banner.dart';
import '../widgets/note_card.dart';
import '../widgets/study_navigation.dart';
import '../widgets/topic_actions.dart';
import '../widgets/topic_pager.dart';

/// A topic's overview, notes and subtopics, with completion and practice
/// actions.
class TopicDetailPage extends ConsumerWidget {
  const TopicDetailPage({
    required this.subjectSlug,
    required this.topicSlug,
    super.key,
  });

  final String subjectSlug;
  final String topicSlug;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final provider = topicDetailProvider(subjectSlug, topicSlug);
    final detail = ref.watch(provider);
    final loaded = detail.value;

    return Scaffold(
      appBar: AppBar(title: Text(loaded?.subjectName ?? '')),
      body: AsyncValueView(
        value: detail,
        onRetry: () => ref.invalidate(provider),
        builder: (topic) => _TopicDetailBody(topic: topic),
      ),
      bottomNavigationBar: loaded == null || loaded.isLocked
          ? null
          : TopicActions(topic: loaded),
    );
  }
}

class _TopicDetailBody extends StatelessWidget {
  const _TopicDetailBody({required this.topic});

  final TopicDetailEntity topic;

  @override
  Widget build(BuildContext context) {
    final space = context.dimensions.space;

    return ListView(
      padding: EdgeInsets.all(space.s16),
      children: [
        HeadingLevel1Text(topic.title),
        if (topic.description != null) ...[
          SizedBox(height: space.s4),
          BodySmallText.muted(topic.description!),
        ],
        SizedBox(height: space.s16),
        if (topic.isLocked) ...[
          const LockedTopicBanner(),
          SizedBox(height: space.s16),
        ],
        if (topic.content != null) ...[
          MarkdownContent(data: topic.content!),
          SizedBox(height: space.s16),
        ],
        if (topic.subtopics.isNotEmpty) ...[
          SectionHeader(title: context.locale.subtopics),
          for (final subtopic in topic.subtopics)
            _SubtopicLink(subjectSlug: topic.subjectSlug, subtopic: subtopic),
          SizedBox(height: space.s16),
        ],
        SectionHeader(title: context.locale.notesTitle),
        if (topic.notes.isEmpty) BodySmallText.muted(context.locale.noNotes),
        for (final note in topic.notes)
          Padding(
            padding: EdgeInsets.only(bottom: space.s12),
            child: NoteCard(note: note),
          ),
        SizedBox(height: space.s8),
        TopicPager(topic: topic),
      ],
    );
  }
}

class _SubtopicLink extends StatelessWidget {
  const _SubtopicLink({required this.subjectSlug, required this.subtopic});

  final String subjectSlug;
  final TopicLinkEntity subtopic;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: const Icon(Icons.subdirectory_arrow_right_rounded),
      title: Text(subtopic.title),
      trailing: const Icon(Icons.chevron_right_rounded),
      onTap: () =>
          context.openTopic(subjectSlug: subjectSlug, topicSlug: subtopic.slug),
    );
  }
}
