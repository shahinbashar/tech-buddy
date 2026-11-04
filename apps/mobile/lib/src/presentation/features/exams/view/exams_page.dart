import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/extensions/localization.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/async_value_view.dart';
import '../../../core/widgets/section_header.dart';
import '../riverpod/exam_providers.dart';
import '../widgets/exam_card_tile.dart';
import '../widgets/launch_error_listener.dart';
import '../widgets/past_papers_section.dart';
import '../widgets/practice_actions.dart';

class ExamsPage extends ConsumerWidget {
  const ExamsPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final exams = ref.watch(todayExamsProvider);
    return LaunchErrorListener(
      child: RefreshIndicator(
        onRefresh: () {
          ref.invalidate(practiceSourcesProvider);
          return ref.refresh(todayExamsProvider.future);
        },
        child: ListView(
          padding: EdgeInsets.all(context.dimensions.space.s16),
          children: [
            SectionHeader(title: context.locale.todaysExam),
            AsyncValueView(
              value: exams,
              onRetry: () => ref.invalidate(todayExamsProvider),
              builder: (items) => items.isEmpty
                  ? Text(context.locale.noExamToday)
                  : Column(
                      children: [
                        for (final exam in items)
                          Padding(
                            padding: EdgeInsets.only(
                              bottom: context.dimensions.space.s12,
                            ),
                            child: ExamCardTile(exam: exam),
                          ),
                      ],
                    ),
            ),
            SizedBox(height: context.dimensions.space.s24),
            SectionHeader(title: context.locale.practise),
            const PracticeActions(),
            const PastPapersSection(),
          ],
        ),
      ),
    );
  }
}
