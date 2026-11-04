import '../../core/base/result.dart';
import '../../core/base/unit.dart';
import '../entities/circular_entity.dart';
import '../failures/business_failure.dart';
import '../repositories/circular_repository.dart';

final class GetCircularsUseCase {
  const GetCircularsUseCase(this.repository);

  final CircularRepository repository;

  Future<Result<CircularPage, BusinessFailure>> call({
    required CircularListType type,
    int page = 1,
    String? search,
  }) => repository.getCirculars(type: type, page: page, search: search);
}

final class GetCircularDetailUseCase {
  const GetCircularDetailUseCase(this.repository);

  final CircularRepository repository;

  Future<Result<CircularDetailEntity, BusinessFailure>> call(String slug) =>
      repository.getCircular(slug);
}

final class GetSavedCircularsUseCase {
  const GetSavedCircularsUseCase(this.repository);

  final CircularRepository repository;

  Future<Result<List<CircularEntity>, BusinessFailure>> call() =>
      repository.getSavedCirculars();
}

final class SetCircularSavedUseCase {
  const SetCircularSavedUseCase(this.repository);

  final CircularRepository repository;

  Future<Result<Unit, BusinessFailure>> call(
    String circularId, {
    required bool saved,
  }) => repository.setSaved(circularId, saved: saved);
}
