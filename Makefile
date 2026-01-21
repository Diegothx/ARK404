ENV_FILE=.env
DEV_COMPOSE=docker-compose.dev.yml
PROD_COMPOSE=docker-compose.prod.yml

.PHONY: dev dev-build dev-up dev-down migrate makemigration logs

## Build and start dev stack + apply migrations
dev:
	docker compose --env-file $(ENV_FILE) -f $(DEV_COMPOSE) up --build -d
	make migrate

## Build only
dev-build:
	docker compose --env-file $(ENV_FILE) -f $(DEV_COMPOSE) build

## Start without rebuild
dev-up:
	docker compose --env-file $(ENV_FILE) -f $(DEV_COMPOSE) up -d

## Stop containers
dev-down:
	docker compose -f $(DEV_COMPOSE) down

## Apply migrations
migrate:
	docker compose -f $(DEV_COMPOSE) exec backend alembic upgrade head 

## Create new migration
makemigration:
	docker compose -f $(DEV_COMPOSE) exec backend \
		alembic revision --autogenerate -m "$(m)"

## Tail logs
logs:
	docker compose -f $(DEV_COMPOSE) logs -f
