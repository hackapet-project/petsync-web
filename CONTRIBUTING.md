# Contributing to RefuPet

Welcome to RefuPet! We're excited to have you contribute to this open-source animal shelter management platform.

## 🚀 Quick Start

1. **Clone and Setup**
   ```bash
   git clone [repository-url]
   cd refupet-web
   make setup  # Sets up .env and installs dependencies
   ```

2. **Start Development**
   ```bash
   make dev  # Starts full development environment
   ```

3. **Access the Application**
   - Backend: http://localhost:8000
   - Frontend: http://localhost:5173
   - Admin Panel: http://localhost:8000/admin

## 🛠️ Development Workflow

### Environment Setup

```bash
# Initial setup (run once)
make setup

# Start development environment
make dev

# Or start in background
make dev-bg

# Create development users
make seed
```

### Code Quality

We use automated code formatting and linting:

```bash
# Format all code
make format

# Run linting
make lint

# Run type checking
make type-check
```

### Testing

```bash
# Run all tests
make test

# Frontend tests only
make test-frontend

# Backend tests only
make test-backend
```

### Database Management

```bash
# Run migrations
make migrate

# Create new migrations
make makemigrations

# Create superuser
make superuser

# Seed development data
make seed
```

## 🏗️ Project Structure

```
refupet-web/
├── backend/           # Django backend
│   ├── refupet_project/  # Django settings and config
│   ├── fixtures/      # Development data
│   ├── tests/         # Backend tests
│   └── manage.py      # Django management
├── frontend/          # React frontend
│   ├── src/          # Source code
│   └── public/       # Static assets
├── docker/           # Docker configuration
├── docs/             # Documentation
└── .vscode/          # VSCode configuration
```

## 📝 Coding Standards

### Python (Backend)

- **Formatting**: Black (88 character line length)
- **Import Sorting**: isort with Black profile
- **Linting**: flake8
- **Style**: Follow Django conventions

### JavaScript/TypeScript (Frontend)

- **Formatting**: Prettier
- **Linting**: ESLint with React hooks and a11y rules
- **Style**: Modern React with hooks, functional components

### General Guidelines

- Write clear, descriptive commit messages
- Include tests for new features
- Update documentation for significant changes
- Follow existing code patterns and conventions

## 🔧 Pre-commit Hooks

We use pre-commit hooks to maintain code quality:

```bash
# Install hooks (automatic with make setup)
make install-hooks

# Run hooks manually
pre-commit run --all-files
```

## 🧪 Testing Guidelines

### Frontend Tests

- Use Vitest for testing framework
- Use Testing Library for React components
- Place tests next to components (`.test.jsx`)
- Test user interactions, not implementation details

### Backend Tests

- Use Django's built-in testing framework
- Place tests in `backend/tests/`
- Test models, views, and business logic
- Use factories for test data when possible

## 🐛 Debugging

### VSCode Configuration

The project includes VSCode configuration for:
- Python debugging with Django
- Integrated terminal tasks
- Recommended extensions
- Code formatting on save

### Development Tools

```bash
# Django shell
make shell

# Database shell
make shell-db

# View logs
make logs

# View specific service logs
make logs-backend
make logs-frontend
```

## 📋 Development Data

Use the development data setup for consistent testing:

```bash
# Setup development users (generates random passwords)
make seed

# The command will output random credentials for:
# - admin (superuser)
# - staff (staff user) 
# - volunteer (regular user)
# 
# ⚠️  IMPORTANT: Copy passwords from the command output!
# Passwords are randomly generated each time for security.
```

## 🚀 Deployment

The project is configured for Coolify deployment:
- Multi-stage Docker builds for optimization
- Environment-based configuration
- Static file handling
- Health checks

## 🐳 Docker Commands

```bash
# Build production images
make build

# Clean up containers and volumes
make clean

# Complete reset
make reset
```

## 📖 Documentation

- Keep documentation up to date
- Document new features and APIs
- Use clear examples in code comments
- Update CLAUDE.md for development changes

## 🤝 Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes following the coding standards
4. Add tests for new functionality
5. Ensure all tests pass
6. Format code and fix linting issues
7. Submit a pull request with a clear description

## 📧 Getting Help

- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Email**: dev@hackapet.org for sensitive matters

## 📄 License

RefuPet is licensed under AGPL v3. By contributing, you agree that your contributions will be licensed under the same license.

---

Thank you for contributing to RefuPet! 🐾