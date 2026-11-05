# Deployment

Merging a pull request into `main` deploys it. Nothing else to run.

```
PR merged → CI (lint, typecheck, unit + e2e tests, builds)
          → Docker images pushed to GHCR (tagged with the commit SHA)
          → SSH to the server → migrations → new containers → health checks
          → smoke test against the public URL
          → Android APK attached to the run (in parallel with the deploy)
```

- **Deploys run one at a time in merge order.** A newer merge waits; it never cancels a deploy part-way through migrations.
- **Automatic rollback.** If the new containers don't pass their health checks, `deploy.sh` restarts the previous release and the run fails.
- **Manual redeploy.** Actions → Deploy → _Run workflow_.

## Architecture

One Linux server running Docker Compose (`compose.prod.yml`):

| Service    | Role                                                                                                     |
| ---------- | -------------------------------------------------------------------------------------------------------- |
| `caddy`    | HTTPS (automatic Let's Encrypt), routes `/api/*` and `/uploads/*` to the API and the rest to the web app |
| `web`      | Next.js standalone server                                                                                |
| `api`      | NestJS; uploads on the `uploads` volume                                                                  |
| `postgres` | PostgreSQL 16 on the `pgdata` volume; not exposed to the internet                                        |

The web app, the API and the mobile app share one origin (`https://DOMAIN`, API at `https://DOMAIN/api`), so the web app's httpOnly cookie works without CORS.

## One-time setup

### 1. Server

Any VPS with 2 GB RAM or more (Ubuntu 24.04 shown):

```bash
curl -fsSL https://get.docker.com | sh
```

```bash
sudo adduser --disabled-password --gecos "" deploy && sudo usermod -aG docker deploy
```

```bash
sudo mkdir -p /opt/tech-buddy && sudo chown deploy:deploy /opt/tech-buddy
```

- Open ports 80 and 443.
- Point the domain's DNS A (and AAAA) record at the server.

### 2. Production settings on the server

As the `deploy` user, create `/opt/tech-buddy/.env` from [`.env.example`](.env.example) and fill in `DOMAIN`, `POSTGRES_PASSWORD`, `JWT_SECRET` and the `SEED_ADMIN_*` values. Generate the secrets with:

```bash
openssl rand -hex 48
```

Secrets stay on the server. The workflow never sees them.

### 3. Deploy key

On your machine, create a key pair for GitHub Actions:

```bash
ssh-keygen -t ed25519 -N "" -C "github-actions-deploy" -f tech-buddy-deploy
```

Append `tech-buddy-deploy.pub` to `/home/deploy/.ssh/authorized_keys` on the server. Then record the server's host key, so the workflow refuses impostors:

```bash
ssh-keyscan -p 22 your.server.ip
```

### 4. GitHub settings

Repository → Settings → Environments → **New environment** named `production`. Add these **secrets** to it:

| Secret               | Value                                           |
| -------------------- | ----------------------------------------------- |
| `DEPLOY_HOST`        | Server IP or hostname                           |
| `DEPLOY_USER`        | `deploy`                                        |
| `DEPLOY_SSH_KEY`     | Contents of the private key `tech-buddy-deploy` |
| `DEPLOY_KNOWN_HOSTS` | Output of `ssh-keyscan`                         |
| `DEPLOY_PORT`        | Optional, defaults to `22`                      |

Repository → Settings → Secrets and variables → Actions → **Variables**:

| Variable              | Value                                           |
| --------------------- | ----------------------------------------------- |
| `SITE_URL`            | `https://your-domain`, without a trailing slash |
| `DEPLOY_PATH`         | Optional, defaults to `/opt/tech-buddy`         |
| `MOBILE_API_BASE_URL` | Optional, defaults to `SITE_URL` + `/api`       |

Recommended:

- **Branch protection on `main`.** Require a pull request, and require the CI checks to pass.
- **Required reviewers on the `production` environment**, if you want a manual approval before each deploy.

Until `DEPLOY_HOST` and `DEPLOY_USER` exist, merges still publish images; the deploy step skips with a warning.

### 5. First admin account

After the first successful deploy, create the admin account once. This uses the `SEED_ADMIN_*` values from `.env` and creates no demo content:

```bash
cd /opt/tech-buddy && export IMAGE_TAG=$(cat .deployed-tag) API_IMAGE=ghcr.io/<owner>/tech-buddy-api WEB_IMAGE=ghcr.io/<owner>/tech-buddy-web
```

```bash
docker compose -f compose.prod.yml run --rm --no-deps api node dist-seed/seed.js
```

Then remove `SEED_ADMIN_PASSWORD` from `.env`.

### 6. Study content

Import the Learning notes: subjects, topics, Markdown notes and practice MCQs. It's safe to
re-run after each content update, because it updates in place:

```bash
docker compose -f compose.prod.yml run --rm --no-deps api node dist-seed/learning/import.js
```

## Operations

All commands run in `/opt/tech-buddy` and need these variables exported:

```bash
export IMAGE_TAG=$(cat .deployed-tag) API_IMAGE=ghcr.io/<owner>/tech-buddy-api WEB_IMAGE=ghcr.io/<owner>/tech-buddy-web
```

| Task            | Command                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Status          | `docker compose -f compose.prod.yml ps`                                                                                  |
| Logs            | `docker compose -f compose.prod.yml logs -f api web`                                                                     |
| Roll back       | `IMAGE_TAG=<older sha> ./deploy.sh` (or re-run an older Deploy workflow run)                                             |
| Database backup | `docker compose -f compose.prod.yml exec -T postgres pg_dump -U techbuddy techbuddy \| gzip > backup-$(date +%F).sql.gz` |

**Migrations are never rolled back.** Keep them backward compatible: add a column in one release, start using it, and drop the old one in a later release. That way a rollback can still run on the newer schema.
