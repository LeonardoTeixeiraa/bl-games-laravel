#!/bin/sh
set -eu
mkdir -p storage/app/public storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs
# Also waits after a host reboot: Compose startup ordering is not applied by Docker restart policies.
php -r '
for ($i = 0; $i < 60; $i++) {
    try {
        new PDO("mysql:host=".getenv("DB_HOST").";port=3306;dbname=".getenv("DB_DATABASE"), getenv("DB_USERNAME"), getenv("DB_PASSWORD"), [PDO::ATTR_TIMEOUT => 3]);
        exit(0);
    } catch (PDOException $e) { sleep(2); }
}
fwrite(STDERR, "Database unavailable after retries.\n"); exit(1);
'
php artisan config:cache
php artisan view:cache
exec "$@"
