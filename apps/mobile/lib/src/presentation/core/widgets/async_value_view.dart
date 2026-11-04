import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'failure_view.dart';
import 'loading_indicator.dart';

/// Renders the three states of an [AsyncValue] consistently across screens:
/// a loading indicator, a [FailureView] with retry, or [builder]'s content.
class AsyncValueView<T> extends StatelessWidget {
  const AsyncValueView({
    required this.value,
    required this.builder,
    this.onRetry,
    super.key,
  });

  final AsyncValue<T> value;
  final Widget Function(T data) builder;
  final VoidCallback? onRetry;

  @override
  Widget build(BuildContext context) {
    return switch (value) {
      AsyncData(:final value) => builder(value),
      AsyncError(:final error) => FailureView(error: error, onRetry: onRetry),
      _ => const LoadingIndicator(),
    };
  }
}
