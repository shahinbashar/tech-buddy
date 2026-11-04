import 'package:flutter/widgets.dart';
import 'package:go_router/go_router.dart';

import '../../../core/router/routes.dart';

/// Single place for exam navigation so screens don't build paths by hand.
extension ExamNavigation on BuildContext {
  void openExamRunner(String attemptId) => pushNamed(
    Routes.examRunner.name,
    pathParameters: {'attemptId': attemptId},
  );

  void openExamResult(String attemptId, {bool replace = false}) => replace
      ? pushReplacementNamed(
          Routes.examResult.name,
          pathParameters: {'attemptId': attemptId},
        )
      : pushNamed(
          Routes.examResult.name,
          pathParameters: {'attemptId': attemptId},
        );
}
