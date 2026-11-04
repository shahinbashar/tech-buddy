# Tech Buddy — Architecture & MVP Design

## 1. Requirement analysis (summary)

| Area          | Core need                                                    | MVP decision                                                                               |
| ------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| Job circulars | Public portal, running vs archived, admin CRUD + attachments | Status is **derived** (never stored): `running = isPublished && deadline >= now`           |
| Learning      | Subject → Topic → Subtopic → Notes (Markdown)                | One level of subtopics (`Topic.parentId`), Markdown rendered safely (no raw HTML)          |
| Question bank | Reusable 4-option MCQs with explanation                      | Service enforces exactly 4 options / 1 correct; CSV import                                 |
| Daily exam    | Timed, randomized, server-scored, one attempt by default     | Per-attempt **snapshot** of questions/options/answers; server-side expiry                  |
| Dashboard     | Scores, accuracy, subject-wise, topic progress, weak topics  | Aggregations computed from attempt snapshots                                               |
| Premium       | FREE/PREMIUM content, admin-granted entitlements with expiry | `PremiumEntitlement` + `PremiumPlan` + `Payment` (schema-ready for bKash/Nagad/SSLCommerz) |

## 2. Architecture

```
Browser ──► Next.js (apps/web, :3000)
              │  • Server Components fetch public data (SSR, SEO)
              │  • Client Components use TanStack Query
              │  • /api/* and /uploads/* are rewritten to the API (same origin)
              ▼
           NestJS REST API (apps/api, :4000)  ──►  PostgreSQL (Prisma)
              • Modules: auth, users, circulars, subjects, topics, notes,
                questions, examinations, progress, dashboard, premium, uploads
              • Global: ValidationPipe, JWT guard, Roles guard, Throttler,
                Prisma exception filter, Swagger at /api/docs
```

Key decisions:

- **Modular monolith.** No microservices, no Redis, no queues.
- **Same-origin API via Next rewrites.** The JWT lives in an `httpOnly`, `SameSite=Lax` cookie set by the API; the browser never touches the token. Swagger/CLI clients can use `Authorization: Bearer`.
- **Global-by-default auth.** Every route requires a JWT unless decorated with `@Public()`. Public routes still read the cookie optionally (to unlock premium content).
- **Errors.** Services throw Nest `HttpException`s; Prisma errors are mapped centrally in one exception filter (`P2002 → 409`, `P2025 → 404`, `P2003 → 409`). The web client converts every non-2xx into a typed `ApiError` and shows a friendly toast.
- **Scoring is backend-only.** Correct answers are never sent before submission.

## 3. Core entities & relationships

```
User 1─* ExamAttempt 1─* ExamAnswer (snapshot)
User 1─* UserTopicProgress *─1 Topic
User 1─* PremiumEntitlement *─0..1 PremiumPlan
User 1─* Payment (future gateway)

Subject 1─* Topic 1─* Topic (subtopics, one level)
Topic   1─* Note 1─* Attachment
Subject 1─* Question *─0..1 Topic
Question 1─* QuestionOption (exactly 4, one correct)

Exam 1─* ExamQuestion *─1 Question
Exam 1─* ExamAttempt
JobCircular 1─* Attachment
ExamSettings (singleton: default question count, duration, auto-generation)
```

- `Role` is a Postgres enum (`ADMIN`, `USER`) — simpler than a table for two fixed roles.
- **Historical consistency:** when an attempt starts, each question is copied into `ExamAnswer` (text, options in shuffled order, correct option id, explanation, subject/topic names). Editing or deleting a question later never changes past results.
- Indexes on every filter column (`isPublished`, `applicationDeadline`, `category`, `subjectId`, `topicId`, `userId`), unique constraints on slugs, `(userId, topicId)` progress, `(examId, questionId)`, `(examId, userId, attemptNumber)`.

## 4. MVP scope

In scope: everything in phases 1–6 of the brief (see README for the feature list).

Explicitly out of scope (documented, not stubbed): scraping, private-job prep, payment gateway checkout, email verification / password reset email, saved circulars, refresh-token rotation, full i18n.

## 5. Folder structure

```
apps/
  api/                    NestJS
    prisma/               schema.prisma, migrations/, seed.ts
    src/
      common/             guards, decorators, filters, utils (pure, unit-tested)
      config/             typed env validation
      prisma/             PrismaService (global)
      modules/<feature>/  controller, service, dto/
  web/                    Next.js App Router
    src/
      app/(public)/       home, circulars, subjects, auth, about, contact, premium
      app/(app)/          dashboard, exams, profile (authenticated)
      app/admin/          admin dashboard
      components/ui/      shadcn/ui primitives
      components/<area>/  feature components
      lib/                api client, query keys, utils, constants
      types/              API response types
docs/ARCHITECTURE.md
docker-compose.yml        PostgreSQL for local dev
```

## 6. Technical risks & mitigations

| Risk                                            | Mitigation                                                                                               |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Timezone bugs around deadlines / "today's exam" | All instants stored in UTC; business "day" is `Asia/Dhaka` (UTC+6, no DST) via one helper on each side   |
| Cheating: client-side scoring, answer leaks     | Answers stripped from in-progress payloads; scoring + expiry enforced server-side; late answers rejected |
| Duplicate attempts under race                   | `@@unique([examId, userId, attemptNumber])`                                                              |
| Question edits corrupting history               | Per-attempt snapshots                                                                                    |
| Unsafe uploads                                  | MIME + extension allow-list (PDF/JPEG/PNG/WebP), size limit, random file names, served as static files   |
| XSS via notes                                   | Markdown rendered with `react-markdown` (raw HTML disabled)                                              |
| Premium leakage                                 | Premium bodies are stripped server-side unless the caller has an active entitlement                      |
| Brute force                                     | Global throttling + stricter limit on auth routes                                                        |
