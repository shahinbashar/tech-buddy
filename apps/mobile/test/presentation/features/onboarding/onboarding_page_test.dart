import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:tech_buddy/src/core/di/dependency_injection.dart';
import 'package:tech_buddy/src/core/gen/l10n/app_localizations.dart';
import 'package:tech_buddy/src/domain/repositories/router_repository.dart';
import 'package:tech_buddy/src/presentation/core/application_state/onboarding_status_provider/onboarding_status_provider.dart';
import 'package:tech_buddy/src/presentation/core/theme/theme.dart';
import 'package:tech_buddy/src/presentation/features/onboarding/view/onboarding_page.dart';

class _FakeRouterRepository implements RouterRepository {
  bool completed = false;

  @override
  bool isOnboardingCompleted() => completed;

  @override
  void saveOnboardingAsCompleted() => completed = true;

  @override
  Future<bool> hasSession() async => false;
}

void main() {
  late _FakeRouterRepository repository;
  late ProviderContainer container;

  setUp(() {
    repository = _FakeRouterRepository();
    container = ProviderContainer(
      overrides: [routerRepositoryProvider.overrideWithValue(repository)],
    );
  });

  tearDown(() => container.dispose());

  Future<void> pumpOnboarding(WidgetTester tester) async {
    await tester.pumpWidget(
      UncontrolledProviderScope(
        container: container,
        child: MaterialApp(
          localizationsDelegates: AppLocalizations.localizationsDelegates,
          supportedLocales: AppLocalizations.supportedLocales,
          home: Builder(
            builder: (context) =>
                Theme(data: context.lightTheme, child: const OnboardingPage()),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();
  }

  group('OnboardingPage', () {
    testWidgets('shows the product slides, not template copy', (tester) async {
      await pumpOnboarding(tester);

      expect(find.text('Never miss a government job circular'), findsOneWidget);
      expect(find.textContaining('Flutter'), findsNothing);
    });

    testWidgets('Next walks the slides and the last one offers Get Started', (
      tester,
    ) async {
      await pumpOnboarding(tester);

      await tester.tap(find.text('Next'));
      await tester.pumpAndSettle();
      expect(find.text('Take a timed exam every day'), findsOneWidget);

      await tester.tap(find.text('Next'));
      await tester.pumpAndSettle();
      expect(find.text('Turn weak topics into strong ones'), findsOneWidget);
      expect(find.text('Get Started'), findsOneWidget);
      expect(repository.completed, isFalse);

      await tester.tap(find.text('Get Started'));
      await tester.pump();

      expect(repository.completed, isTrue);
      expect(container.read(onboardingStatusProvider), isTrue);
    });

    testWidgets('Skip completes onboarding from the first slide', (
      tester,
    ) async {
      await pumpOnboarding(tester);

      await tester.tap(find.text('Skip'));
      await tester.pump();

      expect(container.read(onboardingStatusProvider), isTrue);
    });
  });
}
