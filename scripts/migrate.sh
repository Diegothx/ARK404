#!/bin/bash
set -e

cd ./ARK404
source .env.production

echo "🔄 Ejecutando migraciones..."

# Crear nueva migración (si necesitas)
if [ "$1" = "create" ]; then
    docker compose -f docker-compose.prod.yml run --rm backend \
        alembic revision --autogenerate -m "$2"
    exit 0
fi

# Aplicar migraciones
docker compose -f docker-compose.prod.yml run --rm backend \
    alembic upgrade head

# Revertir migración
if [ "$1" = "downgrade" ]; then
    docker compose -f docker-compose.prod.yml run --rm backend \
        alembic downgrade -1
fi

# Ver estado actual
docker compose -f docker-compose.prod.yml exec backend alembic current