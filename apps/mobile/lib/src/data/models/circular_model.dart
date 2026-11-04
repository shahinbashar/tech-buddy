import 'package:dart_mappable/dart_mappable.dart';

part 'circular_model.mapper.dart';

@MappableClass(generateMethods: GenerateMethods.decode)
class CircularModel with CircularModelMappable {
  CircularModel({
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
  final String status;
  final bool isFeatured;
  final int? vacancies;
  final String? salary;

  static const fromJson = CircularModelMapper.fromJson;
}

@MappableClass(generateMethods: GenerateMethods.decode)
class AttachmentModel with AttachmentModelMappable {
  AttachmentModel({
    required this.originalName,
    required this.mimeType,
    required this.url,
  });

  final String originalName;
  final String mimeType;
  final String url;
}

@MappableClass(generateMethods: GenerateMethods.decode)
class CircularDetailModel with CircularDetailModelMappable {
  CircularDetailModel({
    required this.id,
    required this.slug,
    required this.title,
    required this.organizationName,
    required this.category,
    required this.applicationStartDate,
    required this.applicationDeadline,
    required this.status,
    required this.isFeatured,
    required this.attachments,
    this.isSaved = false,
    this.organizationNameBn,
    this.vacancies,
    this.salary,
    this.educationalQualification,
    this.ageRequirement,
    this.additionalRequirements,
    this.applicationInstructions,
    this.applicationUrl,
  });

  final String id;
  final String slug;
  final String title;
  final String organizationName;
  final String? organizationNameBn;
  final String category;
  final DateTime applicationStartDate;
  final DateTime applicationDeadline;
  final String status;
  final bool isFeatured;
  final int? vacancies;
  final String? salary;
  final String? educationalQualification;
  final String? ageRequirement;
  final String? additionalRequirements;
  final String? applicationInstructions;
  final String? applicationUrl;
  final List<AttachmentModel> attachments;
  final bool isSaved;

  static const fromJson = CircularDetailModelMapper.fromJson;
}

@MappableClass(generateMethods: GenerateMethods.decode)
class PageMetaModel with PageMetaModelMappable {
  PageMetaModel({required this.page, required this.totalPages});

  final int page;
  final int totalPages;
}

@MappableClass(generateMethods: GenerateMethods.decode)
class CircularPageModel with CircularPageModelMappable {
  CircularPageModel({required this.items, required this.meta});

  final List<CircularModel> items;
  final PageMetaModel meta;

  static const fromJson = CircularPageModelMapper.fromJson;
}
