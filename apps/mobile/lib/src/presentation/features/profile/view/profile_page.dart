import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../../core/extensions/localization.dart';
import '../../../core/application_state/logout_provider/logout_provider.dart';
import '../../../core/router/routes.dart';
import '../../../core/theme/theme.dart';
import '../../authentication/login/widgets/language_switcher.dart';

class ProfilePage extends ConsumerWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isLoggingOut = ref.watch(logoutProvider).isLoading;
    return ListView(
      padding: EdgeInsets.all(context.dimensions.space.s16),
      children: [
        ListTile(
          leading: const Icon(Icons.bookmarks_outlined),
          title: Text(context.locale.savedCirculars),
          trailing: const Icon(Icons.chevron_right),
          onTap: () => context.pushNamed(Routes.savedCirculars.name),
        ),
        const ListTile(
          leading: Icon(Icons.translate),
          title: LanguageSwitcherWidget(),
        ),
        const Divider(),
        ListTile(
          leading: Icon(Icons.logout, color: context.color.status.danger),
          title: Text(
            context.locale.logout,
            style: TextStyle(color: context.color.status.danger),
          ),
          enabled: !isLoggingOut,
          onTap: () => ref.read(logoutProvider.notifier).call(),
        ),
      ],
    );
  }
}
