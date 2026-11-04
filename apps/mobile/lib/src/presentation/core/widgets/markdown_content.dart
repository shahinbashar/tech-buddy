import 'package:flutter/material.dart';
import 'package:flutter_markdown_plus/flutter_markdown_plus.dart';

import '../theme/theme.dart';
import '../utils/external_links.dart';

/// Renders study-note Markdown (GitHub flavour: tables, code, quotes) with
/// the app's tokens. Raw HTML is not rendered, matching the web app; links
/// open in the browser.
class MarkdownContent extends StatelessWidget {
  const MarkdownContent({required this.data, super.key});

  final String data;

  @override
  Widget build(BuildContext context) {
    final colors = context.color;
    final dimensions = context.dimensions;
    final base = MarkdownStyleSheet.fromTheme(Theme.of(context));

    return MarkdownBody(
      data: data,
      selectable: true,
      onTapLink: (_, href, _) {
        if (href != null) openExternal(href);
      },
      styleSheet: base.copyWith(
        code: base.code?.copyWith(backgroundColor: colors.background.canvas),
        codeblockDecoration: BoxDecoration(
          color: colors.background.canvas,
          borderRadius: BorderRadius.circular(dimensions.radius.small),
        ),
        codeblockPadding: EdgeInsets.all(dimensions.space.s12),
        blockquoteDecoration: BoxDecoration(
          color: colors.primary.tint,
          borderRadius: BorderRadius.circular(dimensions.radius.small),
        ),
        blockquotePadding: EdgeInsets.all(dimensions.space.s12),
        tableBorder: TableBorder.all(color: colors.border.defaultValue),
        tableCellsPadding: EdgeInsets.all(dimensions.space.s8),
      ),
    );
  }
}
