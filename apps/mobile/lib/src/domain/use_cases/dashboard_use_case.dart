import '../../core/base/result.dart';
import '../entities/dashboard_entity.dart';
import '../failures/business_failure.dart';
import '../repositories/dashboard_repository.dart';

final class GetDashboardUseCase {
  const GetDashboardUseCase(this.repository);

  final DashboardRepository repository;

  Future<Result<DashboardEntity, BusinessFailure>> call() =>
      repository.getDashboard();
}
