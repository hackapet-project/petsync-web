# 🐾 RefuPet - Animal Shelter Management Platform

<div align="center">

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Django](https://img.shields.io/badge/django-%23092E20.svg?style=flat&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**Professional-grade open-source platform for animal shelter management**

[🚀 Quick Start](#-quick-start) • [📖 Documentation](#-documentation) • [🛠️ Development](#%EF%B8%8F-development-setup) • [🤝 Contributing](CONTRIBUTING.md)

</div>

---

## 🌟 Overview

**RefuPet** is a comprehensive, open-source web platform designed specifically for animal shelter management. Built with modern technologies and professional development practices, it provides a secure, scalable, and user-friendly solution for shelter operations.

### 🏗️ Architecture

- **🌐 Frontend**: React 19 + Vite + TypeScript
- **⚙️ Backend**: Django 4+ + REST Framework + PostgreSQL  
- **🐳 Infrastructure**: Docker + Docker Compose
- **🚀 Deployment**: Coolify-compatible with automated CI/CD

---

## ✨ Key Features

### 🔧 **Production Ready**
- **Secure by design** with environment-based configuration
- **Docker containerization** with multi-stage optimized builds
- **PostgreSQL database** with automated migrations
- **Static file handling** and optimized asset serving
- **Health checks** and proper logging

### 👨‍💻 **Developer Experience**  
- **One-command setup** - `make setup && make dev`
- **Hot reload development** with instant feedback
- **Automated code quality** - pre-commit hooks, linting, formatting
- **Comprehensive testing** - frontend (Vitest) + backend (Django)
- **VSCode integration** - debugging, tasks, and extensions
- **API documentation** - Interactive Swagger UI

### 🛡️ **Security & Quality**
- **AGPL v3 licensed** ensuring open-source compliance
- **No hardcoded secrets** - secure development practices
- **Automated vulnerability scanning** with dependency updates
- **Code quality enforcement** with Black, Prettier, ESLint
- **Type safety** with TypeScript and strict linting

---

## 🚀 Quick Start

### Prerequisites
- **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop/)
- **Node.js 18+** - [Download here](https://nodejs.org/) (for local frontend development)
- **Make** - Usually pre-installed on macOS/Linux

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/hackapet-project/refupet-web.git
cd refupet-web

# 2. Setup environment and dependencies
make setup

# 3. Start the development environment
make dev
```

### Access Points

Once the environment is running:

| Service | URL | Description |
|---------|-----|-------------|
| 🌐 **Frontend** | http://localhost:5173 | React development server |
| ⚙️ **Backend** | http://localhost:8000 | Django API server |
| 👤 **Admin Panel** | http://localhost:8000/admin | Django administration |
| 📖 **API Docs** | http://localhost:8000/api/docs/ | Interactive Swagger UI |

### Initial Setup

```bash
# Create database and apply migrations
make migrate

# Create development users (generates random passwords)
make seed

# View logs
make logs
```

---

## 🛠️ Development Setup

### Available Commands

```bash
# Development
make dev         # Start full development environment
make dev-bg      # Start in background
make stop        # Stop all containers
make logs        # View application logs

# Code Quality  
make format      # Format all code (Black + Prettier)
make lint        # Run all linters
make test        # Run all tests

# Database
make migrate     # Apply database migrations
make seed        # Create development users
make shell       # Django shell
make superuser   # Create admin user

# Utilities
make clean       # Clean containers and volumes
make help        # Show all available commands
```

### Project Structure

```
refupet-web/
├── 📁 backend/              # Django REST API
│   ├── 🐍 refupet_project/  # Django settings and configuration
│   ├── 🧪 tests/            # Backend test suite
│   ├── 📊 fixtures/         # Development data
│   └── 🔧 manage.py         # Django management
├── 📁 frontend/             # React TypeScript frontend
│   ├── ⚛️  src/             # React components and logic
│   ├── 🧪 src/test/         # Frontend test utilities
│   └── ⚙️  vite.config.js   # Vite configuration
├── 📁 docker/               # Docker configuration
├── 📁 docs/                 # Documentation
├── 🔧 Makefile              # Development automation
└── 📋 CONTRIBUTING.md       # Development guidelines
```

---

## 📖 Documentation

### For Developers
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Complete development workflow and guidelines
- **[docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)** - Technical architecture and patterns
- **[docs/SECURITY.md](docs/SECURITY.md)** - Security best practices and guidelines
- **[CLAUDE.md](CLAUDE.md)** - AI assistant integration guide

### For Users
- **API Documentation** - Available at `/api/docs/` when running
- **Admin Interface** - Django admin at `/admin/` 

---

## 🧪 Testing & Quality

### Running Tests

```bash
# All tests
make test

# Frontend only
make test-frontend

# Backend only  
make test-backend
```

### Code Quality

```bash
# Format code
make format

# Check linting
make lint

# Type checking
make type-check
```

The project uses:
- **Python**: Black, isort, flake8 for formatting and linting
- **JavaScript/TypeScript**: Prettier, ESLint for code quality
- **Pre-commit hooks** to enforce quality standards
- **Automated testing** with Vitest and Django test framework

---

## 🚀 Deployment

### Production Deployment

The application is **Coolify-ready** with optimized Docker configurations:

```bash
# Build production images
make build

# Production environment variables needed:
# - DJANGO_SECRET_KEY (generate new)
# - DATABASE_URL (PostgreSQL connection)
# - DJANGO_ALLOWED_HOSTS (your domain)
# - DJANGO_DEBUG=False
# - DJANGO_ENV=production
```

### Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
# Production example
DJANGO_SECRET_KEY=your-super-secure-secret-key
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=postgresql://user:password@host:port/database
```

---

## 👥 Team & Contributors

### Core Team

**🏆 Lead Developer & Architect**  
**Diego Rejón** - Project leadership, API development, database design

**🔧 Infrastructure & DevOps**  
**Ignacio Delgado** - Docker infrastructure, CI/CD, deployment

**🎨 Frontend Development**  
**nadecc** - React development, UI/UX, frontend architecture

**📚 Documentation & Project Management**  
**Nacho Loyola** - Documentation, contributor guidelines

**🤖 Developer Experience**  
**Claude** - Automation, tooling, security enhancements

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Quick Contributing Guide

1. **Fork** the repository
2. **Create** a feature branch
3. **Run** `make setup` to get started
4. **Make** your changes following our code standards
5. **Test** with `make test` and `make lint`
6. **Submit** a pull request

---

## 📄 License

Licensed under the **GNU Affero General Public License v3.0** (AGPL-3.0).

This ensures that all modifications and usage in networks (e.g., as a web app) remain open-source. See [LICENSE](LICENSE) for full details.

---

## 📞 Support & Community

### Getting Help

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/hackapet-project/refupet-web/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/hackapet-project/refupet-web/discussions)  
- 📧 **General Questions**: [dev@hackapet.org](mailto:dev@hackapet.org)
- 📖 **Documentation**: Check [docs/](docs/) directory

### Troubleshooting

**Docker not starting?**
```bash
# Check if Docker is running
make check-docker

# Start Docker Desktop and try again
make dev
```

**Environment issues?**
```bash
# Reset everything
make clean
make setup
make dev
```

---

<div align="center">

**Made with ❤️ by the RefuPet Team**

[⭐ Star us on GitHub](https://github.com/hackapet-project/refupet-web) • [🐦 Follow updates](https://twitter.com/hackapet) • [🌍 Visit hackapet.org](https://hackapet.org)

</div>