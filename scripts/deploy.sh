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
  > backups/backup_$(date +%Y%m%d_%H%M%S).sql ||  echo "⚠️ Falló backup, continuar..."

# Actualizar código
git pull origin main

# Apagar servicios
docker compose -f $COMPOSE_FILE down

# Build limpio
docker compose -f $COMPOSE_FILE build --no-cache

# Levantar DB primero (healthcheck hace el wait)
docker compose -f $COMPOSE_FILE up -d db

# Migraciones
echo "🔄 Ejecutando migraciones..."
docker compose -f $COMPOSE_FILE run --rm backend alembic upgrade head

# Levantar todo
docker compose -f $COMPOSE_FILE up -d

# Limpieza
echo "🧹 Limpiando imágenes sin usar..."
docker image prune -f

# Verificación
echo "✅ Servicios activos:"
docker compose -f $COMPOSE_FILE ps

echo "🎉 Deploy completado!"
