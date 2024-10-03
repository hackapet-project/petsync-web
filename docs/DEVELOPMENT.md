# Development Guide

This guide covers the technical aspects of developing RefuPet.

## Architecture Overview

RefuPet follows a modern full-stack architecture:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  Django Backend │    │   PostgreSQL    │
│     (Vite)      │◄──►│   (Gunicorn)    │◄──►│    Database     │
│   Port: 5173    │    │   Port: 8000    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technology Stack

**Frontend:**
- React 19 with functional components and hooks
- Vite for fast development and building
- ESLint + Prettier for code quality
- Vitest for testing

**Backend:**
- Django 4.2 with modern Python practices
- PostgreSQL for data persistence
- Gunicorn for production serving
- Black + isort + flake8 for code quality

**Infrastructure:**
- Docker for containerization
- Docker Compose for local development
- Coolify-compatible for deployment

## Development Environment

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local frontend development)
- Python 3.11+ (for local backend development)
- Make (for convenience commands)

### Environment Variables

Copy `.env.example` to `.env` and adjust values:

```bash
cp .env.example .env
```

Key variables:
- `DATABASE_URL`: PostgreSQL connection string
- `DJANGO_SECRET_KEY`: Django secret key (generate new for production)
- `DJANGO_DEBUG`: Set to `False` in production
- `VITE_API_URL`: Frontend API base URL

### Quick Start

```bash
# Complete setup
make setup

# Start development environment
make dev

# In another terminal, create development data
make seed
```

## Code Organization

### Backend Structure

```
backend/
├── refupet_project/     # Django project settings
│   ├── settings.py      # Environment-based configuration
│   ├── urls.py          # URL routing
│   └── wsgi.py          # WSGI application
├── fixtures/            # Development data
├── tests/               # Test files
├── management/          # Custom Django commands
└── requirements.txt     # Python dependencies
```

### Frontend Structure

```
frontend/
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── test/           # Test utilities
│   └── main.jsx        # Application entry point
├── public/             # Static assets
└── package.json        # Node.js dependencies
```

## Development Patterns

### Backend Patterns

**Settings Management:**
- Environment-based configuration using `os.environ`
- Separate settings for development/production
- Security headers configured for production

**Database:**
- Use Django ORM for database operations
- Create migrations for schema changes
- Use fixtures for development data

**Security:**
- CSRF protection enabled
- Secure headers in production
- Environment-based secret management

### Frontend Patterns

**Component Structure:**
```jsx
// Use functional components with hooks
import { useState, useEffect } from 'react'

export default function MyComponent({ prop1, prop2 }) {
  const [state, setState] = useState(null)
  
  useEffect(() => {
    // Side effects
  }, [])
  
  return <div>{/* JSX */}</div>
}
```

**API Communication:**
```jsx
// Use async/await for API calls
const fetchData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/endpoint`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
```

## Testing Strategy

### Backend Testing

Use Django's test framework:

```python
from django.test import TestCase
from django.contrib.auth.models import User

class MyTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass'
        )
    
    def test_something(self):
        self.assertEqual(self.user.username, 'testuser')
```

Run tests:
```bash
make test-backend
# Or specifically:
docker compose exec backend python manage.py test
```

### Frontend Testing

Use Vitest with Testing Library:

```jsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

Run tests:
```bash
make test-frontend
# Or specifically:
cd frontend && npm run test
```

## Database Management

### Migrations

```bash
# Create migrations for model changes
make makemigrations

# Apply migrations
make migrate

# Create specific app migrations
docker compose exec backend python manage.py makemigrations app_name
```

### Development Data

Use the custom management command:

```bash
# Setup development users
docker compose exec backend python manage.py setup_dev_data

# Or use make command
make seed
```

## Code Quality

### Python Code Quality

**Black** for formatting:
```bash
make format  # Formats all Python code
```

**isort** for import sorting:
```bash
# Automatically sorts imports with Black compatibility
```

**flake8** for linting:
```bash
make lint  # Runs flake8 on backend code
```

### JavaScript Code Quality

**Prettier** for formatting:
```bash
cd frontend && npm run format
```

**ESLint** for linting:
```bash
cd frontend && npm run lint
cd frontend && npm run lint:fix  # Auto-fix issues
```

## Debugging

### Backend Debugging

**Django Debug Toolbar** (add if needed):
```python
# In development settings
if DEBUG:
    INSTALLED_APPS += ['debug_toolbar']
    MIDDLEWARE = ['debug_toolbar.middleware.DebugToolbarMiddleware'] + MIDDLEWARE
```

**Django Shell:**
```bash
make shell
# Access Django ORM and test code
```

**Logging:**
```python
import logging
logger = logging.getLogger(__name__)
logger.debug('Debug message')
```

### Frontend Debugging

**React DevTools**: Install browser extension

**Console Debugging:**
```jsx
// Use console.warn or console.error (console.log filtered by linting)
console.warn('Debug info:', data)
```

**Network Tab**: Monitor API calls in browser DevTools

## Performance Considerations

### Backend Performance

- Use `select_related()` and `prefetch_related()` for database queries
- Implement database indexing for frequently queried fields
- Use Django's caching framework for expensive operations
- Optimize static file serving

### Frontend Performance

- Use React.memo() for expensive components
- Implement proper key props for lists
- Lazy load components with React.lazy()
- Optimize bundle size with Vite's tree shaking

## Security Best Practices

### Backend Security

- Never commit secrets to version control
- Use environment variables for sensitive data
- Implement proper user authentication and authorization
- Validate and sanitize all user input
- Use HTTPS in production

### Frontend Security

- Sanitize user input before rendering
- Use Content Security Policy headers
- Avoid storing sensitive data in localStorage
- Implement proper error handling without exposing internals

## Deployment

### Docker Configuration

The project uses multi-stage Docker builds:

**Backend Dockerfile:**
- Uses Python slim image
- Installs dependencies
- Copies application code
- Sets proper permissions

**Frontend Dockerfile:**
- Uses Node.js for building
- Switches to nginx for serving
- Optimizes for production

### Environment-Specific Configuration

**Development:**
- DEBUG=True
- Detailed error pages
- Hot reloading enabled

**Production:**
- DEBUG=False
- Security headers enabled
- Static file optimization
- Error logging configured

## Troubleshooting

### Common Issues

**Docker Issues:**
```bash
# Clean up containers
make clean

# Complete reset
make reset
```

**Database Issues:**
```bash
# Reset database
docker compose down -v
docker compose up --build
make migrate
make seed
```

**Frontend Issues:**
```bash
# Clear npm cache
cd frontend && rm -rf node_modules package-lock.json
cd frontend && npm install
```

**Permission Issues:**
```bash
# Fix file permissions (especially on Linux)
sudo chown -R $USER:$USER .
```

### Getting Help

1. Check the logs: `make logs`
2. Verify environment variables in `.env`
3. Ensure Docker containers are healthy
4. Check the CONTRIBUTING.md guide
5. Search existing GitHub issues

---

Happy coding! 🚀