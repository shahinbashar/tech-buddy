import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/extensions/localization.dart';
import '../../../../domain/entities/exam_entity.dart';
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
            for (final entry in board.top) _LeaderboardRow(entry: entry),
          ],
        ),
      ),
    );
  }
}

class _LeaderboardRow extends StatelessWidget {
  const _LeaderboardRow({required this.entry});

  final LeaderboardEntryEntity entry;

  /// Ranks that get the podium badge colour.
  static const int _podiumSize = 3;

  @override
  Widget build(BuildContext context) {
    final colors = context.color;
    final space = context.dimensions.space;
    final isPodium = entry.rank <= _podiumSize;

    return Container(
      margin: EdgeInsets.only(top: space.s4),
      padding: EdgeInsets.symmetric(horizontal: space.s8, vertical: space.s8),
      decoration: BoxDecoration(
        color: entry.isMe ? colors.primary.tint : null,
        borderRadius: BorderRadius.circular(context.dimensions.radius.small),
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: context.dimensions.size.iconSmall,
            backgroundColor: isPodium
                ? colors.status.warningTint
                : colors.background.canvas,
            child: Text(
              '${entry.rank}',
              style: context.textStyle.label.strong.copyWith(
                color: isPodium ? colors.status.warning : colors.text.muted,
              ),
            ),
          ),
          SizedBox(width: space.s12),
          Expanded(
            child: Text(
              entry.name,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ),
          Text(
            formatNumber(entry.obtainedMarks),
            style: context.textStyle.body.strong,
          ),
        ],
      ),
    );
  }
}
