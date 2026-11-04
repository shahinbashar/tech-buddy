import 'package:flutter/material.dart';

import '../../../../core/extensions/localization.dart';
import '../../../../domain/entities/exam_entity.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/text/typography.dart';
import 'option_tile.dart';

class QuestionCard extends StatelessWidget {
  const QuestionCard({
    required this.question,
    required this.index,
    required this.total,
    required this.selectedOptionId,
    required this.onSelect,
    super.key,
  });

  final AttemptQuestionEntity question;
  final int index;
  final int total;
  final String? selectedOptionId;
  final ValueChanged<String?> onSelect;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Expanded(
              child: LabelText.muted(
                context.locale.questionOf('${index + 1}', '$total'),
              ),
            ),
            LabelText.muted(question.subjectName),
          ],
        ),
        SizedBox(height: context.dimensions.space.s8),
        HeadingLevel3Text(question.text),
        if (question.textBn != null) ...[
          SizedBox(height: context.dimensions.space.s4),
          BodySmallText.muted(question.textBn!),
        ],
        SizedBox(height: context.dimensions.space.s16),
        for (final (i, option) in question.options.indexed)
          Padding(
            padding: EdgeInsets.only(bottom: context.dimensions.space.s8),
            child: OptionTile(
              option: option,
              index: i,
              selected: selectedOptionId == option.id,
              // Tapping the selected option again clears it.
              onTap: () =>
                  onSelect(selectedOptionId == option.id ? null : option.id),
            ),
          ),
      ],
    );
  }
}
