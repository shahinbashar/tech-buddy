import 'package:flutter/material.dart';

import '../../../../core/extensions/localization.dart';
import '../../../../domain/entities/exam_entity.dart';
import '../../../core/formatters/deadline_formatter.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/text/typography.dart';

class ResultSummaryCard extends StatelessWidget {
  const ResultSummaryCard({required this.result, super.key});

  final ExamResultEntity result;

  @override
  Widget build(BuildContext context) {
    final colors = context.color;
    return Card(
      margin: EdgeInsets.zero,
      child: Padding(
        padding: EdgeInsets.all(context.dimensions.space.s16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            LabelText.muted(context.locale.score),
            HeadingLevel1Text('${formatNumber(result.percentage)}%'),
            BodySmallText.muted(
              context.locale.marksOutOf(
                formatNumber(result.obtainedMarks),
                formatNumber(result.totalMarks),
              ),
            ),
            SizedBox(height: context.dimensions.space.s12),
            LinearProgressIndicator(
              value: (result.percentage / 100).clamp(0, 1),
            ),
            SizedBox(height: context.dimensions.space.s16),
            Row(
              children: [
                _Count(
                  label: context.locale.correct,
                  value: result.correctCount,
                  color: colors.status.success,
                ),
                _Count(
                  label: context.locale.incorrect,
                  value: result.incorrectCount,
                  color: colors.status.danger,
                ),
                _Count(
                  label: context.locale.unanswered,
                  value: result.unansweredCount,
                  color: colors.text.muted,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _Count extends StatelessWidget {
  const _Count({required this.label, required this.value, required this.color});

  final String label;
  final int value;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Column(
        children: [
          Text(
            '$value',
            style: Theme.of(context).textTheme.headlineSmall
                ?.copyWith(color: color, fontWeight: FontWeight.w700),
          ),
          LabelText.muted(label),
        ],
      ),
    );
  }
}
