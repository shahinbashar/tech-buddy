import 'package:flutter/material.dart';

import '../../../../core/extensions/localization.dart';
import '../../../core/theme/theme.dart';

class StreakBanner extends StatelessWidget {
  const StreakBanner({required this.streak, super.key});

  final int streak;

  @override
  Widget build(BuildContext context) {
    final colors = context.color;
    return Container(
      padding: EdgeInsets.all(context.dimensions.space.s12),
      decoration: BoxDecoration(
        color: colors.status.warningTint,
        borderRadius: BorderRadius.circular(context.dimensions.radius.medium),
      ),
      child: Row(
        children: [
          Icon(Icons.local_fire_department, color: colors.status.warning),
          SizedBox(width: context.dimensions.space.s8),
          Text(
            '$streak ${context.locale.statStreak}',
            style: const TextStyle(fontWeight: FontWeight.w600),
          ),
        ],
      ),
    );
  }
}
