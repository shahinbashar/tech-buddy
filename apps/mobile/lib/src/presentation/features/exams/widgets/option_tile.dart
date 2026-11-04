import 'package:flutter/material.dart';

import '../../../../domain/entities/exam_entity.dart';
import '../../../core/theme/theme.dart';

const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

/// One answer option. [highlight] colours it after submission (review mode).
class OptionTile extends StatelessWidget {
  const OptionTile({
    required this.option,
    required this.index,
    required this.selected,
    this.onTap,
    this.highlight,
    super.key,
  });

  final OptionEntity option;
  final int index;
  final bool selected;
  final VoidCallback? onTap;

  /// null = neutral, true = correct answer, false = wrong pick.
  final bool? highlight;

  @override
  Widget build(BuildContext context) {
    final colors = context.color;
    final borderColor = switch (highlight) {
      true => colors.status.success,
      false => colors.status.danger,
      null =>
        selected ? colors.primary.defaultValue : colors.border.defaultValue,
    };
    final background = switch (highlight) {
      true => colors.status.successTint,
      false => colors.status.dangerTint,
      null => selected ? colors.primary.tint : colors.background.surface,
    };
    return Semantics(
      selected: selected,
      button: onTap != null,
      child: Material(
        color: background,
        shape: RoundedRectangleBorder(
          side: BorderSide(
            color: borderColor,
            width: selected
                ? context.dimensions.border.md
                : context.dimensions.border.xs,
          ),
          borderRadius: BorderRadius.circular(context.dimensions.radius.medium),
        ),
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(context.dimensions.radius.medium),
          child: Padding(
            padding: EdgeInsets.all(context.dimensions.space.s12),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CircleAvatar(
                  radius: context.dimensions.size.iconSmall,
                  backgroundColor: selected
                      ? colors.primary.defaultValue
                      : colors.background.canvas,
                  child: Text(
                    optionLetters[index],
                    style: TextStyle(
                      color: selected
                          ? colors.text.onPrimary
                          : colors.text.muted,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                SizedBox(width: context.dimensions.space.s12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(option.text),
                      if (option.textBn != null)
                        Text(
                          option.textBn!,
                          style: TextStyle(color: colors.text.muted),
                        ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
