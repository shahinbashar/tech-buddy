import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/extensions/localization.dart';
import '../../../core/theme/theme.dart';
import '../../../core/widgets/async_value_view.dart';
import '../riverpod/circular_providers.dart';
import '../widgets/circular_tile.dart';

class SavedCircularsPage extends ConsumerWidget {
  const SavedCircularsPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: Text(context.locale.savedCirculars)),
      body: AsyncValueView(
        value: ref.watch(savedCircularsProvider),
        onRetry: () => ref.invalidate(savedCircularsProvider),
        builder: (items) => items.isEmpty
            ? Center(child: Text(context.locale.noSavedCirculars))
            : RefreshIndicator(
                onRefresh: () => ref.refresh(savedCircularsProvider.future),
                child: ListView.separated(
                  padding: EdgeInsets.all(context.dimensions.space.s16),
                  itemCount: items.length,
                  separatorBuilder: (_, _) =>
                      SizedBox(height: context.dimensions.space.s12),
                  itemBuilder: (_, index) =>
                      CircularTile(circular: items[index]),
                ),
              ),
      ),
    );
  }
}
