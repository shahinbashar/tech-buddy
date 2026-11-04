import 'package:flutter/material.dart';

import '../theme/theme.dart';

/// Small rounded label used for statuses (deadline, premium, correct…).
class StatusChip extends StatelessWidget {
  const StatusChip({
    required this.label,
    required this.color,
    required this.background,
    this.icon,
    super.key,
  });

  final String label;
  final Color color;
  final Color background;
  final IconData? icon;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: context.dimensions.space.s8,
        vertical: context.dimensions.space.s4,
      ),
      decoration: BoxDecoration(
        color: background,
        borderRadius: BorderRadius.circular(context.dimensions.radius.full),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            Icon(icon, size: context.dimensions.size.iconSmall, color: color),
            SizedBox(width: context.dimensions.space.s4),
          ],
          Text(
            label,
            style: Theme.of(context).textTheme.labelSmall
                ?.copyWith(color: color, fontWeight: FontWeight.w600),
          ),
        ],
      ),
    );
  }
}
