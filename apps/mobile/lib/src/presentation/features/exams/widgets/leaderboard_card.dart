import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/extensions/localization.dart';
import '../../../core/formatters/deadline_formatter.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/text/typography.dart';
import '../riverpod/exam_providers.dart';

/// Merit list for an exam; renders nothing if it can't be loaded.
class LeaderboardCard extends ConsumerWidget {
  const LeaderboardCard({required this.examId, super.key});

  final String examId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final board = ref.watch(leaderboardProvider(examId)).value;
    if (board == null) return const SizedBox.shrink();
    final colors = context.color;
    return Card(
      margin: EdgeInsets.zero,
      child: Padding(
        padding: EdgeInsets.all(context.dimensions.space.s16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            HeadingLevel3Text(context.locale.meritList),
            if (board.myRank != null) ...[
              SizedBox(height: context.dimensions.space.s4),
              LabelText(
                context.locale.yourRank(
                  '${board.myRank}',
                  '${board.participants}',
                  '${board.myTopPercent}',
                ),
              ),
            ],
            SizedBox(height: context.dimensions.space.s8),
            for (final entry in board.top)
              ListTile(
                dense: true,
                contentPadding: EdgeInsets.zero,
                tileColor: entry.isMe ? colors.primary.tint : null,
                leading: CircleAvatar(
                  radius: context.dimensions.size.iconSmall,
                  backgroundColor: entry.rank <= 3
                      ? colors.status.warningTint
                      : colors.background.canvas,
                  child: Text('${entry.rank}'),
                ),
                title: Text(entry.name),
                trailing: Text(formatNumber(entry.obtainedMarks)),
              ),
          ],
        ),
      ),
    );
  }
}
