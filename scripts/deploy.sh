#!/bin/bash
set -e

echo "🚀 Iniciando deploy..."

cd ~/ARK404

# Verificar .env
if [ ! -f .env ]; then
  echo "❌ ERROR: Falta el archivo .env"
  exit 1
fi

source .env

COMPOSE_FILE=docker-compose.prod.yml

# Backup DB
echo "💾 Backup de la base de datos..."
mkdir -p backups
docker compose -f $COMPOSE_FILE exec -T db \
  pg_dump -U "$DB_USER" "$DB_NAME" \
  > backups/backup_$(date +%Y%m%d_%H%M%S).sql || true

# Actualizar código
git pull origin main

# Apagar servicios
docker compose -f $COMPOSE_FILE down

# Build limpio
docker compose -f $COMPOSE_FILE build --no-cache

# Levantar DB primero (healthcheck hace el wait)
docker compose -f $COMPOSE_FILE up -d db

echo "⏳ Esperando que la base de datos esté disponible..."

MAX_RETRIES=15  # máximo intentos
RETRY_COUNT=0
SLEEP_TIME=2   # segundos entre intentos

until docker exec ${APP_NAME}_db pg_isready -U ${DB_USER} >/dev/null 2>&1; do
    RETRY_COUNT=$((RETRY_COUNT + 1))
    if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
        echo "❌ ERROR: la base de datos no está disponible después de $((MAX_RETRIES * SLEEP_TIME)) segundos"
        exit 1
    fi
    echo "  DB no lista, esperando $SLEEP_TIME segundos..."
    sleep $SLEEP_TIME
done

echo "✅ Base de datos lista"

# Migraciones
echo "🔄 Ejecutando migraciones..."
docker compose -f $COMPOSE_FILE run --rm backend alembic upgrade head

# Levantar todo
docker compose -f $COMPOSE_FILE up -d

# Verificación
echo "✅ Servicios activos:"
docker compose -f $COMPOSE_FILE ps

echo "🎉 Deploy completado!"
