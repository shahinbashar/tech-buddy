# syntax=docker/dockerfile:1
# Production image for the Next.js web app (standalone server). Build from the repository root:
#   docker build -f apps/web/Dockerfile --build-arg SITE_URL=https://example.com .

ARG NODE_VERSION=22-alpine

FROM node:${NODE_VERSION} AS build
RUN corepack enable
WORKDIR /repo
COPY . .
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --filter web
# Baked in at build time: the public URL (metadata, sitemap) and the API address the Next.js
# rewrites point at — the `api` service on the Compose network.
ARG SITE_URL=http://localhost:3000
ARG API_URL=http://api:4000
ENV NEXT_OUTPUT=standalone \
    NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_SITE_URL=${SITE_URL} \
    API_URL=${API_URL}
RUN pnpm --filter web build

FROM node:${NODE_VERSION} AS runtime
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY --from=build --chown=node:node /repo/apps/web/.next/standalone ./
COPY --from=build --chown=node:node /repo/apps/web/.next/static ./apps/web/.next/static
COPY --from=build --chown=node:node /repo/apps/web/public ./apps/web/public
USER node
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/robots.txt > /dev/null || exit 1
CMD ["node", "apps/web/server.js"]
