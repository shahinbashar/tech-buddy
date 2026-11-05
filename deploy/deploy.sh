#!/usr/bin/env bash
# Rolls the production stack to a new image tag. Runs on the deploy server.
#
#   IMAGE_TAG=<git sha> API_IMAGE=ghcr.io/<owner>/tech-buddy-api \
#   WEB_IMAGE=ghcr.io/<owner>/tech-buddy-web ./deploy.sh
#
# Steps: pull images → apply database migrations → start the new containers and wait until
# their health checks pass. If they never become healthy, the previous tag is restored and
# the script exits non-zero so the workflow run fails.
#
# Migrations are not rolled back. Keep them backward compatible (add columns before code
# uses them, drop them a release later) so the previous tag still runs on the new schema.
set -euo pipefail

cd "$(dirname "$0")"

: "${IMAGE_TAG:?IMAGE_TAG is required}"
: "${API_IMAGE:?API_IMAGE is required}"
: "${WEB_IMAGE:?WEB_IMAGE is required}"
export IMAGE_TAG API_IMAGE WEB_IMAGE

if [[ ! -f .env ]]; then
  echo "deploy: .env not found in $(pwd); copy .env.example and fill it in first." >&2
  exit 1
fi

TAG_FILE=.deployed-tag
previous_tag="$(cat "$TAG_FILE" 2>/dev/null || true)"
# Generous: the first start waits for Caddy to issue a certificate and for migrations.
WAIT_TIMEOUT="${WAIT_TIMEOUT:-180}"

compose() {
  docker compose --file compose.prod.yml "$@"
}

echo "deploy: ${previous_tag:-<none>} → ${IMAGE_TAG}"

compose pull api web
compose up --detach --wait postgres
compose run --rm --no-deps api node_modules/.bin/prisma migrate deploy

if compose up --detach --wait --wait-timeout "$WAIT_TIMEOUT" --remove-orphans; then
  echo "$IMAGE_TAG" > "$TAG_FILE"
  # Keep the previous release's images for a quick manual rollback; drop older ones.
  docker image prune --force --filter "until=168h" > /dev/null
  echo "deploy: ${IMAGE_TAG} is live"
  exit 0
fi

echo "deploy: ${IMAGE_TAG} failed its health checks" >&2
compose ps >&2
compose logs --tail 80 api web >&2 || true

if [[ -n "$previous_tag" ]]; then
  echo "deploy: rolling back to ${previous_tag}" >&2
  IMAGE_TAG="$previous_tag" compose up --detach --wait --wait-timeout "$WAIT_TIMEOUT"
fi
exit 1
