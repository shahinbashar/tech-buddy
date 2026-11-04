import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../../../../../core/base/result.dart';
import '../../../../../core/di/dependency_injection.dart';
import '../../../../core/application_state/session_status_provider/session_status_provider.dart';

part 'registration_provider.g.dart';

/// Mirrors the login flow: on success the session gate takes over navigation.
@riverpod
class Registration extends _$Registration {
  @override
  AsyncValue<void> build() => const AsyncData(null);

  Future<void> register({
    required String fullName,
    required String email,
    required String password,
  }) async {
    if (state.isLoading) return;
    state = const AsyncLoading();
    final result = await ref
        .read(registerUseCaseProvider)
        .call(fullName: fullName, email: email, password: password);
    if (!ref.mounted) return;
    state = switch (result) {
      Success() => const AsyncData(null),
      Error(:final error) => AsyncError(error, StackTrace.current),
    };
    if (result is Success) ref.invalidate(sessionStatusProvider);
  }
}
