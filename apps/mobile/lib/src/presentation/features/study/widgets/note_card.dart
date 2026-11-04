import 'package:flutter/material.dart';

import '../../../../core/extensions/localization.dart';
import '../../../../domain/entities/study_entity.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/markdown_content.dart';
import '../../../core/widgets/status_chip.dart';
import '../../../core/widgets/text/typography.dart';

/// A study note: title, summary and its Markdown body, or a premium chip
/// when the body is locked.
class NoteCard extends StatelessWidget {
  const NoteCard({required this.note, super.key});

  final NoteEntity note;

  @override
  Widget build(BuildContext context) {
    final colors = context.color;
    final space = context.dimensions.space;

    return Card(
      margin: EdgeInsets.zero,
      child: Padding(
        padding: EdgeInsets.all(space.s16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(child: HeadingLevel3Text(note.title)),
                if (note.isLocked)
                  StatusChip(
                    label: context.locale.premiumLocked,
                    color: colors.status.warning,
                    background: colors.status.warningTint,
                    icon: Icons.lock_outline_rounded,
                  ),
              ],
            ),
            if (note.summary != null) ...[
              SizedBox(height: space.s4),
              BodySmallText.muted(note.summary!),
            ],
            if (note.content != null) ...[
              SizedBox(height: space.s12),
              MarkdownContent(data: note.content!),
            ],
          ],
        ),
      ),
    );
  }
}
