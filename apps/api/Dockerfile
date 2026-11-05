# syntax=docker/dockerfile:1
# Production image for the NestJS API. Build from the repository root:
#   docker build -f apps/api/Dockerfile .

ARG NODE_VERSION=22-alpine

FROM node:${NODE_VERSION} AS base
# The Node Alpine image already ships libssl 3, which is all Prisma's engines need.
RUN corepack enable
WORKDIR /repo

# ── Compile the API and the seed script ──
FROM base AS build
COPY . .
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --filter api
RUN pnpm --filter api exec prisma generate \
 && pnpm --filter api build \
 && pnpm --filter api build:seed

# ── Production dependencies only, with the Prisma client for this platform ──
FROM base AS prod-deps
COPY . .
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --prod --filter api
RUN pnpm --filter api exec prisma generate

# ── Runtime ──
FROM node:${NODE_VERSION} AS runtime
ENV NODE_ENV=production \
    PORT=4000 \
    UPLOAD_DIR=/data/uploads
WORKDIR /repo/apps/api
# pnpm links apps/api/node_modules into the root store, so both trees are copied.
COPY --from=prod-deps --chown=node:node /repo/node_modules /repo/node_modules
COPY --from=prod-deps --chown=node:node /repo/apps/api/node_modules ./node_modules
COPY --from=build --chown=node:node /repo/apps/api/dist ./dist
COPY --from=build --chown=node:node /repo/apps/api/dist-seed ./dist-seed
COPY --chown=node:node apps/api/package.json ./
COPY --chown=node:node apps/api/prisma ./prisma
RUN mkdir -p /data/uploads && chown node:node /data/uploads
USER node
EXPOSE 4000
HEALTHCHECK --interval=15s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:4000/api/health > /dev/null || exit 1
CMD ["node", "dist/main.js"]
