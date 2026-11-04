import '../../core/base/result.dart';
import '../../core/base/unit.dart';
import '../../domain/entities/circular_entity.dart';
import '../../domain/failures/business_failure.dart';
import '../../domain/repositories/circular_repository.dart';
import '../base/repository.dart';
import '../mappers/circular_mapper.dart';
import '../models/circular_model.dart';
import '../services/network/rest_client.dart';

final class CircularRepositoryImpl extends Repository
    implements CircularRepository {
  CircularRepositoryImpl({required this.remote, required super.crashReporter});

  final RestClient remote;
  static const _mapper = CircularMapper();
  static const _pageSize = 20;

  @override
  Future<Result<CircularPage, BusinessFailure>> getCirculars({
    required CircularListType type,
    required int page,
    String? search,
  }) {
    return asyncGuard(() async {
      final response = await remote.circulars(
        status: type.name,
        page: page,
        pageSize: _pageSize,
        search: (search?.trim().isEmpty ?? true) ? null : search!.trim(),
      );
      return _mapper.toPage(
        CircularPageModel.fromJson(response.data as Map<String, dynamic>),
      );
    });
  }

  @override
  Future<Result<CircularDetailEntity, BusinessFailure>> getCircular(
    String slug,
  ) {
    return asyncGuard(() async {
      final response = await remote.circularDetail(slug);
      return _mapper.toDetailEntity(
        CircularDetailModel.fromJson(response.data as Map<String, dynamic>),
      );
    });
  }

  @override
  Future<Result<List<CircularEntity>, BusinessFailure>> getSavedCirculars() {
    return asyncGuard(() async {
      final response = await remote.savedCirculars();
      return [
        for (final item in response.data as List<dynamic>)
          _mapper.toEntity(
            CircularModel.fromJson(item as Map<String, dynamic>),
          ),
      ];
    });
  }

  @override
  Future<Result<Unit, BusinessFailure>> setSaved(
    String circularId, {
    required bool saved,
  }) {
    return asyncGuard(() async {
      if (saved) {
        await remote.saveCircular(circularId);
      } else {
        await remote.unsaveCircular(circularId);
      }
      return Unit.value;
    });
  }
}
