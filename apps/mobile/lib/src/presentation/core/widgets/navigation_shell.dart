import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../core/extensions/localization.dart';
import '../theme/theme.dart';
import 'text/typography.dart';

class NavigationShell extends StatefulWidget {
  const NavigationShell({super.key, required this.statefulNavigationShell});

  final StatefulNavigationShell statefulNavigationShell;

  @override
  State<NavigationShell> createState() => _NavigationShellState();
}

class _NavigationShellState extends State<NavigationShell> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: HeadingLevel3Text(context.locale.appTitle),
        titleSpacing: context.dimensions.space.s16,
      ),
      body: widget.statefulNavigationShell,
      bottomNavigationBar: NavigationBar(
        selectedIndex: widget.statefulNavigationShell.currentIndex,
        onDestinationSelected: (index) {
          // Re-tapping the current tab returns it to its first page.
          widget.statefulNavigationShell.goBranch(
            index,
            initialLocation:
                index == widget.statefulNavigationShell.currentIndex,
          );
        },
        destinations: [
          NavigationDestination(
            icon: const Icon(Icons.dashboard_outlined),
            label: context.locale.home,
          ),
          NavigationDestination(
            icon: const Icon(Icons.work_outline),
            label: context.locale.navCirculars,
          ),
          NavigationDestination(
            icon: const Icon(Icons.assignment_outlined),
            label: context.locale.navExams,
          ),
          NavigationDestination(
            icon: const Icon(Icons.person_outline),
            label: context.locale.profile,
          ),
        ],
      ),
    );
  }
}
