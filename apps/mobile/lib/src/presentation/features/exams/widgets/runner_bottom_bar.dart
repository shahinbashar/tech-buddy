import 'package:flutter/material.dart';

import '../../../../core/extensions/localization.dart';
import '../../../core/theme/theme.dart';

class RunnerBottomBar extends StatelessWidget {
  const RunnerBottomBar({
    required this.canGoBack,
    required this.isLast,
    required this.isSubmitting,
    required this.onPrevious,
    required this.onNext,
    required this.onSubmit,
    super.key,
  });

  final bool canGoBack;
  final bool isLast;
  final bool isSubmitting;
  final VoidCallback onPrevious;
  final VoidCallback onNext;
  final VoidCallback onSubmit;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: EdgeInsets.all(context.dimensions.space.s12),
        child: Row(
          children: [
            Expanded(
              child: OutlinedButton.icon(
                onPressed: canGoBack ? onPrevious : null,
                icon: const Icon(Icons.chevron_left),
                label: Text(context.locale.previous),
              ),
            ),
            SizedBox(width: context.dimensions.space.s12),
            Expanded(
              child: isLast
                  ? FilledButton.icon(
                      onPressed: isSubmitting ? null : onSubmit,
                      icon: const Icon(Icons.send),
                      label: Text(context.locale.submit),
                    )
                  : FilledButton.icon(
                      onPressed: onNext,
                      icon: const Icon(Icons.chevron_right),
                      label: Text(context.locale.next),
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
