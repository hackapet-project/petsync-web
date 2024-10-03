# Security Guidelines

RefuPet takes security seriously. This document outlines security practices and guidelines for contributors.

## 🔐 General Security Principles

### Never Commit Secrets

**NEVER commit the following to version control:**
- Passwords or password hashes
- API keys or tokens
- Secret keys or certificates
- Database credentials
- Environment files with real data

**Always use:**
- Environment variables for secrets
- `.env.example` with placeholder values
- Random password generation for development
- Secure secret management in production

### Environment Variables

**Development:**
```bash
# ✅ Good - placeholder values
DJANGO_SECRET_KEY=your-super-secret-key-change-this-in-production
POSTGRES_PASSWORD=your-password-here

# ❌ Bad - real secrets
DJANGO_SECRET_KEY=abc123realkey456
POSTGRES_PASSWORD=myactualpassword
```

**Production:**
```bash
# Use proper secret management
DJANGO_SECRET_KEY=$(cat /run/secrets/django_secret)
DATABASE_URL=postgresql://user:$(cat /run/secrets/db_password)@db:5432/refupet
```

## 🛡️ Django Security

### Settings Security

**Secure settings for production:**
```python
# settings.py
DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com']
SECURE_SSL_REDIRECT = True
SECURE_HSTS_SECONDS = 31536000
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
```

### User Authentication

**Password requirements:**
- Minimum 12 characters for development accounts
- Use Django's built-in password validators
- Never store passwords in plain text
- Use Django's authentication system

**Session security:**
```python
SESSION_COOKIE_AGE = 3600  # 1 hour
SESSION_EXPIRE_AT_BROWSER_CLOSE = True
SESSION_COOKIE_HTTPONLY = True
```

### Database Security

**Connection security:**
- Use SSL/TLS for database connections in production
- Limit database user permissions
- Regular security updates
- Database connection pooling

**Query security:**
- Always use Django ORM or parameterized queries
- Never concatenate user input into SQL
- Validate all user inputs

## 🌐 Frontend Security

### Input Validation

**Always validate and sanitize:**
```jsx
// ✅ Good - validate input
const sanitizeInput = (input) => {
  return input.trim().replace(/[<>]/g, '');
};

// ❌ Bad - direct use of user input
element.innerHTML = userInput;
```

### API Security

**Secure API communication:**
```jsx
// Use HTTPS in production
const API_BASE = process.env.VITE_API_URL;

// Include CSRF tokens
const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

fetch(`${API_BASE}/api/endpoint`, {
  method: 'POST',
  headers: {
    'X-CSRFToken': csrfToken,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});
```

### Content Security Policy

**Implement CSP headers:**
```python
# In Django middleware or nginx
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = 'DENY'
```

## 🐳 Docker Security

### Container Security

**Use non-root users:**
```dockerfile
# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser
USER appuser
```

**Minimal base images:**
```dockerfile
# Use slim or alpine images
FROM python:3.11-slim
# Instead of: FROM python:3.11
```

### Secrets Management

**Use Docker secrets:**
```yaml
# docker-compose.yml
secrets:
  django_secret:
    file: ./secrets/django_secret.txt
  
services:
  backend:
    secrets:
      - django_secret
```

## 📝 Development Security

### Pre-commit Hooks

**Security checks in pre-commit:**
```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets
        args: ['--baseline', '.secrets.baseline']
```

### Code Review Checklist

**Security review points:**
- [ ] No hardcoded secrets or credentials
- [ ] Input validation for all user inputs
- [ ] Proper authentication and authorization
- [ ] HTTPS used for all external communications
- [ ] Error messages don't leak sensitive information
- [ ] Logging doesn't include sensitive data

### Development Data

**Secure development setup:**
```python
# Generate random passwords
import secrets
import string

def generate_password(length=12):
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(length))

# Use in management commands
password = generate_password()
user.set_password(password)
```

## 🚨 Incident Response

### If Secrets Are Committed

1. **Immediately rotate the compromised secret**
2. **Force push to remove from history (if possible)**
3. **Check if the secret was used maliciously**
4. **Update all systems using the secret**
5. **Review access logs**

### Security Issue Reporting

**For security vulnerabilities:**
- Email: security@hackapet.org
- Include: Detailed description, steps to reproduce
- Don't create public GitHub issues for security problems

## 🔒 Production Security

### Environment Hardening

**Server security:**
- Keep OS and packages updated
- Use firewalls to limit access
- Regular security audits
- Monitor for unusual activity

**Application security:**
- Regular dependency updates
- Security scanning in CI/CD
- Rate limiting on APIs
- Proper logging without sensitive data

### Backup Security

**Secure backups:**
- Encrypt backups at rest
- Secure backup storage access
- Regular backup testing
- Retention policies

## 📚 Security Resources

### Tools and Libraries

**Python/Django:**
- `django-security` - Additional security middleware
- `bandit` - Security linter for Python
- `safety` - Check for known vulnerabilities

**JavaScript/React:**
- `npm audit` - Check for vulnerable packages
- `eslint-plugin-security` - Security linting rules

### Best Practices

**OWASP Top 10:**
- Injection attacks
- Broken authentication
- Sensitive data exposure
- XML external entities (XXE)
- Broken access control
- Security misconfiguration
- Cross-site scripting (XSS)
- Insecure deserialization
- Known vulnerabilities
- Insufficient logging & monitoring

### Regular Security Tasks

**Monthly:**
- Update dependencies
- Review access logs
- Check for security advisories

**Quarterly:**
- Security audit
- Penetration testing
- Review user permissions

**Annually:**
- Full security assessment
- Update security policies
- Team security training

---

## 📞 Questions?

For security questions or concerns:
- General: security@hackapet.org
- Urgent: Create a private GitHub security advisory

Remember: When in doubt, err on the side of caution! 🛡️