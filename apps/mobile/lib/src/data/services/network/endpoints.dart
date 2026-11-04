/// Tech Buddy API endpoints. The base URL is injected at build time:
/// `flutter run --dart-define=API_BASE_URL=https://api.example.com/api`.
/// The default targets the API on the host machine from an Android emulator.
class Endpoints {
  static const base = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'http://10.0.2.2:4000/api',
  );

  // Auth (token flow for native clients)
  static const String login = '/auth/mobile/login';
  static const String register = '/auth/mobile/register';
  static const String refreshToken = '/auth/mobile/refresh';
  static const String currentUser = '/auth/me';

  // Dashboard
  static const String dashboard = '/dashboard/me';

  // Circulars
  static const String circulars = '/circulars';
  static const String savedCirculars = '/circulars/saved';
  static const String circularDetail = '/circulars/{slug}';
  static const String circularSave = '/circulars/{id}/save';

  // Study
  static const String subjects = '/subjects';
  static const String subjectDetail = '/subjects/{slug}';
  static const String topicDetail =
      '/subjects/{subjectSlug}/topics/{topicSlug}';
  static const String topicComplete = '/progress/topics/{id}/complete';

  // Exams
  static const String todayExams = '/exams/today';
  static const String startExam = '/exams/{id}/attempts';
  static const String leaderboard = '/exams/{id}/leaderboard';
  static const String attempt = '/attempts/{id}';
  static const String attemptAnswers = '/attempts/{id}/answers';
  static const String attemptSubmit = '/attempts/{id}/submit';
  static const String practice = '/practice';
}
