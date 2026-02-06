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
ifndef m
	$(error You must provide a migration message. Example: make makemigration m="add_users_table")
endif
	docker compose -f $(DEV_COMPOSE) exec backend \
		alembic revision --autogenerate -m "$(m)"

## Generate frontend API client from backend OpenAPI spec
generate-frontend-api:
	@echo "Downloading OpenAPI JSON from backend..."
	curl -s http://localhost:5000/openapi.json -o frontend/openapi.json
	@echo "Generating TypeScript API client..."
	npx openapi-typescript-codegen --input frontend/openapi.json --output frontend/src/api --client axios
	@echo "Cleaning up temporary OpenAPI JSON..."
	rm -f frontend/openapi.json
	@echo "✅ Frontend API client generated."

clean-frontend-api:
	rm -rf frontend/src/api
	@echo "✅ Frontend API client cleaned."

## Tail logs
logs:
	docker compose -f $(DEV_COMPOSE) logs -f

