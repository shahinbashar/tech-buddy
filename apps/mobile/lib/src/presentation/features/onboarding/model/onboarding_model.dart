part of '../view/onboarding_page.dart';

/// One onboarding slide: the core journey step it introduces.
typedef _OnboardingSlideData = ({
  IconData icon,
  String title,
  List<String> points,
});

/// The three slides mirror the product's loop: find a circular, practise
/// daily, fix weak topics.
List<_OnboardingSlideData> _onboardingSlides(BuildContext context) {
  final locale = context.locale;

  return [
    (
      icon: Icons.work_outline_rounded,
      title: locale.onboardingCircularsTitle,
      points: [
        locale.onboardingCircularsPoint1,
        locale.onboardingCircularsPoint2,
      ],
    ),
    (
      icon: Icons.timer_outlined,
      title: locale.onboardingExamTitle,
      points: [locale.onboardingExamPoint1, locale.onboardingExamPoint2],
    ),
    (
      icon: Icons.insights_rounded,
      title: locale.onboardingImproveTitle,
      points: [locale.onboardingImprovePoint1, locale.onboardingImprovePoint2],
    ),
  ];
}
