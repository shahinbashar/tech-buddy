import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../../../core/extensions/localization.dart';
import '../../../../domain/entities/circular_entity.dart';
import '../../../core/router/routes.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/deadline_chip.dart';
import '../../../core/widgets/text/typography.dart';

class CircularTile extends StatelessWidget {
  const CircularTile({required this.circular, super.key});

  final CircularEntity circular;

  @override
  Widget build(BuildContext context) {
    final deadline = DateFormat.yMMMd().add_jm().format(
      circular.applicationDeadline,
    );
    return Card(
      margin: EdgeInsets.zero,
      child: InkWell(
        borderRadius: BorderRadius.circular(context.dimensions.radius.medium),
        onTap: () => context.pushNamed(
          Routes.circularDetail.name,
          pathParameters: {'slug': circular.slug},
        ),
        child: Padding(
          padding: EdgeInsets.all(context.dimensions.space.s16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Wrap(
                spacing: context.dimensions.space.s8,
                runSpacing: context.dimensions.space.s4,
                children: [
                  DeadlineChip(circular: circular),
                  if (circular.isFeatured)
                    Icon(
                      Icons.star_rounded,
                      color: context.color.status.warning,
                    ),
                ],
              ),
              SizedBox(height: context.dimensions.space.s8),
              HeadingLevel3Text(circular.title),
              BodySmallText.muted(circular.organizationName),
              SizedBox(height: context.dimensions.space.s8),
              LabelText.muted(
                [
                  '${context.locale.deadline}: $deadline',
                  if (circular.vacancies != null)
                    context.locale.vacancies('${circular.vacancies}'),
                ].join(' · '),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
