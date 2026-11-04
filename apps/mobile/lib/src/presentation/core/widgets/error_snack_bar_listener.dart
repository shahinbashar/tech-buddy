import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_riverpod/misc.dart';

import '../../../core/extensions/localization.dart';
import '../failure/business_failure_ui_mapper.dart';

/// Shows a snackbar with the mapped failure copy whenever [provider] moves
/// into an error state. For actions (start, save, toggle) whose failure
/// should not replace the screen.
class ErrorSnackBarListener<T> extends ConsumerWidget {
  const ErrorSnackBarListener({
    required this.provider,
    required this.child,
    super.key,
  });

  final ProviderListenable<AsyncValue<T>> provider;
  final Widget child;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    ref.listen(provider, (_, next) {
      if (next case AsyncError(:final error)) {
        final message = BusinessFailureUIMapper.fromError(
          error,
          context.locale,
        ).message;
        ScaffoldMessenger.of(context)
            .showSnackBar(SnackBar(content: Text(message)));
      }
    });
    return child;
  }
}
