import 'package:flutter/material.dart';

import '../../../../core/extensions/localization.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/text/typography.dart';

/// Explains why a premium topic's notes are hidden.
class LockedTopicBanner extends StatelessWidget {
  const LockedTopicBanner({super.key});

  @override
  Widget build(BuildContext context) {
    final colors = context.color;
    final space = context.dimensions.space;

    return Container(
      padding: EdgeInsets.all(space.s16),
      decoration: BoxDecoration(
        color: colors.status.warningTint,
        borderRadius: BorderRadius.circular(context.dimensions.radius.medium),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(Icons.lock_outline_rounded, color: colors.status.warning),
          SizedBox(width: space.s12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                HeadingLevel3Text(context.locale.lockedTopicTitle),
                SizedBox(height: space.s4),
                BodySmallText(context.locale.lockedTopicBody),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
