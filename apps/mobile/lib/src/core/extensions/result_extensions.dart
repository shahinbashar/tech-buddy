import '../base/result.dart';

extension ResultUnwrap<T, E extends Object> on Result<T, E> {
  /// Returns the data, or throws the typed failure so a Riverpod
  /// `AsyncValue` carries it as its error (rendered by `FailureView`).
  T getOrThrow() => switch (this) {
    Success(:final data) => data,
    Error(:final error) => throw error,
  };
}
