import '../../core/base/result.dart';
import '../../core/base/unit.dart';
import '../../domain/entities/login_entity.dart';
import '../../domain/failures/business_failure.dart';
import '../../domain/repositories/authentication_repository.dart';
import '../base/repository.dart';
import '../mappers/login_mapper.dart';
import '../models/login_model.dart';
import '../services/cache/cache_service.dart';
import '../services/network/auth/token_manager.dart';
import '../services/network/rest_client.dart';

final class AuthenticationRepositoryImpl extends Repository
    implements AuthenticationRepository {
  AuthenticationRepositoryImpl({
    required this.remote,
    required this.local,
    required this.tokens,
    required super.crashReporter,
  });

  final RestClient remote;
  final CacheService local;
  final TokenManager tokens;

  static const _loginMapper = LoginMapper();

  @override
  Future<Result<UserEntity, BusinessFailure>> login({
    required String email,
    required String password,
    bool shouldRemember = false,
  }) async {
    return asyncGuard(() async {
      final request = LoginRequestModel(
        email: email.trim().toLowerCase(),
        password: password,
      );
      final response = await remote.login(request.toJson());
      return _establishSession(response.data, remember: shouldRemember);
    });
  }

  @override
  Future<Result<UserEntity, BusinessFailure>> register({
    required String fullName,
    required String email,
    required String password,
  }) async {
    return asyncGuard(() async {
      final request = RegisterRequestModel(
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password: password,
      );
      final response = await remote.register(request.toJson());
      return _establishSession(response.data, remember: true);
    });
  }

  /// Persists the token pair and (optionally) the remembered-session flag.
  /// A failed flag write clears the just-persisted tokens and rethrows —
  /// orphaned tokens must not outlive a sign-in the caller saw fail.
  Future<UserEntity> _establishSession(
    Object? data, {
    required bool remember,
  }) async {
    final model = LoginResponseModel.fromJson(data! as Map<String, dynamic>);
    await tokens.persist(
      access: model.accessToken,
      refresh: model.refreshToken,
    );
    if (remember) {
      try {
        await _saveSession();
      } catch (_) {
        await tokens.clear();
        rethrow;
      }
    }
    return _loginMapper.toEntity(model.user);
  }

  Future<void> _saveSession() async {
    await local.save(CacheKey.isLoggedIn, true);
  }

  /// Reads or writes the persisted "Remember Me" checkbox preference.
  ///
  /// When [rememberMe] is null, retrieves the current setting from cache;
  /// otherwise updates it. Returns the current or newly saved value,
  /// defaulting to false on errors. This is the UI preference only —
  /// whether a session survives a restart is decided by [restoreSession].
  @override
  Future<bool> rememberMe({bool? rememberMe}) async {
    try {
      if (rememberMe == null) {
        return local.get<bool>(CacheKey.rememberMe) ?? false;
      }

      await local.save(CacheKey.rememberMe, rememberMe);

      return rememberMe;
    } catch (e) {
      return false;
    }
  }

  @override
  Future<Result<Unit, BusinessFailure>> restoreSession() async {
    return asyncGuard(() async {
      final remembered = local.get<bool>(CacheKey.isLoggedIn) ?? false;
      if (!remembered) await tokens.clear();

      return Unit.value;
    });
  }

  /// Clears the flag first, tokens second — the session derives from the
  /// stored tokens, so the token clear is the step that actually ends it.
  /// In this order a failed token clear leaves the user signed in with a
  /// surfaced error prompting a retry, instead of a cleared flag masking
  /// tokens that still authenticate.
  @override
  Future<Result<Unit, BusinessFailure>> logout() async {
    return asyncGuard(() async {
      await local.remove([CacheKey.isLoggedIn, CacheKey.rememberMe]);
      await tokens.clear();
      return Unit.value;
    });
  }
}
