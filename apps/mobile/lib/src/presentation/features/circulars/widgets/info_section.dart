import 'package:flutter/material.dart';

import '../../../core/theme/theme.dart';
import '../../../core/widgets/text/typography.dart';

/// Labelled block of circular information; hidden when [value] is empty.
class InfoSection extends StatelessWidget {
  const InfoSection({required this.label, required this.value, super.key});

  final String label;
  final String? value;

  @override
  Widget build(BuildContext context) {
    final text = value?.trim();
    if (text == null || text.isEmpty) return const SizedBox.shrink();
    return Padding(
      padding: EdgeInsets.only(bottom: context.dimensions.space.s16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          LabelText.muted(label),
          SizedBox(height: context.dimensions.space.s4),
          Text(text),
        ],
      ),
    );
  }
}
