import '../../core/base/result.dart';
import '../../core/base/unit.dart';
import '../entities/circular_entity.dart';
import '../failures/business_failure.dart';

enum CircularListType { running, archived }

abstract interface class CircularRepository {
  Future<Result<CircularPage, BusinessFailure>> getCirculars({
    required CircularListType type,
    required int page,
    String? search,
  });

  Future<Result<CircularDetailEntity, BusinessFailure>> getCircular(
    String slug,
  );

  Future<Result<List<CircularEntity>, BusinessFailure>> getSavedCirculars();

  Future<Result<Unit, BusinessFailure>> setSaved(
    String circularId, {
    required bool saved,
  });
}
