part of '../dependency_injection.dart';

@Riverpod(keepAlive: true)
AuthenticationRepository authenticationRepository(Ref ref) {
  return AuthenticationRepositoryImpl(
    remote: ref.watch(restClientServiceProvider),
    local: ref.watch(cacheServiceProvider),
    tokens: ref.watch(tokenManagerProvider),
    crashReporter: ref.watch(crashReporterProvider),
  );
}

@Riverpod(keepAlive: true)
RouterRepository routerRepository(Ref ref) {
  return RouterRepositoryImpl(
    cacheService: ref.watch(cacheServiceProvider),
    tokens: ref.watch(tokenManagerProvider),
  );
}

@Riverpod(keepAlive: true)
LocaleRepository localeRepository(Ref ref) {
  return LocaleRepositoryImpl(ref.watch(cacheServiceProvider));
}

@Riverpod(keepAlive: true)
CircularRepository circularRepository(Ref ref) {
  return CircularRepositoryImpl(
    remote: ref.watch(restClientServiceProvider),
    crashReporter: ref.watch(crashReporterProvider),
  );
}

@Riverpod(keepAlive: true)
ExamRepository examRepository(Ref ref) {
  return ExamRepositoryImpl(
    remote: ref.watch(restClientServiceProvider),
    crashReporter: ref.watch(crashReporterProvider),
  );
}

@Riverpod(keepAlive: true)
DashboardRepository dashboardRepository(Ref ref) {
  return DashboardRepositoryImpl(
    remote: ref.watch(restClientServiceProvider),
    crashReporter: ref.watch(crashReporterProvider),
  );
}
