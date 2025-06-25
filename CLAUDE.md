# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RefuPet is an open-source animal shelter management platform built with:
- **Frontend**: React + Vite (frontend/ directory)
- **Backend**: Django 4+ with Gunicorn (backend/ directory)
- **Database**: PostgreSQL (configured via docker-compose)
- **Deployment**: Docker with Coolify compatibility

## Common Commands

### Quick Start
```bash
make setup    # Copy .env.example, install dependencies
make dev      # Start full development environment
make seed     # Create development users (random passwords)
```

### Development Commands
```bash
make dev         # Start full stack
make dev-bg      # Start in background
make stop        # Stop all containers
make logs        # View all logs
make clean       # Clean up containers and volumes
make reset       # Complete reset
```

### Code Quality
```bash
make lint        # Run all linting (Python + JS)
make format      # Format all code (Black + Prettier)
make type-check  # Run type checking
```

### Testing
```bash
make test           # Run all tests
make test-frontend  # Frontend tests only
make test-backend   # Backend tests only
```

### Database Management
```bash
make migrate        # Apply migrations
make makemigrations # Create new migrations
make superuser      # Create Django superuser
make seed          # Setup development data
make shell         # Django shell
make shell-db      # Database shell
```

### Frontend Commands (frontend/)
```bash
npm run dev         # Development server with hot reload
npm run build       # Production build
npm run lint        # ESLint checking
npm run lint:fix    # Auto-fix ESLint issues
npm run format      # Format with Prettier
npm run test        # Run Vitest tests
npm run type-check  # TypeScript checking
```

### Backend Commands (backend/)
```bash
python manage.py migrate              # Apply database migrations
python manage.py makemigrations       # Create migrations
python manage.py collectstatic        # Collect static files
python manage.py setup_dev_data       # Create development users
python manage.py shell                # Django shell
```

## Architecture

### Directory Structure
- `backend/` - Django application with PostgreSQL integration
- `frontend/` - React + Vite SPA with hot reload
- `docker/` - Docker Compose configuration
- `backend/refupet_project/` - Django project settings and URLs

### Key Configuration Files
- `backend/refupet_project/settings.py` - Hardened Django settings with environment-based configuration
- `backend/entrypoint.sh` - Docker startup script that handles migrations and static files
- `docker/docker-compose.yml` - Multi-service orchestration (frontend, backend, database)
- `frontend/vite.config.js` - Vite build configuration with API proxy
- `Makefile` - Development workflow automation
- `.pre-commit-config.yaml` - Code quality automation
- `.vscode/` - Complete IDE configuration

### Environment Variables
The project uses `.env` files for configuration:
- `DATABASE_URL` - PostgreSQL connection string
- `DJANGO_SECRET_KEY` - Django secret key
- `DJANGO_DEBUG` - Debug mode (True/False)
- `DJANGO_ALLOWED_HOSTS` - Comma-separated allowed hosts
- `VITE_API_URL` - Frontend API base URL

### Security Features
- Environment-based secret management
- HTTPS/SSL configuration for production
- CSRF and session security
- Security headers (HSTS, XSS protection, etc.)
- Non-root Docker containers

### Database
- PostgreSQL 15 Alpine with health checks
- Migrations handled automatically via entrypoint.sh
- Connection pooling configured (conn_max_age=600)

### Static Files
- Django collectstatic handled in Docker entrypoint
- Static files served from `/home/app/web/staticfiles`
- Manifest static file storage for production

## Development Workflow

### Initial Setup
1. **Clone and setup**: `make setup` (copies .env, installs dependencies)
2. **Start development**: `make dev` (full Docker stack)
3. **Create users**: `make seed` (generates random passwords)
4. **Install pre-commit**: `make install-hooks` (code quality automation)

### Daily Development
1. **Start**: `make dev` or `make dev-bg`
2. **Code**: Use VSCode with provided configuration
3. **Test**: `make test` before committing
4. **Format**: `make format` (auto-formats all code)
5. **Commit**: Pre-commit hooks run automatically

### Code Quality Tools
- **Black + isort** for Python formatting
- **Prettier + ESLint** for JavaScript formatting
- **Flake8** for Python linting
- **TypeScript** for type checking
- **Vitest** for frontend testing
- **Django tests** for backend testing

### API Development
- **Django REST Framework** configured
- **OpenAPI/Swagger docs** at `/api/docs/`
- **CORS** configured for frontend communication
- **Authentication** ready for implementation

## Important Notes

### Development Access Points
- **Backend**: http://localhost:8002
- **Frontend**: http://localhost:5174  
- **Admin Panel**: http://localhost:8002/admin
- **API Docs**: http://localhost:8002/api/docs/
- **API Schema**: http://localhost:8002/api/schema/

### Security
- **Never commit secrets** - use `.env.example` as template
- **Development users** have randomly generated passwords 
- **Pre-commit hooks** prevent accidental secret commits
- **See docs/SECURITY.md** for comprehensive security guidelines

### Code Quality
- **Automated formatting** on save (VSCode) and pre-commit
- **Linting rules** enforced for both Python and JavaScript
- **Type checking** configured for frontend
- **Testing** required for new features

### Production
- **Docker containers** are Coolify-compatible
- **Environment variables** required for all secrets
- **Static files** collected automatically
- **Health checks** ensure service availability
- **AGPL v3 licensed** - modifications must remain open source

### Getting Help
- **CONTRIBUTING.md** - Development guidelines
- **docs/DEVELOPMENT.md** - Technical deep dive
- **docs/SECURITY.md** - Security best practices
- **Make commands** - `make help` for quick reference