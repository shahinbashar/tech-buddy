import '../../core/base/result.dart';
import '../../domain/entities/dashboard_entity.dart';
import '../../domain/failures/business_failure.dart';
import '../../domain/repositories/dashboard_repository.dart';
import '../base/repository.dart';
import '../mappers/dashboard_mapper.dart';
import '../models/dashboard_model.dart';
import '../services/network/rest_client.dart';

final class DashboardRepositoryImpl extends Repository
    implements DashboardRepository {
  DashboardRepositoryImpl({required this.remote, required super.crashReporter});

  final RestClient remote;
  static const _mapper = DashboardMapper();

  @override
  Future<Result<DashboardEntity, BusinessFailure>> getDashboard() {
    return asyncGuard(() async {
      final response = await remote.dashboard();
      return _mapper.toEntity(
        DashboardModel.fromJson(response.data as Map<String, dynamic>),
      );
    });
  }
}
