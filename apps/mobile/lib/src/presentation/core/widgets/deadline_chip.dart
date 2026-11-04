import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../../../core/extensions/localization.dart';
import '../../../domain/entities/circular_entity.dart';
import '../formatters/deadline_formatter.dart';
import '../theme/theme.dart';
import 'status_chip.dart';

class DeadlineChip extends StatelessWidget {
  const DeadlineChip({required this.circular, super.key});

  final CircularEntity circular;

  @override
  Widget build(BuildContext context) {
    final info = deadlineInfo(
      status: circular.status,
      deadline: circular.applicationDeadline,
    );
    final colors = context.color.status;
    final (label, color, tint) = switch (info.kind) {
      DeadlineKind.closed => (
        context.locale.closed,
        context.color.text.muted,
        context.color.background.canvas,
      ),
      DeadlineKind.upcoming => (
        context.locale.opensOn(
          DateFormat.MMMd().format(circular.applicationStartDate),
        ),
        colors.information,
        colors.informationTint,
      ),
      DeadlineKind.closesToday => (
        context.locale.closesToday,
        colors.danger,
        colors.dangerTint,
      ),
      DeadlineKind.urgent => (
        context.locale.daysLeft('${info.daysLeft}'),
        colors.warning,
        colors.warningTint,
      ),
      DeadlineKind.open => (
        context.locale.daysLeft('${info.daysLeft}'),
        colors.success,
        colors.successTint,
      ),
    };
    return StatusChip(
      label: label,
      color: color,
      background: tint,
      icon: Icons.schedule,
    );
  }
}
