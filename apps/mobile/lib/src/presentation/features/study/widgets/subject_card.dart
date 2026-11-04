import 'package:flutter/material.dart';

import '../../../../core/extensions/localization.dart';
import '../../../../domain/entities/study_entity.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/text/typography.dart';
import 'study_navigation.dart';
import 'study_progress_bar.dart';

class SubjectCard extends StatelessWidget {
  const SubjectCard({required this.subject, super.key});

  final SubjectEntity subject;

  @override
  Widget build(BuildContext context) {
    final space = context.dimensions.space;

    // A bare InkWell is not announced as a button; screen readers need it.
    return Semantics(
      button: true,
      child: Card(
        margin: EdgeInsets.zero,
        clipBehavior: Clip.antiAlias,
        child: InkWell(
          onTap: () => context.openSubject(subject.slug),
          child: Padding(
            padding: EdgeInsets.all(space.s16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(child: HeadingLevel3Text(subject.name)),
                    const Icon(Icons.chevron_right_rounded),
                  ],
                ),
                if (subject.nameBn != null)
                  BodySmallText.muted(subject.nameBn!),
                if (subject.description != null) ...[
                  SizedBox(height: space.s8),
                  BodySmallText(
                    subject.description!,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
                SizedBox(height: space.s12),
                StudyProgressBar(
                  value: subject.progress,
                  label: context.locale.topicsProgress(
                    '${subject.completedCount}',
                    '${subject.topicCount}',
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
