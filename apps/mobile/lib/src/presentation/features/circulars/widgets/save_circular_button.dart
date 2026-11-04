import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/base/result.dart';
import '../../../../core/di/dependency_injection.dart';
import '../../../../core/extensions/localization.dart';
import '../../../../domain/failures/business_failure.dart';
import '../../../core/failure/business_failure_ui_mapper.dart';
import '../../home/riverpod/dashboard_provider.dart';
import '../riverpod/circular_providers.dart';

/// Save/unsave toggle. Refreshes the detail, saved list and dashboard on success.
class SaveCircularButton extends ConsumerStatefulWidget {
  const SaveCircularButton({
    required this.circularId,
    required this.slug,
    required this.isSaved,
    super.key,
  });

  final String circularId;
  final String slug;
  final bool isSaved;

  @override
  ConsumerState<SaveCircularButton> createState() => _SaveCircularButtonState();
}

class _SaveCircularButtonState extends ConsumerState<SaveCircularButton> {
  bool _busy = false;

  Future<void> _toggle() async {
    setState(() => _busy = true);
    final result = await ref
        .read(setCircularSavedUseCaseProvider)
        .call(widget.circularId, saved: !widget.isSaved);
    if (!mounted) return;
    setState(() => _busy = false);
    switch (result) {
      case Success():
        ref
          ..invalidate(circularDetailProvider(widget.slug))
          ..invalidate(savedCircularsProvider)
          ..invalidate(dashboardProvider);
      case Error(:final BusinessFailure error):
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              BusinessFailureUIMapper.map(error, context.locale).message,
            ),
          ),
        );
    }
  }

  @override
  Widget build(BuildContext context) {
    return IconButton(
      tooltip: widget.isSaved
          ? context.locale.saved
          : context.locale.saveCircular,
      onPressed: _busy ? null : _toggle,
      icon: Icon(widget.isSaved ? Icons.bookmark : Icons.bookmark_border),
    );
  }
}
