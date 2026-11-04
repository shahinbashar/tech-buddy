import 'package:flutter/widgets.dart';

import '../../../core/widgets/error_snack_bar_listener.dart';
import '../riverpod/exam_providers.dart';

/// Shows a snackbar whenever starting an exam or practice set fails.
class LaunchErrorListener extends StatelessWidget {
  const LaunchErrorListener({required this.child, super.key});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return ErrorSnackBarListener(provider: examLauncherProvider, child: child);
  }
}
