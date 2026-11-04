import 'package:flutter/material.dart';

import '../../../../core/extensions/localization.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/text/typography.dart';

/// Bottom sheet listing every question; answered ones are filled.
class QuestionGridSheet extends StatelessWidget {
  const QuestionGridSheet({
    required this.answered,
    required this.currentIndex,
    required this.onSelect,
    super.key,
  });

  final List<bool> answered;
  final int currentIndex;
  final ValueChanged<int> onSelect;

  @override
  Widget build(BuildContext context) {
    final colors = context.color;
    final answeredCount = answered.where((a) => a).length;
    return SafeArea(
      child: Padding(
        padding: EdgeInsets.all(context.dimensions.space.s16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            HeadingLevel3Text(
              context.locale.answeredCount(
                '$answeredCount',
                '${answered.length}',
              ),
            ),
            SizedBox(height: context.dimensions.space.s12),
            Wrap(
              spacing: context.dimensions.space.s8,
              runSpacing: context.dimensions.space.s8,
              children: [
                for (final (i, isAnswered) in answered.indexed)
                  SizedBox.square(
                    dimension: context.dimensions.size.touch,
                    child: OutlinedButton(
                      style: OutlinedButton.styleFrom(
                        padding: EdgeInsets.zero,
                        backgroundColor: isAnswered
                            ? colors.status.success
                            : null,
                        foregroundColor: isAnswered
                            ? colors.text.onPrimary
                            : null,
                        side: BorderSide(
                          color: i == currentIndex
                              ? colors.primary.defaultValue
                              : colors.border.defaultValue,
                          width: i == currentIndex
                              ? context.dimensions.border.md
                              : context.dimensions.border.xs,
                        ),
                      ),
                      onPressed: () => onSelect(i),
                      child: Text('${i + 1}'),
                    ),
                  ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
