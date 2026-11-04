import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/extensions/localization.dart';
import '../../../../domain/failures/business_failure.dart';
import '../../../core/failure/business_failure_ui_mapper.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/failure_view.dart';
import '../../../core/widgets/loading_indicator.dart';
import '../../home/riverpod/dashboard_provider.dart';
import '../riverpod/exam_providers.dart';
import '../riverpod/exam_session_provider.dart';
import '../riverpod/exam_session_state.dart';
import '../widgets/confirm_submit_dialog.dart';
import '../widgets/countdown_badge.dart';
import '../widgets/exam_navigation.dart';
import '../widgets/question_card.dart';
import '../widgets/question_grid_sheet.dart';
import '../widgets/runner_bottom_bar.dart';

class ExamRunnerPage extends ConsumerWidget {
  const ExamRunnerPage({required this.attemptId, super.key});

  final String attemptId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final provider = examSessionProvider(attemptId);

    ref.listen(provider, (previous, next) {
      final session = next.value;
      if (session?.submitted != null && previous?.value?.submitted == null) {
        ref
          ..invalidate(todayExamsProvider)
          ..invalidate(dashboardProvider);
        context.openExamResult(attemptId, replace: true);
      } else if (session?.submitError case final BusinessFailure failure
          when previous?.value?.submitError != failure) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              BusinessFailureUIMapper.map(failure, context.locale).message,
            ),
          ),
        );
      }
      if (next.error is AttemptAlreadySubmitted) {
        context.openExamResult(attemptId, replace: true);
      }
      if (session != null &&
          session.secondsLeft == 0 &&
          (previous?.value?.secondsLeft ?? 1) > 0) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(context.locale.timeUpSubmitting)),
        );
      }
    });

    return switch (ref.watch(provider)) {
      AsyncData(:final value) => _ExamRunnerView(
        attemptId: attemptId,
        session: value,
      ),
      AsyncError(:final error) when error is! AttemptAlreadySubmitted =>
        Scaffold(
          appBar: AppBar(),
          body: FailureView(
            error: error,
            onRetry: () => ref.invalidate(provider),
          ),
        ),
      _ => const Scaffold(body: LoadingIndicator()),
    };
  }
}

class _ExamRunnerView extends ConsumerWidget {
  const _ExamRunnerView({required this.attemptId, required this.session});

  final String attemptId;
  final ExamSessionState session;

  Future<void> _confirmSubmit(BuildContext context, WidgetRef ref) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (_) => ConfirmSubmitDialog(
        unanswered: session.total - session.answeredCount,
      ),
    );
    if (confirmed ?? false) {
      await ref.read(examSessionProvider(attemptId).notifier).submit();
    }
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final notifier = ref.read(examSessionProvider(attemptId).notifier);
    final question = session.question;

    return PopScope(
      // Leaving is allowed, but warn first: the timer keeps running on
      // the server.
      canPop: false,
      onPopInvokedWithResult: (didPop, _) async {
        if (didPop) return;
        final leave = await showDialog<bool>(
          context: context,
          builder: (dialogContext) => AlertDialog(
            content: Text(context.locale.leaveExamWarning),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(dialogContext).pop(false),
                child: Text(context.locale.keepWorking),
              ),
              TextButton(
                onPressed: () => Navigator.of(dialogContext).pop(true),
                child: Text(context.locale.leaveExam),
              ),
            ],
          ),
        );
        if ((leave ?? false) && context.mounted) Navigator.of(context).pop();
      },
      child: Scaffold(
        appBar: AppBar(
          title: Text(
            session.attempt.examTitle,
            overflow: TextOverflow.ellipsis,
          ),
          actions: [
            CountdownBadge(secondsLeft: session.secondsLeft),
            IconButton(
              tooltip: context.locale.answeredCount(
                '${session.answeredCount}',
                '${session.total}',
              ),
              icon: const Icon(Icons.grid_view_rounded),
              onPressed: () => showModalBottomSheet<void>(
                context: context,
                builder: (sheetContext) => QuestionGridSheet(
                  answered: [
                    for (final q in session.attempt.questions)
                      session.answers[q.answerId] != null,
                  ],
                  currentIndex: session.currentIndex,
                  onSelect: (index) {
                    Navigator.of(sheetContext).pop();
                    notifier.goTo(index);
                  },
                ),
              ),
            ),
          ],
          bottom: PreferredSize(
            preferredSize: Size.fromHeight(context.dimensions.space.s4),
            child: LinearProgressIndicator(
              value: session.answeredCount / session.total,
            ),
          ),
        ),
        body: SingleChildScrollView(
          padding: EdgeInsets.all(context.dimensions.space.s16),
          child: QuestionCard(
            key: ValueKey(question.answerId),
            question: question,
            index: session.currentIndex,
            total: session.total,
            selectedOptionId: session.answers[question.answerId],
            onSelect: notifier.select,
          ),
        ),
        bottomNavigationBar: RunnerBottomBar(
          canGoBack: session.currentIndex > 0,
          isLast: session.isLast,
          isSubmitting: session.isSubmitting,
          onPrevious: () => notifier.goTo(session.currentIndex - 1),
          onNext: () => notifier.goTo(session.currentIndex + 1),
          onSubmit: () => _confirmSubmit(context, ref),
        ),
      ),
    );
  }
}
