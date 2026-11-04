import '../../core/base/result.dart';
import '../entities/dashboard_entity.dart';
import '../failures/business_failure.dart';

abstract interface class DashboardRepository {
  Future<Result<DashboardEntity, BusinessFailure>> getDashboard();
}
