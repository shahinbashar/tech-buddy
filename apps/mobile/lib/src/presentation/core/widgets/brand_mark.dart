import 'package:flutter/material.dart';

import '../../../core/extensions/localization.dart';
import '../theme/theme.dart';

/// The Tech Buddy brand mark: a graduation cap on a rounded brand tile.
///
/// Drawn from theme tokens rather than an image asset, so it follows light
/// and dark mode and needs no asset pipeline. Pass one of the
/// `context.dimensions.layout.logo*` sizes.
class BrandMark extends StatelessWidget {
  const BrandMark({required this.size, super.key});

  final double size;

  /// Icon and corner radius as fractions of the tile, so the mark keeps its
  /// proportions at every size.
  static const double _iconRatio = 0.56;
  static const double _radiusRatio = 0.24;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: context.locale.appTitle,
      image: true,
      child: Container(
        width: size,
        height: size,
        decoration: BoxDecoration(
          color: context.color.primary.defaultValue,
          borderRadius: BorderRadius.circular(size * _radiusRatio),
        ),
        child: Icon(
          Icons.school_rounded,
          size: size * _iconRatio,
          color: context.color.text.onPrimary,
        ),
      ),
    );
  }
}
