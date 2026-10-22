# BLGames

Frontend React/Vite e API Laravel/Sanctum com MySQL.

Para publicar em uma EC2 Ubuntu 24.04 com Docker, veja [o guia de implantação](docs/DEPLOY-AWS.md).

- Produção: `compose.production.yml`, `Dockerfile` e scripts em `deploy/`.
- Desenvolvimento: `docker-compose.yml` mantém o banco local separado.
- Configuração de produção: copiar `.env.production.example` para `.env.production` e preencher conforme o guia.
