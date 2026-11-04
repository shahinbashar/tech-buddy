import 'package:flutter/material.dart';

import '../../../../core/extensions/localization.dart';
import '../../../../domain/entities/dashboard_entity.dart';
import '../../../core/formatters/deadline_formatter.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/stat_tile.dart';

class OverviewGrid extends StatelessWidget {
  const OverviewGrid({required this.overview, super.key});

  final DashboardOverviewEntity overview;

  @override
  Widget build(BuildContext context) {
    final tiles = [
      StatTile(
        label: context.locale.statExamsTaken,
        value: '${overview.examsTaken}',
        icon: Icons.assignment_outlined,
      ),
      StatTile(
        label: context.locale.statAverageScore,
        value: '${formatNumber(overview.averageScore)}%',
        icon: Icons.emoji_events_outlined,
      ),
      StatTile(
        label: context.locale.statAccuracy,
        value: '${formatNumber(overview.accuracy)}%',
        icon: Icons.track_changes,
      ),
      StatTile(
        label: context.locale.statTopicsDone,
        value: '${overview.completedTopics}/${overview.totalTopics}',
        icon: Icons.menu_book_outlined,
      ),
    ];
    return GridView.count(
      crossAxisCount: 2,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      mainAxisSpacing: context.dimensions.space.s8,
      crossAxisSpacing: context.dimensions.space.s8,
      childAspectRatio: 2.2,
      children: tiles,
    );
  }
}
