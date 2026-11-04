import 'package:flutter/material.dart';

import '../../../../core/extensions/localization.dart';

class ConfirmSubmitDialog extends StatelessWidget {
  const ConfirmSubmitDialog({required this.unanswered, super.key});

  final int unanswered;

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(context.locale.submitConfirmTitle),
      content: Text(context.locale.submitConfirmBody('$unanswered')),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(false),
          child: Text(context.locale.keepWorking),
        ),
        FilledButton(
          onPressed: () => Navigator.of(context).pop(true),
          child: Text(context.locale.submit),
        ),
      ],
    );
  }
}
