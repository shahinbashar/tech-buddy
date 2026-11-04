import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../../../../core/base/result.dart';
import '../../../../core/di/dependency_injection.dart';
import '../../../../core/extensions/result_extensions.dart';
import '../../../../domain/entities/circular_entity.dart';
import '../../../../domain/repositories/circular_repository.dart';

part 'circular_providers.g.dart';

class CircularListState {
  const CircularListState({
    required this.items,
    required this.page,
    required this.hasMore,
    this.isLoadingMore = false,
  });

  final List<CircularEntity> items;
  final int page;
  final bool hasMore;
  final bool isLoadingMore;
}

/// Paginated circular list for one tab + search term.
@riverpod
class CircularList extends _$CircularList {
  @override
  Future<CircularListState> build(CircularListType type, String search) async {
    final page =
        (await ref
                .read(getCircularsUseCaseProvider)
                .call(type: type, search: search))
            .getOrThrow();
    return CircularListState(
      items: page.items,
      page: page.page,
      hasMore: page.hasMore,
    );
  }

  Future<void> loadMore() async {
    final current = state.value;
    if (current == null || !current.hasMore || current.isLoadingMore) return;
    state = AsyncData(
      CircularListState(
        items: current.items,
        page: current.page,
        hasMore: true,
        isLoadingMore: true,
      ),
    );
    final result = await ref
        .read(getCircularsUseCaseProvider)
        .call(type: type, page: current.page + 1, search: search);
    if (!ref.mounted) return;
    state = AsyncData(switch (result) {
      Success(:final data) => CircularListState(
        items: [...current.items, ...data.items],
        page: data.page,
        hasMore: data.hasMore,
      ),
      // Keep what we have; the user can try "load more" again.
      Error() => CircularListState(
        items: current.items,
        page: current.page,
        hasMore: current.hasMore,
      ),
    });
  }
}

@riverpod
Future<CircularDetailEntity> circularDetail(Ref ref, String slug) async {
  return (await ref.watch(getCircularDetailUseCaseProvider).call(slug))
      .getOrThrow();
}

@riverpod
Future<List<CircularEntity>> savedCirculars(Ref ref) async {
  return (await ref.watch(getSavedCircularsUseCaseProvider).call())
      .getOrThrow();
}
