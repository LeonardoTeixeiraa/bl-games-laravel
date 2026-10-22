FROM node:24-bookworm-slim AS frontend
WORKDIR /build
COPY blgames-frontend/package*.json ./
RUN npm ci --no-audit --no-fund
COPY blgames-frontend/ ./
RUN npm run build

FROM php:8.4-fpm-bookworm AS backend
RUN apt-get update && apt-get install -y --no-install-recommends libicu-dev libzip-dev unzip \
    && docker-php-ext-install -j2 pdo_mysql intl zip opcache bcmath \
    && rm -rf /var/lib/apt/lists/*
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer
WORKDIR /var/www/html
COPY blgames-backend/composer.json blgames-backend/composer.lock ./
RUN composer install --no-dev --prefer-dist --no-interaction --no-scripts --no-autoloader
COPY blgames-backend/ ./
RUN composer dump-autoload --no-dev --optimize \
    && mkdir -p storage/app/public storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs \
    && chown -R www-data:www-data storage bootstrap/cache
COPY deploy/php.ini /usr/local/etc/php/conf.d/production.ini
COPY deploy/fpm.conf /usr/local/etc/php-fpm.d/zz-production.conf
COPY deploy/entrypoint.sh /usr/local/bin/blgames-entrypoint
RUN chmod +x /usr/local/bin/blgames-entrypoint
ENV XDG_CONFIG_HOME=/tmp
USER www-data
ENTRYPOINT ["blgames-entrypoint"]
CMD ["php-fpm", "-F"]

FROM caddy:2-alpine AS web
COPY deploy/Caddyfile /etc/caddy/Caddyfile
COPY --from=frontend /build/dist /srv/frontend
COPY blgames-backend/public/index.php /var/www/html/public/index.php
