import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/extensions/localization.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/async_value_view.dart';
import '../../../core/widgets/text/typography.dart';
import '../riverpod/study_providers.dart';
import '../widgets/subject_card.dart';

/// The Study tab: every published subject with the user's progress.
class StudyPage extends ConsumerWidget {
  const StudyPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final subjects = ref.watch(subjectsProvider);

    return AsyncValueView(
      value: subjects,
      onRetry: () => ref.invalidate(subjectsProvider),
      builder: (items) => RefreshIndicator(
        onRefresh: () => ref.refresh(subjectsProvider.future),
        child: ListView.separated(
          padding: EdgeInsets.all(context.dimensions.space.s16),
          itemCount: items.length + 1,
          separatorBuilder: (_, _) =>
              SizedBox(height: context.dimensions.space.s12),
          itemBuilder: (context, index) => index == 0
              ? BodySmallText.muted(
                  items.isEmpty
                      ? context.locale.noSubjects
                      : context.locale.studyIntro,
                )
              : SubjectCard(subject: items[index - 1]),
        ),
      ),
    );
  }
}
