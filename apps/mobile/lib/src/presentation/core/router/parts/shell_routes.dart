part of '../router.dart';

StatefulShellRoute _shellRoutes(Ref ref) {
  return StatefulShellRoute.indexedStack(
    builder: (context, state, navigationShell) {
      return NavigationShell(statefulNavigationShell: navigationShell);
    },
    branches: [
      StatefulShellBranch(
        routes: [
          GoRoute(
            path: Routes.home.path,
            name: Routes.home.name,
            pageBuilder: (context, state) {
              return const MaterialPage(child: HomePage());
            },
          ),
        ],
      ),
      StatefulShellBranch(
        routes: [
          GoRoute(
            path: Routes.circulars.path,
            name: Routes.circulars.name,
            pageBuilder: (context, state) =>
                const MaterialPage(child: CircularsPage()),
          ),
        ],
      ),
      StatefulShellBranch(
        routes: [
          GoRoute(
            path: Routes.exams.path,
            name: Routes.exams.name,
            pageBuilder: (context, state) =>
                const MaterialPage(child: ExamsPage()),
          ),
        ],
      ),
      StatefulShellBranch(
        routes: [
          GoRoute(
            path: Routes.profile.path,
            name: Routes.profile.name,
            pageBuilder: (context, state) {
              return const MaterialPage(child: ProfilePage());
            },
          ),
        ],
      ),
    ],
  );
}

/// Full-screen routes pushed above the tab shell (detail, exam runner, result).
List<GoRoute> _focusRoutes(Ref ref) {
  return [
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: Routes.circularDetail.path,
      name: Routes.circularDetail.name,
      builder: (context, state) =>
          CircularDetailPage(slug: state.pathParameters['slug']!),
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: Routes.savedCirculars.path,
      name: Routes.savedCirculars.name,
      builder: (context, state) => const SavedCircularsPage(),
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: Routes.examRunner.path,
      name: Routes.examRunner.name,
      builder: (context, state) =>
          ExamRunnerPage(attemptId: state.pathParameters['attemptId']!),
    ),
    GoRoute(
      parentNavigatorKey: _rootNavigatorKey,
      path: Routes.examResult.path,
      name: Routes.examResult.name,
      builder: (context, state) =>
          ExamResultPage(attemptId: state.pathParameters['attemptId']!),
    ),
  ];
}
