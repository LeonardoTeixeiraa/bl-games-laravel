# BLGames na EC2 — aula de segurança

Configuração solicitada: **AWS us-east-1**, **Ubuntu Server 24.04 LTS**, acesso **HTTP pelo IP público**, sem domínio. Todas as dependências da aplicação rodam em Docker. As regras de autenticação, permissões e seeders originais foram mantidas.

## Dimensionamento

**Recomendação: t3.medium (2 vCPUs, 4 GiB RAM), Ubuntu amd64 e EBS gp3 de 30 GiB.** Dá margem para compilar o projeto na própria EC2 e executar PHP, MySQL e servidor web juntos.

| Opção | Recursos | Uso |
| --- | --- | --- |
| t3.small | 2 vCPU / 2 GiB | Alternativa econômica para laboratório com poucas pessoas; build pode precisar ocorrer fora da EC2 e os limites de memória devem ser ajustados |
| t3.medium | 2 vCPU / 4 GiB | Escolha recomendada para esta configuração e build na própria máquina |

A AWS lista preços Linux On-Demand de referência de US$ 0,0209/h para t3.small e US$ 0,0418/h para t3.medium em US East (N. Virginia). Em 730 horas, a t3.medium representa aproximadamente US$ 30,51 **somente de computação**. EBS, IPv4 público, tráfego, snapshots, créditos extras de CPU e impostos são separados. Confirmar na [página T3](https://aws.amazon.com/ec2/instance-types/t3/) e na [calculadora AWS](https://calculator.aws/) antes de criar a instância.

Estimativa de RAM em execução, sem teste de carga: SO/Docker 400–700 MiB; MySQL 400–900 MiB; PHP 250–1000 MiB conforme concorrência; Caddy 30–150 MiB. Limites de containers são tetos, não reservas. O build tem consumo adicional e o script constrói imagens sequencialmente. O número de alunos simultâneos ainda não foi informado; não há capacidade garantida por contagem de usuários.

Usar `docker stats`, `free -h`, `df -h` e os gráficos de CPU/créditos do CloudWatch durante a aula. Se memória sustentada superar 75%, aparecer swap frequente ou as respostas ficarem lentas, investigar e aumentar recursos. T3 usa créditos de CPU; carga sustentada pode gerar cobrança adicional no modo Unlimited.

## O que roda no Docker

- **web:** Caddy, servindo o React/Vite já compilado. Encaminha `/api/*` e `/up` para PHP-FPM e serve as imagens de `/storage/*`.
- **backend:** Laravel 13 / Sanctum, PHP 8.4 FPM, Composer e extensões necessárias. Não usa `artisan serve` em execução.
- **mysql:** MySQL 8.4 LTS, com volume persistente.

Node/npm existem apenas no estágio de build. Não é necessário instalar PHP, Composer, Node, MySQL ou Caddy no Ubuntu. O código atual não despacha jobs nem possui tarefas agendadas, portanto não foram adicionados Redis, worker ou cron. Cache usa arquivos e a fila é síncrona.

O `docker-compose.yml` antigo, com MySQL 8.0, continua separado para desenvolvimento. O novo `compose.production.yml` tem volumes próprios e não importa automaticamente o banco nem as imagens existentes.

## 1. Criar a instância

Na região **us-east-1 (N. Virginia)**:

1. AMI Ubuntu Server **24.04 LTS x86_64/amd64**.
2. Instância **t3.medium**, disco **gp3 30 GiB**.
3. Subnet pública com rota para Internet Gateway e IPv4 público.
4. Security Group: TCP **22** do seu IP para SSH; TCP **80** dos IPs que acessarão a aula. Se os alunos precisarem acessar de qualquer rede, a regra de 80 pode usar `0.0.0.0/0`.
5. Não é preciso abrir 443 para esta configuração HTTP. MySQL e PHP-FPM não publicam portas no host.

Um Elastic IP mantém o endereço após stop/start. Sem ele, o IP público pode mudar; nesse caso, atualizar `SITE_ADDRESS` e `APP_URL` e executar novamente o deploy. Não há configuração de DNS nem emissão de certificado no modo HTTP pelo IP.

## 2. Copiar o projeto e instalar Docker

Enviar também os novos arquivos Dockerfile, compose.production.yml, deploy/ e .env.production.example. Exemplo com Git, substituindo a URL:

```bash
sudo apt-get update
sudo apt-get install -y git
sudo mkdir -p /opt/blgames
sudo chown ubuntu:ubuntu /opt/blgames
git clone SUA_URL_DO_REPOSITORIO /opt/blgames
cd /opt/blgames
sudo bash deploy/install-docker-ubuntu.sh
```

O script instala Engine, Buildx e Compose pelo repositório oficial Docker e habilita Docker/containerd no boot. Foi preparado para Ubuntu 24.04 novo. Se houver outra instalação de Docker/containerd, resolver os conflitos conforme a [documentação oficial](https://docs.docker.com/engine/install/ubuntu/).

Os próximos comandos usam sudo, sem precisar alterar grupos de usuários do Ubuntu.

## 3. Configurar o IP e as credenciais

```bash
cd /opt/blgames
cp .env.production.example .env.production
chmod 600 .env.production
openssl rand -base64 32
openssl rand -hex 32
openssl rand -hex 32
nano .env.production
```

Usar os três resultados em APP_KEY (prefixado com `base64:`), DB_PASSWORD e DB_ROOT_PASSWORD. Substituir `SEU_IP_PUBLICO` pelo IP real:

```dotenv
SITE_ADDRESS=http://SEU_IP_PUBLICO
APP_URL=http://SEU_IP_PUBLICO
APP_KEY=base64:COLE_A_PRIMEIRA_CHAVE
DB_DATABASE=blgames
DB_USERNAME=blgames
DB_PASSWORD=COLE_A_SEGUNDA_CHAVE
DB_ROOT_PASSWORD=COLE_A_TERCEIRA_CHAVE
SESSION_SECURE_COOKIE=false
```

O prefixo `http://` é necessário para o Caddy servir pelo IP sem tentar emitir certificado. APP_URL não deve terminar em barra. HTTP transmite as credenciais sem criptografia, conforme este cenário de laboratório.

Manter o mesmo APP_KEY nos próximos deploys. O `.env.production` está ignorado pelo Git e excluído do contexto Docker. Não é necessário configurar chave AWS dentro dos containers.

## 4. Subir a aplicação

```bash
cd /opt/blgames
sudo bash deploy/deploy.sh
sudo docker compose --env-file .env.production -f compose.production.yml ps
curl -fsS http://SEU_IP_PUBLICO/up
curl -fsS http://SEU_IP_PUBLICO/api/jogos
```

Abrir **http://SEU_IP_PUBLICO** no navegador.

O script valida as variáveis, compila frontend/backend, espera o banco, executa migrations e inicia a stack. O frontend usa `/api` no mesmo IP, em vez de chamar localhost na máquina do visitante. Para desenvolvimento local, o proxy Vite encaminha `/api` e `/storage` ao PHP em 127.0.0.1:8000.

O banco novo começa vazio. Os seeders originais não são executados automaticamente. Se a aula precisa dos dados/contas definidos nesses seeders, executá-los explicitamente uma vez:

```bash
sudo docker compose --env-file .env.production -f compose.production.yml exec backend php artisan db:seed --force
```

As contas e permissões continuam exatamente como definidas no projeto; consultar `database/seeders/` e `users.is_admin`. O seeder padrão não é idempotente porque cria sempre o mesmo usuário de teste.

Antes de cadastrar um jogo, deve existir uma categoria no banco, pois `categoria_id` é uma chave estrangeira. Exemplo opcional usando o Tinker já presente nas dependências:

```bash
sudo docker compose --env-file .env.production -f compose.production.yml exec backend php artisan tinker
```

No console:

```php
App\Models\Categoria::firstOrCreate(['nome' => 'Ação']);
```

Usar o ID retornado no formulário. Também é possível importar o banco que será usado na aula.

## 5. Subir automaticamente quando a EC2 iniciar

O instalador habilita o serviço Docker no boot e os três serviços têm `restart: unless-stopped`. Após o primeiro deploy, os containers voltam após reboot e após stop/start da EC2. O backend espera o banco ficar disponível também durante reinicializações.

```bash
sudo systemctl is-enabled docker
sudo reboot
```

Após reconectar:

```bash
cd /opt/blgames
sudo docker compose --env-file .env.production -f compose.production.yml ps
curl -fsS http://SEU_IP_PUBLICO/api/jogos
```

Não é necessário configurar cron nem criar um serviço systemd adicional para a aplicação. Migrations rodam no deploy, não em cada boot.

Se parar containers manualmente, `unless-stopped` respeita a parada. Para ativar novamente:

```bash
sudo docker compose --env-file .env.production -f compose.production.yml up -d
```

Os healthchecks detectam problemas; Docker reinicia processos que encerram, mas não reinicia um container apenas porque o healthcheck ficou unhealthy.

## 6. Logs e atualizações

```bash
cd /opt/blgames
sudo docker compose --env-file .env.production -f compose.production.yml logs --tail=100 -f
sudo docker stats
```

Atualização do projeto:

```bash
sudo bash deploy/backup.sh
git pull --ff-only
sudo bash deploy/deploy.sh
```

Uma instância única pode ter breve indisponibilidade durante a atualização. As tags fixam versões principais/LTS, mas não digests; testar antes da aula. Alterar MYSQL_* no arquivo não muda senhas de um banco já inicializado: a rotação precisa ser feita também no MySQL.

## 7. Dados e backup

Volumes persistentes: banco `mysql_data`, imagens `uploads`, sessões `sessions` e dados/configuração do Caddy. Recriar containers não remove esses volumes. **Não usar `down -v` nem `volume prune` para atualizar.**

```bash
sudo bash deploy/backup.sh
```

Gera `backups/DATA_UTC/database.sql.gz` e `uploads.tar.gz`. Guardar cópia fora da EC2 e guardar `.env.production` separadamente. SQL e uploads são copiados em momentos diferentes; para consistência entre ambos, interromper alterações durante o backup. Não há agendamento de backup configurado.

Exemplo de restauração em stack inicializada, substituindo DATA_UTC e conferindo o destino porque os dados serão sobrescritos:

```bash
sudo docker compose --env-file .env.production -f compose.production.yml stop web backend
set -o pipefail
sudo gunzip -c backups/DATA_UTC/database.sql.gz | sudo docker compose --env-file .env.production -f compose.production.yml exec -T mysql sh -c 'MYSQL_PWD="$MYSQL_PASSWORD" exec mysql -u"$MYSQL_USER" "$MYSQL_DATABASE"'
sudo cat backups/DATA_UTC/uploads.tar.gz | sudo docker compose --env-file .env.production -f compose.production.yml run --rm --no-deps -T --entrypoint tar backend -C /var/www/html/storage/app/public -xzf -
sudo bash deploy/deploy.sh
```

A restauração de uploads mescla arquivos; para um teste de recuperação, preferir volume novo. O tar é extraído pelo usuário www-data para permitir novos uploads.

Se já existem dados no ambiente local, exportar o MySQL 8.0 por dump e copiar `blgames-backend/storage/app/public`. Importar na stack nova. Não reutilizar diretamente o diretório de dados da versão anterior; conferir a compatibilidade segundo o [guia de upgrade MySQL](https://dev.mysql.com/doc/refman/8.4/en/upgrading.html).

## Observações da leitura

- Comentários do detalhe ficam no localStorage de cada navegador. O deploy mantém esse comportamento.
- A lista de jogos não tem paginação e o detalhe carrega a lista inteira. Isso influencia o dimensionamento quando a base crescer.
- A imagem principal do frontend tem aproximadamente 3,7 MB, contribuindo para o tráfego.
- Não foi realizado teste de carga nem alteradas as regras funcionais/de segurança para esta aula.

Referências adicionais: [Docker no boot](https://docs.docker.com/engine/install/linux-postinstall/) e [Caddy](https://caddyserver.com/docs/caddyfile).

## Validação realizada localmente

- Build das duas imagens Docker concluído e configuração Caddy validada.
- Todas as migrations executadas em MySQL 8.4 novo.
- Três containers saudáveis; frontend, rota direta da SPA, `/up` e API acessíveis.
- Cadastro, login, criação/edição de jogo e upload/leitura de imagem conferidos via HTTP com o comportamento original da aplicação.
- Banco e imagem preservados após reiniciar os três containers.
- Comando mysqldump conferido e suíte original aprovada: 2 testes.
- Sintaxe dos scripts e configuração Compose validadas.

Esses testes foram feitos em containers locais isolados. A instalação no Ubuntu EC2 e o reboot da máquina precisam ser conferidos no servidor seguindo os passos acima; não foi criada nem acessada uma instância AWS.
