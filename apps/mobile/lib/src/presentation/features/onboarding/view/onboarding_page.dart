import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gap/gap.dart';

import '../../../../core/di/dependency_injection.dart';
import '../../../../core/extensions/localization.dart';
import '../../../core/application_state/onboarding_status_provider/onboarding_status_provider.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/text/typography.dart';

part '../model/onboarding_model.dart';

class OnboardingPage extends ConsumerStatefulWidget {
  const OnboardingPage({super.key});

  @override
  ConsumerState<OnboardingPage> createState() => _OnboardingPageState();
}

class _OnboardingPageState extends ConsumerState<OnboardingPage> {
  final _pageController = PageController();
  int _currentPage = 0;

  /// Marks onboarding done; the router gate moves on by itself once the
  /// status provider re-reads the flag.
  void _complete() {
    ref.read(markOnboardingCompletedUseCaseProvider).call();
    ref.invalidate(onboardingStatusProvider);
  }

  void _next() {
    _pageController.nextPage(
      duration: Durations.medium2,
      curve: Curves.easeOutCubic,
    );
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final slides = _onboardingSlides(context);
    final isLast = _currentPage == slides.length - 1;

    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Align(
              alignment: AlignmentDirectional.centerEnd,
              child: Visibility.maintain(
                visible: !isLast,
                child: TextButton(
                  onPressed: _complete,
                  child: Text(context.locale.skip),
                ),
              ),
            ),
            Expanded(
              child: PageView(
                controller: _pageController,
                onPageChanged: (page) => setState(() => _currentPage = page),
                children: [
                  for (final slide in slides) _OnboardingSlide(slide: slide),
                ],
              ),
            ),
            _PageDots(count: slides.length, current: _currentPage),
            Padding(
              padding: EdgeInsets.all(context.dimensions.space.s24),
              child: FilledButton(
                onPressed: isLast ? _complete : _next,
                child: Text(
                  isLast ? context.locale.getStarted : context.locale.next,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _OnboardingSlide extends StatelessWidget {
  const _OnboardingSlide({required this.slide});

  final _OnboardingSlideData slide;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: EdgeInsets.symmetric(horizontal: context.dimensions.space.s24),
      child: Column(
        children: [
          Gap(context.dimensions.space.s24),
          _SlideIllustration(icon: slide.icon),
          Gap(context.dimensions.space.s32),
          HeadingLevel1Text(slide.title, textAlign: TextAlign.center),
          Gap(context.dimensions.space.s24),
          for (final point in slide.points) _OnboardingPoint(text: point),
        ],
      ),
    );
  }
}

class _SlideIllustration extends StatelessWidget {
  const _SlideIllustration({required this.icon});

  final IconData icon;

  /// The icon fills this fraction of the tinted disc.
  static const double _iconRatio = 0.45;

  @override
  Widget build(BuildContext context) {
    final size = context.dimensions.layout.illustration;

    return ExcludeSemantics(
      child: Container(
        width: size,
        height: size,
        decoration: BoxDecoration(
          color: context.color.primary.tint,
          shape: BoxShape.circle,
        ),
        child: Icon(
          icon,
          size: size * _iconRatio,
          color: context.color.primary.defaultValue,
        ),
      ),
    );
  }
}

class _OnboardingPoint extends StatelessWidget {
  const _OnboardingPoint({required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(bottom: context.dimensions.space.s12),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(
            Icons.check_circle_rounded,
            size: context.dimensions.size.iconMedium,
            color: context.color.primary.defaultValue,
          ),
          Gap(context.dimensions.space.s8),
          Expanded(child: BodySmallText(text)),
        ],
      ),
    );
  }
}

class _PageDots extends StatelessWidget {
  const _PageDots({required this.count, required this.current});

  final int count;
  final int current;

  @override
  Widget build(BuildContext context) {
    return ExcludeSemantics(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          for (var i = 0; i < count; i++)
            Padding(
              padding: EdgeInsets.symmetric(
                horizontal: context.dimensions.space.s4,
              ),
              child: Icon(
                Icons.circle,
                size: context.dimensions.layout.dot,
                color: i == current
                    ? context.color.primary.defaultValue
                    : context.color.text.muted,
              ),
            ),
        ],
      ),
    );
  }
}
