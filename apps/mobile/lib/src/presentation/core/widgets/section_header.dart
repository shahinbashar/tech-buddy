import 'package:flutter/material.dart';

import '../theme/theme.dart';
import 'text/typography.dart';

class SectionHeader extends StatelessWidget {
  const SectionHeader({required this.title, this.trailing, super.key});

  final String title;
  final Widget? trailing;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(bottom: context.dimensions.space.s8),
      child: Row(
        children: [
          Expanded(child: HeadingLevel3Text(title)),
          ?trailing,
        ],
      ),
    );
  }
}
