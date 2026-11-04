import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../../../core/extensions/localization.dart';
import '../../../../domain/entities/circular_entity.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/async_value_view.dart';
import '../../../core/widgets/deadline_chip.dart';
import '../../../core/widgets/section_header.dart';
import '../../../core/widgets/text/typography.dart';
import '../riverpod/circular_providers.dart';
import '../widgets/external_links.dart';
import '../widgets/info_section.dart';
import '../widgets/save_circular_button.dart';

class CircularDetailPage extends ConsumerWidget {
  const CircularDetailPage({required this.slug, super.key});

  final String slug;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final provider = circularDetailProvider(slug);
    final detail = ref.watch(provider);
    final loaded = detail.value;
    return Scaffold(
      appBar: AppBar(
        actions: [
          if (loaded != null)
            SaveCircularButton(
              circularId: loaded.summary.id,
              slug: slug,
              isSaved: loaded.isSaved,
            ),
        ],
      ),
      body: AsyncValueView(
        value: detail,
        onRetry: () => ref.invalidate(provider),
        builder: (circular) => _CircularDetailBody(detail: circular),
      ),
    );
  }
}

class _CircularDetailBody extends StatelessWidget {
  const _CircularDetailBody({required this.detail});

  final CircularDetailEntity detail;

  @override
  Widget build(BuildContext context) {
    final c = detail.summary;
    final dateFormat = DateFormat.yMMMd().add_jm();
    final applyUrl = detail.applicationUrl;
    return ListView(
      padding: EdgeInsets.all(context.dimensions.space.s16),
      children: [
        DeadlineChip(circular: c),
        SizedBox(height: context.dimensions.space.s8),
        HeadingLevel1Text(c.title),
        BodySmallText.muted(c.organizationName),
        if (c.organizationNameBn != null)
          BodySmallText.muted(c.organizationNameBn!),
        SizedBox(height: context.dimensions.space.s16),
        InfoSection(
          label: context.locale.deadline,
          value: dateFormat.format(c.applicationDeadline),
        ),
        InfoSection(
          label: context.locale.vacanciesLabel,
          value: c.vacancies?.toString(),
        ),
        InfoSection(label: context.locale.salary, value: c.salary),
        InfoSection(
          label: context.locale.qualification,
          value: detail.educationalQualification,
        ),
        InfoSection(label: context.locale.age, value: detail.ageRequirement),
        InfoSection(
          label: context.locale.otherRequirements,
          value: detail.additionalRequirements,
        ),
        InfoSection(
          label: context.locale.howToApply,
          value: detail.applicationInstructions,
        ),
        if (applyUrl != null && c.status != CircularStatus.closed)
          FilledButton.icon(
            onPressed: () => openExternal(applyUrl),
            icon: const Icon(Icons.open_in_new),
            label: Text(context.locale.applyOnline),
          ),
        if (detail.attachments.isNotEmpty) ...[
          SizedBox(height: context.dimensions.space.s24),
          SectionHeader(title: context.locale.attachments),
          for (final attachment in detail.attachments)
            ListTile(
              contentPadding: EdgeInsets.zero,
              leading: Icon(
                attachment.isPdf
                    ? Icons.picture_as_pdf_outlined
                    : Icons.image_outlined,
              ),
              title: Text(attachment.name, overflow: TextOverflow.ellipsis),
              onTap: () => openExternal(attachment.url),
            ),
        ],
      ],
    );
  }
}
