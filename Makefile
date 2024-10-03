.PHONY: help setup dev build test lint format clean logs shell migrate seed

# Default target
help: ## Show this help message
	@echo "RefuPet Development Commands"
	@echo "==========================="
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Development Setup
setup: ## Initial project setup (copy .env, install dependencies)
	@echo "🚀 Setting up RefuPet development environment..."
	@if [ ! -f .env ]; then cp .env.example .env && echo "✅ Created .env from .env.example"; fi
	@cd frontend && npm install --legacy-peer-deps && echo "✅ Frontend dependencies installed"
	@echo "✅ Setup complete! Run 'make dev' to start development"

# Development
dev: ## Start full development environment
	@echo "🚀 Starting RefuPet development environment..."
	docker compose -f docker/docker-compose.yml up --build

dev-bg: ## Start development environment in background
	@echo "🚀 Starting RefuPet development environment in background..."
	docker compose -f docker/docker-compose.yml up --build -d

dev-frontend: ## Start only frontend development server
	@echo "🚀 Starting frontend development server..."
	cd frontend && npm run dev

stop: ## Stop all development containers
	@echo "🛑 Stopping development environment..."
	docker compose -f docker/docker-compose.yml down

# Database Management
migrate: ## Run Django database migrations
	@echo "🔧 Running database migrations..."
	docker compose -f docker/docker-compose.yml exec backend python manage.py migrate

makemigrations: ## Create new Django migrations
	@echo "🔧 Creating new migrations..."
	docker compose -f docker/docker-compose.yml exec backend python manage.py makemigrations

seed: ## Seed database with development data
	@echo "🌱 Seeding database with development data..."
	docker compose -f docker/docker-compose.yml exec backend python manage.py setup_dev_data

superuser: ## Create Django superuser
	@echo "👤 Creating Django superuser..."
	docker compose -f docker/docker-compose.yml exec backend python manage.py createsuperuser

# Code Quality
lint: ## Run linting for both frontend and backend
	@echo "🔍 Running linters..."
	cd frontend && npm run lint
	docker compose -f docker/docker-compose.yml exec backend flake8 .

format: ## Format code (Prettier + Black)
	@echo "✨ Formatting code..."
	cd frontend && npm run format
	docker compose -f docker/docker-compose.yml exec backend black .
	docker compose -f docker/docker-compose.yml exec backend isort .

type-check: ## Run type checking
	@echo "🔍 Running type checks..."
	cd frontend && npm run type-check || echo "No type checking configured yet"
	docker compose -f docker/docker-compose.yml exec backend mypy . || echo "No mypy configured yet"

# Testing
test: ## Run all tests
	@echo "🧪 Running tests..."
	cd frontend && npm run test || echo "No tests configured yet"
	docker compose -f docker/docker-compose.yml exec backend python manage.py test

test-frontend: ## Run frontend tests only
	@echo "🧪 Running frontend tests..."
	cd frontend && npm run test

test-backend: ## Run backend tests only
	@echo "🧪 Running backend tests..."
	docker compose -f docker/docker-compose.yml exec backend python manage.py test

# Build
build: ## Build production images
	@echo "🏗️ Building production images..."
	docker compose -f docker/docker-compose.yml build

# Utility
logs: ## Show development logs
	docker compose -f docker/docker-compose.yml logs -f

logs-backend: ## Show backend logs only
	docker compose -f docker/docker-compose.yml logs -f backend

logs-frontend: ## Show frontend logs only
	docker compose -f docker/docker-compose.yml logs -f frontend

shell: ## Open Django shell
	@echo "🐚 Opening Django shell..."
	docker compose -f docker/docker-compose.yml exec backend python manage.py shell

shell-db: ## Open database shell
	@echo "🐚 Opening database shell..."
	docker compose -f docker/docker-compose.yml exec db psql -U $(shell grep POSTGRES_USER .env | cut -d '=' -f2) -d $(shell grep POSTGRES_DB .env | cut -d '=' -f2)

# Cleanup
clean: ## Clean up containers, volumes, and build artifacts
	@echo "🧹 Cleaning up..."
	docker compose -f docker/docker-compose.yml down -v --remove-orphans
	docker system prune -f
	cd frontend && rm -rf node_modules/.cache dist

reset: ## Reset everything (clean + remove volumes)
	@echo "🔄 Resetting everything..."
	docker compose -f docker/docker-compose.yml down -v --remove-orphans
	docker volume rm $(shell docker volume ls -q | grep refupet) 2>/dev/null || true
	cd frontend && rm -rf node_modules dist
	@echo "✅ Reset complete! Run 'make setup' to reinitialize"

# Install pre-commit hooks
install-hooks: ## Install pre-commit hooks
	@echo "🪝 Installing pre-commit hooks..."
	pre-commit install
	@echo "✅ Pre-commit hooks installed"