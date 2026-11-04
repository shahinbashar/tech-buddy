import 'package:flutter/widgets.dart';
import 'package:go_router/go_router.dart';

import '../../../core/router/routes.dart';

/// Single place for study navigation so screens don't build paths by hand.
extension StudyNavigation on BuildContext {
  void openSubject(String subjectSlug) => pushNamed(
    Routes.subjectDetail.name,
    pathParameters: {'subjectSlug': subjectSlug},
  );

  void openTopic({required String subjectSlug, required String topicSlug}) =>
      pushNamed(
        Routes.topicDetail.name,
        pathParameters: {'subjectSlug': subjectSlug, 'topicSlug': topicSlug},
      );

  /// Swaps the current topic for a sibling, so previous/next paging does not
  /// grow the back stack.
  void replaceTopic({required String subjectSlug, required String topicSlug}) =>
      pushReplacementNamed(
        Routes.topicDetail.name,
        pathParameters: {'subjectSlug': subjectSlug, 'topicSlug': topicSlug},
      );
}
