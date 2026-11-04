import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/extensions/localization.dart';
import '../../../../domain/failures/business_failure.dart';
import '../../../core/failure/business_failure_ui_mapper.dart';
import '../riverpod/exam_providers.dart';

/// Shows a snackbar whenever starting an exam or practice set fails.
class LaunchErrorListener extends ConsumerWidget {
  const LaunchErrorListener({required this.child, super.key});

  final Widget child;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    ref.listen(examLauncherProvider, (_, next) {
      if (next case AsyncError(:final error)) {
        final message = error is BusinessFailure
            ? BusinessFailureUIMapper.map(error, context.locale).message
            : BusinessFailureUIMapper.unexpected(context.locale).message;
        ScaffoldMessenger.of(context)
            .showSnackBar(SnackBar(content: Text(message)));
      }
    });
    return child;
  }
}
