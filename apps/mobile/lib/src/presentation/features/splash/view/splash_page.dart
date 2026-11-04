import 'package:flutter/material.dart';

import '../../../core/theme/theme.dart';
import '../../../core/widgets/brand_mark.dart';

class SplashPage extends StatelessWidget {
  const SplashPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: context.color.background.surface,
      body: Center(child: BrandMark(size: context.dimensions.layout.logo)),
    );
  }
}
