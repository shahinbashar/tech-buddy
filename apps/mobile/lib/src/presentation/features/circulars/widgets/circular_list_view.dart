import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/extensions/localization.dart';
import '../../../../domain/repositories/circular_repository.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/async_value_view.dart';
import '../riverpod/circular_providers.dart';
import 'circular_tile.dart';

/// One tab of the circulars screen: pull-to-refresh, infinite "load more".
class CircularListView extends ConsumerWidget {
  const CircularListView({required this.type, required this.search, super.key});

  final CircularListType type;
  final String search;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final provider = circularListProvider(type, search);
    return AsyncValueView(
      value: ref.watch(provider),
      onRetry: () => ref.invalidate(provider),
      builder: (state) => RefreshIndicator(
        onRefresh: () => ref.refresh(provider.future),
        child: state.items.isEmpty
            ? ListView(
                children: [
                  Padding(
                    padding: EdgeInsets.all(context.dimensions.space.s24),
                    child: Center(child: Text(context.locale.noCirculars)),
                  ),
                ],
              )
            : ListView.separated(
                padding: EdgeInsets.all(context.dimensions.space.s16),
                itemCount: state.items.length + (state.hasMore ? 1 : 0),
                separatorBuilder: (_, _) =>
                    SizedBox(height: context.dimensions.space.s12),
                itemBuilder: (context, index) => index < state.items.length
                    ? CircularTile(circular: state.items[index])
                    : _LoadMoreButton(
                        isLoading: state.isLoadingMore,
                        onPressed: () => ref.read(provider.notifier).loadMore(),
                      ),
              ),
      ),
    );
  }
}

class _LoadMoreButton extends StatelessWidget {
  const _LoadMoreButton({required this.isLoading, required this.onPressed});

  final bool isLoading;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: isLoading
          ? const CircularProgressIndicator()
          : OutlinedButton(
              onPressed: onPressed,
              child: Text(context.locale.loadMore),
            ),
    );
  }
}
