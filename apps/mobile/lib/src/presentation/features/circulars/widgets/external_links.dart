import 'package:url_launcher/url_launcher.dart';

import '../../../../data/services/network/endpoints.dart';

/// Uploads are served next to the API (`/uploads/...`), not under `/api`.
Uri resolveServerUrl(String url) {
  if (url.startsWith('http')) return Uri.parse(url);
  final origin = Endpoints.base.replaceFirst(RegExp(r'/api/?$'), '');
  return Uri.parse('$origin$url');
}

Future<bool> openExternal(String url) =>
    launchUrl(resolveServerUrl(url), mode: LaunchMode.externalApplication);
