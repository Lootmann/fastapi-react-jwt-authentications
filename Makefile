APP_NAME=app
APP_CONTAINER_NAME=fastapi-app
DB_NAME=db
DB_CONTAINER_NAME=postgres-db
FRONTEND_NAME=frontend
FRONTEND_CONTAINER_NAME=react-frontend

run:
	docker compose up -d

build:
	docker compose build

buildup:
	docker compose up --build

down:
	docker compose down -v

logs:
	docker compose logs -ft

logbackend:
	docker compose logs $(APP_NAME) -ft

logfrontend:
	docker compose logs $(FRONTEND_NAME) -ft

logdb:
	docker compose logs $(DB_NAME) -ft

restart:
	docker compose restart

migrate:
	docker compose exec $(APP_NAME) python3 -m api.db

login-backend:
	docker exec -it $(APP_CONTAINER_NAME) /bin/bash

login-db:
	docker exec -it $(DB_CONTAINER_NAME) psql -U postgres

login-frontend:
	docker exec -it $(FRONTEND_CONTAINER_NAME) /bin/bash

# tests
test:
	docker compose exec $(APP_NAME) python3.10 -m pytest -svv

re:
	docker compose exec $(APP_NAME) python3.10 -m pytest -svv --lf

# preformance
measure:
	docker compose exec $(APP_NAME) python3.10 -m pytest --durations=0

cov:
	docker compose exec $(APP_NAME) python3.10 -m pytest --cov --cov-report=html

report:
	google-chrome ./backend/htmlcov/index.html
