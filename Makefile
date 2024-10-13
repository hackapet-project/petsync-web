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

scaffold_django:
	docker compose run --rm django_scaffolder django-admin startproject back

scaffold_vite:
	docker compose run --rm vite_scaffolder npm create vite@4.4.0 ${i}
