import '../../domain/entities/circular_entity.dart';
import '../models/circular_model.dart';

class CircularMapper {
  const CircularMapper();

  CircularEntity toEntity(CircularModel model) => CircularEntity(
    id: model.id,
    slug: model.slug,
    title: model.title,
    organizationName: model.organizationName,
    organizationNameBn: model.organizationNameBn,
    category: model.category,
    applicationStartDate: model.applicationStartDate.toLocal(),
    applicationDeadline: model.applicationDeadline.toLocal(),
    status: _status(model.status),
    isFeatured: model.isFeatured,
    vacancies: model.vacancies,
    salary: model.salary,
  );

  CircularDetailEntity toDetailEntity(CircularDetailModel model) =>
      CircularDetailEntity(
        summary: CircularEntity(
          id: model.id,
          slug: model.slug,
          title: model.title,
          organizationName: model.organizationName,
          organizationNameBn: model.organizationNameBn,
          category: model.category,
          applicationStartDate: model.applicationStartDate.toLocal(),
          applicationDeadline: model.applicationDeadline.toLocal(),
          status: _status(model.status),
          isFeatured: model.isFeatured,
          vacancies: model.vacancies,
          salary: model.salary,
        ),
        isSaved: model.isSaved,
        educationalQualification: model.educationalQualification,
        ageRequirement: model.ageRequirement,
        additionalRequirements: model.additionalRequirements,
        applicationInstructions: model.applicationInstructions,
        applicationUrl: model.applicationUrl,
        attachments: [
          for (final a in model.attachments)
            CircularAttachmentEntity(
              name: a.originalName,
              url: a.url,
              isPdf: a.mimeType == 'application/pdf',
            ),
        ],
      );

  CircularPage toPage(CircularPageModel model) => CircularPage(
    items: model.items.map(toEntity).toList(growable: false),
    page: model.meta.page,
    totalPages: model.meta.totalPages,
  );

  static CircularStatus _status(String value) => switch (value) {
    'open' => CircularStatus.open,
    'upcoming' => CircularStatus.upcoming,
    'closed' => CircularStatus.closed,
    _ => CircularStatus.draft,
  };
}
