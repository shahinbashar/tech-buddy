import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../../../core/extensions/localization.dart';
import '../../../../domain/entities/dashboard_entity.dart';
import '../../../core/router/routes.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/section_header.dart';

/// Saved circulars whose deadline is within 7 days. Hidden when empty.
class ClosingSoonSection extends StatelessWidget {
  const ClosingSoonSection({required this.items, super.key});

  final List<ClosingSoonEntity> items;

  @override
  Widget build(BuildContext context) {
    if (items.isEmpty) return const SizedBox.shrink();
    final colors = context.color;
    return Card(
      margin: EdgeInsets.zero,
      color: colors.status.warningTint,
      child: Padding(
        padding: EdgeInsets.all(context.dimensions.space.s12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SectionHeader(
              title: context.locale.closingSoon,
              trailing: Icon(
                Icons.notifications_active_outlined,
                color: colors.status.warning,
              ),
            ),
            for (final item in items)
              ListTile(
                dense: true,
                contentPadding: EdgeInsets.zero,
                title: Text(
                  item.title,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                subtitle: Text(
                  item.organizationName,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                trailing: Text(
                  DateFormat.MMMd().format(item.applicationDeadline),
                ),
                onTap: () => context.pushNamed(
                  Routes.circularDetail.name,
                  pathParameters: {'slug': item.slug},
                ),
              ),
          ],
        ),
      ),
    );
  }
}
