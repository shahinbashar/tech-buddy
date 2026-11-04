import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../../core/extensions/localization.dart';
import '../../../../domain/repositories/circular_repository.dart';
import '../../../core/router/routes.dart';
import '../../../core/theme/theme.dart';
import '../widgets/circular_list_view.dart';

class CircularsPage extends StatefulWidget {
  const CircularsPage({super.key});

  @override
  State<CircularsPage> createState() => _CircularsPageState();
}

class _CircularsPageState extends State<CircularsPage> {
  final _searchController = TextEditingController();
  String _search = '';

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Column(
        children: [
          Padding(
            padding: EdgeInsets.fromLTRB(
              context.dimensions.space.s16,
              context.dimensions.space.s12,
              context.dimensions.space.s8,
              0,
            ),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _searchController,
                    textInputAction: TextInputAction.search,
                    decoration: InputDecoration(
                      hintText: context.locale.searchCirculars,
                      prefixIcon: const Icon(Icons.search),
                    ),
                    onSubmitted: (value) =>
                        setState(() => _search = value.trim()),
                  ),
                ),
                IconButton(
                  tooltip: context.locale.savedCirculars,
                  icon: const Icon(Icons.bookmarks_outlined),
                  onPressed: () =>
                      context.pushNamed(Routes.savedCirculars.name),
                ),
              ],
            ),
          ),
          TabBar(
            tabs: [
              Tab(text: context.locale.running),
              Tab(text: context.locale.archived),
            ],
          ),
          Expanded(
            child: TabBarView(
              children: [
                CircularListView(
                  type: CircularListType.running,
                  search: _search,
                ),
                CircularListView(
                  type: CircularListType.archived,
                  search: _search,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
