import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/extensions/localization.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/async_value_view.dart';
import '../../../core/widgets/section_header.dart';
import '../riverpod/exam_providers.dart';
import '../widgets/leaderboard_card.dart';
import '../widgets/result_summary_card.dart';
import '../widgets/review_tile.dart';

class ExamResultPage extends ConsumerWidget {
  const ExamResultPage({required this.attemptId, super.key});

  final String attemptId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final provider = attemptResultProvider(attemptId);
    return Scaffold(
      appBar: AppBar(title: Text(context.locale.result)),
      body: AsyncValueView(
        value: ref.watch(provider),
        onRetry: () => ref.invalidate(provider),
        builder: (attempt) => ListView(
          padding: EdgeInsets.all(context.dimensions.space.s16),
          children: [
            Text(
              attempt.examTitle,
              style: Theme.of(context).textTheme.titleMedium,
            ),
            SizedBox(height: context.dimensions.space.s12),
            ResultSummaryCard(result: attempt.result),
            if (!attempt.isPractice) ...[
              SizedBox(height: context.dimensions.space.s12),
              LeaderboardCard(examId: attempt.examId),
            ],
            SizedBox(height: context.dimensions.space.s24),
            SectionHeader(title: context.locale.answerReview),
            for (final (i, review) in attempt.questions.indexed)
              Padding(
                padding: EdgeInsets.only(bottom: context.dimensions.space.s12),
                child: ReviewTile(review: review, index: i),
              ),
          ],
        ),
      ),
    );
  }
}
