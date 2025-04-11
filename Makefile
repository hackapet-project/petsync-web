.PHONY: build up down init back_test create_app scaffold_django scaffold_vite

init:
	docker compose -f docker-compose.dev.yml build front
	docker compose -f docker-compose.dev.yml run --rm front npm install

build:
	docker compose -f docker-compose.dev.yml build

up:
	docker compose -f docker-compose.dev.yml up

down:
	docker compose -f docker-compose.dev.yml down

back_test:
	docker compose -f docker-compose.dev.yml run --rm back pytest

create_app:
	docker compose -f docker-compose.dev.yml run --rm back ./manage.py startapp ${i}

scaffold_django:
	docker compose -f docker-compose.dev.yml run --rm django_scaffolder django-admin startproject back

scaffold_vite:
	docker compose -f docker-compose.dev.yml run --rm vite_scaffolder npm create vite@4.4.0 ${i}