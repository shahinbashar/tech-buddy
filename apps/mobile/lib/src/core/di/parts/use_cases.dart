part of '../dependency_injection.dart';

@riverpod
LoginUseCase loginUseCase(Ref ref) {
  return LoginUseCase(ref.watch(authenticationRepositoryProvider));
}

@riverpod
LogoutUseCase logoutUseCase(Ref ref) {
  return LogoutUseCase(ref.watch(authenticationRepositoryProvider));
}

@riverpod
GetCurrentLocaleUseCase getCurrentLocaleUseCase(Ref ref) {
  return GetCurrentLocaleUseCase(ref.watch(localeRepositoryProvider));
}

@riverpod
SetCurrentLocaleUseCase setCurrentLocaleUseCase(Ref ref) {
  return SetCurrentLocaleUseCase(ref.watch(localeRepositoryProvider));
}

/// Clears every keep-alive repository so a new session never sees cached
/// state from the previous one (e.g. logout → login as someone else).
///
/// Lives in the DI layer rather than the domain because it manipulates
/// providers; it lists repositories explicitly instead of reflecting over
/// the container's private element tree.
final class ResetRepositoryUseCase {
  const ResetRepositoryUseCase();

  void call(Ref ref) {
    ref
      ..invalidate(authenticationRepositoryProvider)
      ..invalidate(routerRepositoryProvider)
      ..invalidate(localeRepositoryProvider)
      ..invalidate(circularRepositoryProvider)
      ..invalidate(examRepositoryProvider)
      ..invalidate(dashboardRepositoryProvider)
      ..invalidate(studyRepositoryProvider);
  }
}

@riverpod
ResetRepositoryUseCase resetRepositoryUseCase(Ref ref) {
  return const ResetRepositoryUseCase();
}

@riverpod
GetOnboardingStatusUseCase getOnboardingStatusUseCase(Ref ref) {
  return GetOnboardingStatusUseCase(ref.watch(routerRepositoryProvider));
}

@riverpod
GetSessionStatusUseCase getSessionStatusUseCase(Ref ref) {
  return GetSessionStatusUseCase(ref.watch(routerRepositoryProvider));
}

@riverpod
RestoreSessionUseCase restoreSessionUseCase(Ref ref) {
  return RestoreSessionUseCase(ref.watch(authenticationRepositoryProvider));
}

@riverpod
MarkOnboardingCompletedUseCase markOnboardingCompletedUseCase(Ref ref) {
  return MarkOnboardingCompletedUseCase(ref.watch(routerRepositoryProvider));
}

@riverpod
RegisterUseCase registerUseCase(Ref ref) {
  return RegisterUseCase(ref.watch(authenticationRepositoryProvider));
}

@riverpod
GetDashboardUseCase getDashboardUseCase(Ref ref) {
  return GetDashboardUseCase(ref.watch(dashboardRepositoryProvider));
}

@riverpod
GetCircularsUseCase getCircularsUseCase(Ref ref) {
  return GetCircularsUseCase(ref.watch(circularRepositoryProvider));
}

@riverpod
GetCircularDetailUseCase getCircularDetailUseCase(Ref ref) {
  return GetCircularDetailUseCase(ref.watch(circularRepositoryProvider));
}

@riverpod
GetSavedCircularsUseCase getSavedCircularsUseCase(Ref ref) {
  return GetSavedCircularsUseCase(ref.watch(circularRepositoryProvider));
}

@riverpod
SetCircularSavedUseCase setCircularSavedUseCase(Ref ref) {
  return SetCircularSavedUseCase(ref.watch(circularRepositoryProvider));
}

@riverpod
GetTodayExamsUseCase getTodayExamsUseCase(Ref ref) {
  return GetTodayExamsUseCase(ref.watch(examRepositoryProvider));
}

@riverpod
StartExamUseCase startExamUseCase(Ref ref) {
  return StartExamUseCase(ref.watch(examRepositoryProvider));
}

@riverpod
StartPracticeUseCase startPracticeUseCase(Ref ref) {
  return StartPracticeUseCase(ref.watch(examRepositoryProvider));
}

@riverpod
GetPracticeSourcesUseCase getPracticeSourcesUseCase(Ref ref) {
  return GetPracticeSourcesUseCase(ref.watch(examRepositoryProvider));
}

@riverpod
GetAttemptUseCase getAttemptUseCase(Ref ref) {
  return GetAttemptUseCase(ref.watch(examRepositoryProvider));
}

@riverpod
SaveAnswerUseCase saveAnswerUseCase(Ref ref) {
  return SaveAnswerUseCase(ref.watch(examRepositoryProvider));
}

@riverpod
SubmitAttemptUseCase submitAttemptUseCase(Ref ref) {
  return SubmitAttemptUseCase(ref.watch(examRepositoryProvider));
}

@riverpod
GetLeaderboardUseCase getLeaderboardUseCase(Ref ref) {
  return GetLeaderboardUseCase(ref.watch(examRepositoryProvider));
}

@riverpod
GetSubjectsUseCase getSubjectsUseCase(Ref ref) {
  return GetSubjectsUseCase(ref.watch(studyRepositoryProvider));
}

@riverpod
GetSubjectDetailUseCase getSubjectDetailUseCase(Ref ref) {
  return GetSubjectDetailUseCase(ref.watch(studyRepositoryProvider));
}

@riverpod
GetTopicDetailUseCase getTopicDetailUseCase(Ref ref) {
  return GetTopicDetailUseCase(ref.watch(studyRepositoryProvider));
}

@riverpod
SetTopicCompletedUseCase setTopicCompletedUseCase(Ref ref) {
  return SetTopicCompletedUseCase(ref.watch(studyRepositoryProvider));
}
