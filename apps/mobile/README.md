# Tech Buddy — Mobile (Flutter)

The candidate-facing mobile app for Tech Buddy: daily exams, circulars and progress, on the same NestJS API as the web app.

Bootstrapped from **[momshaddinury/flutter_template](https://github.com/momshaddinury/flutter_template)** and kept on its architecture. See [`docs/`](docs) for the template's architecture, network, router and DI guides.

## Features

| Tab | What it does |
| --- | --- |
| **Home** | Today's exam, saved circulars closing within 7 days, streak, stats, weak topics with one-tap practice |
| **Circulars** | Running and archived tabs, search, pagination, detail page with save, "apply online" and attachments |
| **Study** | Subjects with progress, topic tree (premium topics marked), Markdown notes, mark complete, practise a topic, previous/next topic; weak topics on Home open their notes |
| **Exams** | Start or resume the daily exam, "practise my mistakes", random practice |
| **Profile** | Saved circulars, language (English / বাংলা), logout |

The exam runner corrects the countdown for device clock drift using the server time. It saves answers one request at a time, so they reach the server in order, and it auto-submits exactly once when time runs out. A leave guard warns before you exit. The result screen shows the score, the merit list (not for practice sets) and an answer review with explanations.

## Run

Requirements: **Flutter ≥ 3.47 (Dart ≥ 3.13)**, and the API running (see the root README).

```bash
flutter pub get
```

```bash
dart run build_runner build --delete-conflicting-outputs
```

```bash
flutter run --dart-define=API_BASE_URL=http://10.0.2.2:4000/api
```

- `API_BASE_URL` defaults to `http://10.0.2.2:4000/api`, which is the host machine as seen from the Android emulator. Use `http://localhost:4000/api` for the iOS simulator or web, and your LAN IP for a physical device.
- For web, add the app's origin to the API's `CORS_ORIGINS`.

```bash
flutter analyze
```

```bash
flutter test
```

## Architecture (from the template)

```
lib/src/
  core/          DI (Riverpod codegen), Result type, extensions, l10n
  data/          Retrofit client, dart_mappable models, mappers, repository impls
  domain/        entities, repository interfaces, use cases (no Flutter/Riverpod)
  presentation/  router (go_router + RedirectGate), theme (ThemeExtension), features/
```

- **Auth:** `POST /auth/mobile/login|register` returns access and refresh tokens. `TokenManager` stores them in secure storage. Protected calls carry `RequestAuth.protected`, and on a 401 the refresh interceptor calls `/auth/mobile/refresh` and replays the request.
- **Errors:** repositories wrap work in `asyncGuard` → `Result<T, BusinessFailure>`. Providers unwrap with `getOrThrow()`, and `AsyncValueView` / `FailureView` render loading, error and retry states consistently, showing the server's message where it has one.
- **Widgets:** every UI piece is its own widget class (no widget-builder helper methods). Spacing, colours and radii come from theme tokens (`context.dimensions`, `context.color`).

## Changes made to the template
- Domain no longer imports Riverpod internals: repository reset moved into the DI layer and lists repositories explicitly.
- `vector_graphics` (used by generated SVG asset code) is declared explicitly.
- Package renamed `flutter_template` → `tech_buddy`; app label is "Tech Buddy".
- Login uses email, and registration is wired end to end (the template's page was UI-only).
- `MyApp` watches `goRouterProvider` instead of reading it. Riverpod 3 pauses providers that nobody listens to, which paused the router's gate subscription and left the app stuck on splash.
- Onboarding and the brand mark describe Tech Buddy (circulars → daily exam → weak topics) instead of the template's Flutter copy; the Arabic locale was removed (the product ships English and Bangla).
