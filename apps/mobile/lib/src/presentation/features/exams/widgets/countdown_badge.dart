import 'package:flutter/material.dart';

import '../../../core/formatters/deadline_formatter.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/status_chip.dart';

class CountdownBadge extends StatelessWidget {
  const CountdownBadge({required this.secondsLeft, super.key});

  final int secondsLeft;

  @override
  Widget build(BuildContext context) {
    final status = context.color.status;
    final (color, tint) = secondsLeft <= 60
        ? (status.danger, status.dangerTint)
        : secondsLeft <= 300
        ? (status.warning, status.warningTint)
        : (context.color.primary.defaultValue, context.color.primary.tint);
    return Semantics(
      label: 'Time remaining ${formatClock(secondsLeft)}',
      liveRegion: secondsLeft <= 60,
      child: StatusChip(
        label: formatClock(secondsLeft),
        color: color,
        background: tint,
        icon: Icons.timer_outlined,
      ),
    );
  }
}
