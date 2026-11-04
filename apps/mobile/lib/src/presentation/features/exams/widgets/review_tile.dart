import 'package:flutter/material.dart';

import '../../../../core/extensions/localization.dart';
import '../../../../domain/entities/exam_entity.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/status_chip.dart';
import '../../../core/widgets/text/typography.dart';
import 'option_tile.dart';

/// A reviewed question: the candidate's pick, the correct answer and the
/// explanation.
class ReviewTile extends StatelessWidget {
  const ReviewTile({required this.review, required this.index, super.key});

  final ReviewQuestionEntity review;
  final int index;

  @override
  Widget build(BuildContext context) {
    final colors = context.color;
    final question = review.question;
    final (label, color, tint) = switch (review.isCorrect) {
      true => (
        context.locale.correct,
        colors.status.success,
        colors.status.successTint,
      ),
      false => (
        context.locale.incorrect,
        colors.status.danger,
        colors.status.dangerTint,
      ),
      null => (
        context.locale.unanswered,
        colors.text.muted,
        colors.background.canvas,
      ),
    };
    return Card(
      margin: EdgeInsets.zero,
      child: Padding(
        padding: EdgeInsets.all(context.dimensions.space.s16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                LabelText('Q${index + 1}'),
                SizedBox(width: context.dimensions.space.s8),
                StatusChip(label: label, color: color, background: tint),
              ],
            ),
            SizedBox(height: context.dimensions.space.s8),
            Text(
              question.text,
              style: const TextStyle(fontWeight: FontWeight.w600),
            ),
            SizedBox(height: context.dimensions.space.s12),
            for (final (i, option) in question.options.indexed)
              Padding(
                padding: EdgeInsets.only(bottom: context.dimensions.space.s8),
                child: OptionTile(
                  option: option,
                  index: i,
                  selected: option.id == question.selectedOptionId,
                  highlight: option.id == review.correctOptionId
                      ? true
                      : option.id == question.selectedOptionId
                      ? false
                      : null,
                ),
              ),
            Container(
              width: double.infinity,
              padding: EdgeInsets.all(context.dimensions.space.s12),
              decoration: BoxDecoration(
                color: colors.status.informationTint,
                borderRadius: BorderRadius.circular(
                  context.dimensions.radius.small,
                ),
              ),
              child: Text(
                '${context.locale.explanation}: ${review.explanation}',
              ),
            ),
          ],
        ),
      ),
    );
  }
}
