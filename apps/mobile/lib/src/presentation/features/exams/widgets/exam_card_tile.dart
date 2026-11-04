import 'package:flutter/material.dart';

import '../../../../core/extensions/localization.dart';
import '../../../../domain/entities/exam_entity.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/text/typography.dart';
import 'exam_action_button.dart';

class ExamCardTile extends StatelessWidget {
  const ExamCardTile({required this.exam, super.key});

  final ExamCardEntity exam;

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.zero,
      child: Padding(
        padding: EdgeInsets.all(context.dimensions.space.s16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            HeadingLevel3Text(exam.title),
            SizedBox(height: context.dimensions.space.s4),
            LabelText.muted(
              context.locale.examMeta(
                '${exam.questionCount}',
                '${exam.durationMinutes}',
              ),
            ),
            SizedBox(height: context.dimensions.space.s12),
            SizedBox(
              width: double.infinity,
              child: ExamActionButton(exam: exam),
            ),
          ],
        ),
      ),
    );
  }
}
