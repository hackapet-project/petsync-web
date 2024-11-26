# PetSync Web

<div align="center">

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Django](https://img.shields.io/badge/django-%23092E20.svg?style=flat&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)

</div>

Welcome to PetSync Web! This is the web-based version of PetSync, a comprehensive platform for animal shelter management. Built with React, Django, and Docker, this application provides a robust solution for managing animal shelter operations.

## 🚀 Quick Start

### Prerequisites

- Docker 24.0 or higher
- Make (optional - alternative Docker commands provided)
- Git

### Installation & Setup

1. **Clone the Repository**
   ```bash
   # Using SSH
   git clone git@github.com:hackapet-project/petsync-web.git

   # Using HTTPS
   git clone https://github.com/hackapet-project/petsync-web.git

   cd petsync-web
   ```

2. **Build the Project**
   ```bash
   # Using Make
   make build

   # Using Docker directly
   docker compose build
   ```

3. **Start the Application**
   ```bash
   # Using Make
   make up

   # Using Docker directly
   docker compose up
   # To omit logs for a specific service:
   docker compose up --no-attach [service-name]
   ```

4. **Stop the Application**
   ```bash
   # Using Make
   make down

   # Using Docker directly
   docker compose down
   ```

### Access Points

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:8000](http://localhost:8000)
- API Documentation: [http://localhost:8000/v1/docs](http://localhost:8000/v1/docs)

## 📚 API Documentation

### Available Endpoints

#### Animals Resource

Base URL: `http://localhost:8000/v1/animals`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/animals` | Retrieve all animals |
| POST | `/animals` | Create a new animal record |
| GET | `/animals/:id` | Get a specific animal by ID |
| PUT | `/animals/:id` | Update an animal record |
| DELETE | `/animals/:id` | Delete an animal record |

> **Note**: The ID parameter must be an integer.

### Swagger Documentation
Comprehensive API documentation is available through Swagger at:
[http://localhost:8000/v1/docs](http://localhost:8000/v1/docs)

## 🛠 Development Guidelines

### Important Notes

- **After Git Pull**: Always rebuild the application to ensure new dependencies are installed:
  ```bash
  make build
  # or
  docker compose build
  ```

- **New Dependencies**: Rebuild the application after adding any new dependencies to either frontend or backend:
  ```bash
  make build
  # or
  docker compose build
  ```

### Project Structure

```
petsync-web/
├── frontend/          # React application
├── backend/           # Django application
├── docker/           # Docker configuration files
├── docker-compose.yml
└── Makefile
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📝 License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0) - see the [LICENSE](LICENSE) file for details. This means:

- ✔️ You can use this software for commercial purposes
- ✔️ You can modify this software
- ✔️ You can distribute this software
- ✔️ You can use this software privately
- ✔️ You can use warranty
- ℹ️ You must disclose the source code of your modified versions
- ℹ️ You must license your modifications under the GPL v3
- ℹ️ You must document changes made to the code
- ℹ️ You must state changes made to the code

For more information, please see the full [GPL v3 License text](https://www.gnu.org/licenses/gpl-3.0.txt).

## 🆘 Support

If you encounter any issues or have questions:
- Create an issue in our [Issue Tracker](https://github.com/hackapet-project/petsync-web/issues)
- Contact the development team at [dev@hackapet.org](mailto:dev@hackapet.org)

---

<div align="center">
Made with ❤️ by the Hackapet Team
</div>