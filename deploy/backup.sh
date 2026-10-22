#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
umask 077
backup_dir="backups/$(date -u +%Y%m%dT%H%M%SZ)"
mkdir -p "$backup_dir"
compose=(docker compose --env-file .env.production -f compose.production.yml)
"${compose[@]}" exec -T mysql sh -c 'MYSQL_PWD="$MYSQL_PASSWORD" exec mysqldump -u"$MYSQL_USER" --single-transaction --no-tablespaces --set-gtid-purged=OFF "$MYSQL_DATABASE"' | gzip > "$backup_dir/database.sql.gz"
"${compose[@]}" exec -T web tar -C /srv/uploads -czf - . > "$backup_dir/uploads.tar.gz"
echo "Backup: $backup_dir. Copy it to storage outside the EC2 instance."
