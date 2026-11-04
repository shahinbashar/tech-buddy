import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/extensions/localization.dart';
import '../../../../domain/entities/study_entity.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/async_value_view.dart';
import '../../../core/widgets/text/typography.dart';
import '../riverpod/study_providers.dart';
import '../widgets/study_progress_bar.dart';
import '../widgets/topic_tile.dart';

/// A subject's topic tree with the user's progress.
class SubjectDetailPage extends ConsumerWidget {
  const SubjectDetailPage({required this.subjectSlug, super.key});

  final String subjectSlug;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final provider = subjectDetailProvider(subjectSlug);
    final detail = ref.watch(provider);

    return Scaffold(
      appBar: AppBar(title: Text(detail.value?.subject.name ?? '')),
      body: AsyncValueView(
        value: detail,
        onRetry: () => ref.invalidate(provider),
        builder: (data) => RefreshIndicator(
          onRefresh: () => ref.refresh(provider.future),
          child: _SubjectDetailBody(detail: data),
        ),
      ),
    );
  }
}

class _SubjectDetailBody extends StatelessWidget {
  const _SubjectDetailBody({required this.detail});

  final SubjectDetailEntity detail;

  @override
  Widget build(BuildContext context) {
    final subject = detail.subject;
    final space = context.dimensions.space;

    return ListView(
      padding: EdgeInsets.symmetric(vertical: space.s16),
      children: [
        Padding(
          padding: EdgeInsets.symmetric(horizontal: space.s16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (subject.nameBn != null) BodySmallText.muted(subject.nameBn!),
              if (subject.description != null) ...[
                SizedBox(height: space.s8),
                BodySmallText(subject.description!),
              ],
              SizedBox(height: space.s12),
              StudyProgressBar(
                value: subject.progress,
                label: context.locale.topicsProgress(
                  '${subject.completedCount}',
                  '${subject.topicCount}',
                ),
              ),
            ],
          ),
        ),
        SizedBox(height: space.s8),
        for (final topic in detail.topics) ...[
          TopicTile(subjectSlug: subject.slug, topic: topic),
          for (final child in topic.children)
            TopicTile(subjectSlug: subject.slug, topic: child, isChild: true),
        ],
      ],
    );
  }
}
