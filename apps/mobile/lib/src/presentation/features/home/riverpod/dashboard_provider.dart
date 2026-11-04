import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../../../../core/di/dependency_injection.dart';
import '../../../../core/extensions/result_extensions.dart';
import '../../../../domain/entities/dashboard_entity.dart';

part 'dashboard_provider.g.dart';

@riverpod
Future<DashboardEntity> dashboard(Ref ref) async {
  return (await ref.watch(getDashboardUseCaseProvider).call()).getOrThrow();
}
