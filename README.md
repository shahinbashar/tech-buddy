# Tech Buddy — Bangladesh Job Preparation & Career Portal

A full-stack MVP for candidates preparing for Bangladesh government (initially IT-related) recruitment exams:
job circulars, topic-wise study notes, a timed daily MCQ exam with server-side scoring, a progress dashboard and
admin-managed premium access.

| Layer            | Stack                                                                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Web (`apps/web`) | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui (Radix), TanStack Query, React Hook Form + Zod, Recharts |
| API (`apps/api`) | NestJS 11, Prisma 6, PostgreSQL 16, JWT (httpOnly cookie), class-validator, Swagger, Throttler, Helmet                             |
| Tooling          | pnpm workspaces, Docker Compose (PostgreSQL), ESLint 9, Prettier, Jest (API), Vitest (web)                                         |

Architecture, entities, scope decisions and risks: **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** ·
Code review findings: **[docs/REVIEW.md](docs/REVIEW.md)** · Competitive audit: **[docs/PRODUCT_AUDIT.md](docs/PRODUCT_AUDIT.md)**.

---

## Quick start

Prerequisites: **Node.js ≥ 20.18**, **pnpm 10** (`corepack enable`), **Docker** (or a local PostgreSQL 16).

```bash
pnpm install
```

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

Edit `apps/api/.env`: set a random `JWT_SECRET` (≥ 32 chars) and your own `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`.

```bash
pnpm db:up
```

```bash
pnpm --filter api prisma:deploy
```

```bash
pnpm --filter api db:seed
```

```bash
pnpm dev
```

| URL                              | What                                           |
| -------------------------------- | ---------------------------------------------- |
| http://localhost:3000            | Web app                                        |
| http://localhost:3000/admin      | Admin dashboard (log in with the seeded admin) |
| http://localhost:4000/api/docs   | Swagger API docs                               |
| http://localhost:4000/api/health | Health check                                   |

> Using a local PostgreSQL instead of Docker? Point `DATABASE_URL` in `apps/api/.env` at it and skip `pnpm db:up`.

### Useful scripts

| Command                                      | Description                                          |
| -------------------------------------------- | ---------------------------------------------------- |
| `pnpm dev`                                   | Run API (watch) and web (dev) together               |
| `pnpm build`                                 | Production build of both apps                        |
| `pnpm lint` / `pnpm typecheck` / `pnpm test` | Quality checks across the workspace                  |
| `pnpm format`                                | Prettier                                             |
| `pnpm --filter api prisma:migrate`           | Create a new migration after editing `schema.prisma` |
| `pnpm --filter api db:reset`                 | Drop, re-migrate and re-seed the database            |
| `pnpm --filter api prisma:studio`            | Browse the database                                  |

---

## Features

### Public

- **Job circulars** — running (published & deadline not passed) and archived lists, search by organization/designation,
  category & deadline filters, pagination, deadline badges, detail page with eligibility, dates, apply link and PDF/image attachments.
- **Study notes** — subjects → topics → subtopics, Markdown notes (tables, code), premium notes shown as locked.
- About, Contact and Premium plans pages.

### Registered users

- Register → choose a preparation goal → study → daily exam → review → track weak topics.
- **Daily exam** — auto-generated each day (configurable), 20 questions / 20 minutes by default, shuffled question and
  option order, countdown synced to server time, autosaved answers, auto-submit at zero, resumable after reload,
  one attempt unless the exam allows retakes.
- **Results** — marks, percentage, accuracy, time spent, subject breakdown, correct answer + explanation per question.
- **Dashboard** — exams taken, average/best score, accuracy, topic completion, streak, score trend, subject-wise
  performance, correct vs incorrect, weak topics.
- **Practice mode** — private practice sets by subject/topic, or **"my mistakes"** (questions you last answered
  wrong); one-click practice from any weak topic.
- **Past papers** — practise a previous exam paper as one set (questions grouped by their `reference`); premium-only
  papers are shown locked.
- **Merit list** — rank, participants and "top N%" for each daily exam (first attempts only, privacy-friendly names).
- **Saved circulars** — bookmark circulars; the dashboard highlights saved ones closing within 7 days.
- Exam history, learning progress (completed/pending topics), premium status, profile & password
  (changing it signs out all other devices).

