import 'package:flutter/material.dart';

import '../../../core/theme/theme.dart';
import '../../../core/widgets/text/typography.dart';

/// A labelled progress bar for topic completion.
class StudyProgressBar extends StatelessWidget {
  const StudyProgressBar({required this.value, required this.label, super.key});

  /// From 0 to 1.
  final double value;
  final String label;

  @override
  Widget build(BuildContext context) {
    final dimensions = context.dimensions;

    return Row(
      children: [
        // The text label already says the progress. Left in the tree, the
        // indicator's node would absorb the surrounding card's text and
        // leave the card's button unlabelled.
        Expanded(
          child: ExcludeSemantics(
            child: ClipRRect(
              borderRadius: BorderRadius.circular(dimensions.radius.full),
              child: LinearProgressIndicator(
                value: value.clamp(0, 1),
                minHeight: dimensions.space.s8,
                // Tinted rather than canvas, so the empty track stays
                // visible on canvas-coloured pages as well as cards.
                backgroundColor: context.color.primary.tint,
              ),
            ),
          ),
        ),
        SizedBox(width: dimensions.space.s12),
        LabelText.muted(label),
      ],
    );
  }
}
