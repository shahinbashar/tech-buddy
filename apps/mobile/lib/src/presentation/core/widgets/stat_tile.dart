import 'package:flutter/material.dart';

import '../theme/theme.dart';
import 'text/typography.dart';

class StatTile extends StatelessWidget {
  const StatTile({
    required this.label,
    required this.value,
    required this.icon,
    super.key,
  });

  final String label;
  final String value;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.zero,
      child: Padding(
        padding: EdgeInsets.all(context.dimensions.space.s12),
        child: Row(
          children: [
            CircleAvatar(
              radius: context.dimensions.size.iconLarge * 0.75,
              backgroundColor: context.color.primary.tint,
              child: Icon(
                icon,
                size: context.dimensions.size.iconMedium,
                color: context.color.primary.defaultValue,
              ),
            ),
            SizedBox(width: context.dimensions.space.s12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  HeadingLevel3Text(value, maxLines: 1),
                  LabelText.muted(
                    label,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
