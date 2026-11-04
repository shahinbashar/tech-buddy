/// Application status of a circular, derived by the server from its dates.
enum CircularStatus { draft, upcoming, open, closed }

class CircularEntity {
  const CircularEntity({
    required this.id,
    required this.slug,
    required this.title,
    required this.organizationName,
    required this.category,
    required this.applicationStartDate,
    required this.applicationDeadline,
    required this.status,
    required this.isFeatured,
    this.organizationNameBn,
    this.vacancies,
    this.salary,
  });

  final String id;
  final String slug;
  final String title;
  final String organizationName;
  final String? organizationNameBn;
  final String category;
  final DateTime applicationStartDate;
  final DateTime applicationDeadline;
  final CircularStatus status;
  final bool isFeatured;
  final int? vacancies;
  final String? salary;
}

class CircularAttachmentEntity {
  const CircularAttachmentEntity({
    required this.name,
    required this.url,
    required this.isPdf,
  });

  final String name;
  final String url;
  final bool isPdf;
}

class CircularDetailEntity {
  const CircularDetailEntity({
    required this.summary,
    required this.isSaved,
    required this.attachments,
    this.educationalQualification,
    this.ageRequirement,
    this.additionalRequirements,
    this.applicationInstructions,
    this.applicationUrl,
  });

  final CircularEntity summary;
  final bool isSaved;
  final String? educationalQualification;
  final String? ageRequirement;
  final String? additionalRequirements;
  final String? applicationInstructions;
  final String? applicationUrl;
  final List<CircularAttachmentEntity> attachments;
}

class CircularPage {
  const CircularPage({
    required this.items,
    required this.page,
    required this.totalPages,
  });

  final List<CircularEntity> items;
  final int page;
  final int totalPages;

  bool get hasMore => page < totalPages;
}
