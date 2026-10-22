#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
compose=(docker compose --env-file .env.production -f compose.production.yml)
"${compose[@]}" config --quiet
# Sequential builds reduce peak RAM use on the EC2 host.
"${compose[@]}" build backend
"${compose[@]}" build web
"${compose[@]}" up -d --wait mysql
"${compose[@]}" run --rm --no-deps backend php artisan migrate --force
"${compose[@]}" up -d --wait --wait-timeout 240
"${compose[@]}" ps
