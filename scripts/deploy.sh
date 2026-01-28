#!/bin/bash
set -e

echo "🚀 Iniciando deploy..."

cd ~/ARK404

# Verificar que el archivo .env.production existe
if [ ! -f .env.production ]; then
    echo "❌ ERROR: No se encuentra .env.production"
    echo "   Copia .env.example a .env.production y configura las variables"
    exit 1
fi

# Cargar variables
source .env.production

# Backup antes de actualizar
echo "💾 Creando backup de la base de datos..."
docker exec ${APP_NAME}_db pg_dump -U ${DB_USER} ${DB_NAME} > \
    bddBackups/backup_$(date +%Y%m%d_%H%M%S).sql 2>/dev/null || true

# Pull y build
git pull origin main
docker compose -f docker-compose.prod.yml build

# Down manteniendo volúmenes (importante para DB)
docker compose -f docker-compose.prod.yml down

# Up con migraciones
echo "🔄 Ejecutando migraciones..."
docker compose -f docker-compose.prod.yml up -d db
sleep 5

# Ejecutar migraciones manualmente (alternativa al servicio)
docker compose -f docker-compose.prod.yml run --rm backend \
    sh -c "alembic upgrade head"

# Levantar el resto
docker compose -f docker-compose.prod.yml up -d backend frontend

# Limpieza
echo "🧹 Limpiando imágenes sin usar..."
docker image prune -f

# Verificación
echo "✅ Verificando servicios..."
sleep 10
docker compose -f docker-compose.prod.yml ps

# Verificar migraciones
echo "📊 Estado de migraciones:"
docker compose -f docker-compose.prod.yml exec backend alembic current

echo "🎉 Deploy completado!"