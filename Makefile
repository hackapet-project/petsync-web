.PHONY: build up down init

init:
	rm -rf front/node_modules
	mkdir front/node_modules
	docker compose run --rm --user node front npm install

build:
	docker compose build

up:
	docker compose up --no-attach postgres

down:
	docker compose down

init: 
	rm -rf front/node_modules
	mkdir front/node_modules
	docker compose run --rm front npm install

back_test:
	docker compose run --rm back pytest

create_app:
	docker compose run --rm back ./manage.py startapp ${i}

scaffold_django:
	docker compose run --rm django_scaffolder django-admin startproject back

scaffold_vite:
	docker compose run --rm vite_scaffolder npm create vite@4.4.0 ${i}
