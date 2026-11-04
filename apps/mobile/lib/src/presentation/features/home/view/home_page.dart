import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/extensions/localization.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/async_value_view.dart';
import '../../../core/widgets/section_header.dart';
import '../../../core/widgets/text/typography.dart';
import '../../exams/riverpod/exam_providers.dart';
import '../../exams/widgets/exam_card_tile.dart';
import '../../exams/widgets/launch_error_listener.dart';
import '../riverpod/dashboard_provider.dart';
import '../widgets/closing_soon_section.dart';
import '../widgets/overview_grid.dart';
import '../widgets/streak_banner.dart';
import '../widgets/weak_topics_section.dart';

/// Dashboard: today's exam first (the daily habit), then progress and
/// what to revise.
class HomePage extends ConsumerWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final dashboard = ref.watch(dashboardProvider);
    final exams = ref.watch(todayExamsProvider);
    final gap = SizedBox(height: context.dimensions.space.s16);

    return LaunchErrorListener(
      child: RefreshIndicator(
        onRefresh: () async {
          ref
            ..invalidate(todayExamsProvider)
            ..invalidate(dashboardProvider);
          await ref.read(dashboardProvider.future);
        },
        child: ListView(
          padding: EdgeInsets.all(context.dimensions.space.s16),
          children: [
            HeadingLevel1Text(context.locale.welcomeBack),
            BodySmallText.muted(context.locale.dashboardSubtitle),
            gap,
            SectionHeader(title: context.locale.todaysExam),
            AsyncValueView(
              value: exams,
              onRetry: () => ref.invalidate(todayExamsProvider),
              builder: (items) => items.isEmpty
                  ? Text(context.locale.noExamToday)
                  : ExamCardTile(exam: items.first),
            ),
            gap,
            AsyncValueView(
              value: dashboard,
              onRetry: () => ref.invalidate(dashboardProvider),
              builder: (data) => Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  ClosingSoonSection(items: data.closingSoon),
                  if (data.closingSoon.isNotEmpty) gap,
                  if (data.overview.currentStreak > 0) ...[
                    StreakBanner(streak: data.overview.currentStreak),
                    gap,
                  ],
                  OverviewGrid(overview: data.overview),
                  gap,
                  WeakTopicsSection(topics: data.weakTopics),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