### Admin

- Circulars (CRUD, publish/feature toggles, attachments), subjects, topics/subtopics, Markdown notes with preview and
  attachments, question bank (CRUD, filters, CSV import with row-level validation), daily exams (settings,
  random selection by subject, regenerate before first attempt), users (activate/deactivate), premium access (grant by plan
  or custom expiry, revoke).

---

## Key design decisions

| Decision                                                                                | Why                                                                                                           |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Circular status is **derived** from `isPublished` + `applicationDeadline`               | No cron job, never stale                                                                                      |
| Business dates use **Asia/Dhaka** (UTC+6)                                               | "Today's exam" and "closing today" match what candidates see                                                  |
| JWT in an **httpOnly, SameSite=Lax cookie**; `/api/*` proxied by Next.js                | No token in JS, no CORS needed, SSR can forward the session                                                   |
| **Per-attempt snapshots** (`ExamAnswer`)                                                | Editing/deleting questions never changes past results                                                         |
| Correct answers **never sent** before submission; scoring & expiry enforced server-side | Client cannot cheat                                                                                           |
| Free exams only draw **free** questions                                                 | Premium content never leaks through exams                                                                     |
| `Role` as a Postgres enum                                                               | Two fixed roles don't justify a table                                                                         |
| One level of subtopics                                                                  | Matches the syllabus structure; avoids recursive UI                                                           |
| `PremiumPlan` + `PremiumEntitlement` + `Payment`                                        | Admin grants today; bKash/Nagad/SSLCommerz can create `Payment` → `Entitlement` later without schema redesign |
| Services throw Nest HTTP exceptions; Prisma errors mapped in one filter                 | Idiomatic NestJS; single place for DB error translation                                                       |

### Security

bcrypt (12 rounds) · global JWT guard (`@Public()` opt-out) · role guard · DTO whitelist validation · rate limiting
(120 req/min, 10/min on auth) · Helmet · upload allow-list (PDF/JPEG/PNG/WebP) with **magic-byte checks**, size limit and
random file names · Markdown rendered without raw HTML · deactivated users lose access immediately.

---

## Testing

```bash
pnpm test
```

```bash
pnpm --filter api test:e2e
```

- **API e2e (Jest + Supertest, real Postgres):** runs against an isolated `e2e` schema (migrations applied with the
  non-destructive `migrate deploy`; data is unique per run). Covers auth & cookies, RBAC, session revocation,
  premium gating, the full exam lifecycle (races, expiry, answer leakage), practice and past papers, leaderboard,
  saved circulars and mobile token auth.

- **API (Jest):** scoring & negative marking, attempt snapshot building (no answer leakage), shuffle fairness, circular
  status, Dhaka date helpers, streak calculation, CSV parsing/validation, upload validation, entitlement status, Prisma
  error mapping.
- **Web (Vitest):** deadline badges, Dhaka datetime conversion, countdown formatting, form schemas, safe redirects.

---

## Mobile API (token auth)

Native clients use `POST /api/auth/mobile/register|login` → `{ user, accessToken, refreshToken }`, send
`Authorization: Bearer <accessToken>`, and rotate tokens with `POST /api/auth/mobile/refresh { refreshToken }`.
Refresh tokens are rejected as access tokens and are revoked together with web sessions.

## Project structure

```
apps/
  api/     NestJS — prisma/ (schema, migrations, seed), src/common, src/modules/<feature>
  web/     Next.js — src/app/(public|app|focus)/, src/app/admin/, src/components/<area>/, src/lib/
  mobile/  Flutter — candidate app (Home, Circulars, Study, Exams, Profile); see apps/mobile/README.md
docs/ARCHITECTURE.md
docker-compose.yml
```

## Out of scope for the MVP (intentionally)

Automated circular scraping · payment gateway checkout · password-reset / email verification · push notifications ·
full i18n on the web · private-sector preparation tracks.

## Production notes

- Set `NODE_ENV=production`, `COOKIE_SECURE=true` (HTTPS), a strong `JWT_SECRET`, and `API_URL` for the web app.
- Run `pnpm --filter api prisma:deploy` on release; never run the seed with default credentials.
- Uploads are stored on local disk (`UPLOAD_DIR`); mount a persistent volume or move to object storage when scaling out.
