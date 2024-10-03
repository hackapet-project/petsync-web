# 🐾 PetSync Web – RefuPet

<div align="center">

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat\&logo=react\&logoColor=%2361DAFB)](https://reactjs.org/)
[![Django](https://img.shields.io/badge/django-%23092E20.svg?style=flat\&logo=django\&logoColor=white)](https://www.djangoproject.com/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat\&logo=docker\&logoColor=white)](https://www.docker.com/)
[![Coolify](https://img.shields.io/badge/Deploy%20with-Coolify-%23172B4D?style=flat\&logo=hetzner)](https://coolify.io)

</div>

**RefuPet** is the open-source web platform for managing animal shelters, built with a modern full-stack:

* **Frontend**: Vite + React
* **Backend**: Django (with Gunicorn)
* **Database**: PostgreSQL
* **Deployment**: Docker (Coolify-compatible)

> 🛠️ **Status**: Pre-alpha. The foundation is production-ready and secure. Core features will follow.

---

## ✅ Features (Completed So Far)

### ⚙️ Backend

* Secure Django 4+ setup using Gunicorn
* PostgreSQL integration with environment-configured secrets
* Hardened `settings.py` with SSL/HTTPS awareness
* Collectstatic and migrations handled via Docker entrypoint
* AGPL-licensed and production-ready
* `.env`-based secret injection
* Open source & auditable

### 🌐 Frontend

* React + Vite-based frontend
* Live dev server with hot reload (`npm run dev`)
* Docker build process optimized for Coolify
* Environment-aware API base URL (`VITE_API_URL`)

### 🐳 Dockerized Infrastructure

* Multi-stage backend Dockerfile for slim and secure builds
* Frontend build + runtime separation
* Healthcheck on Postgres
* Static file permissions fixed for non-root deployment
* Works on Coolify with minimal config

---

## 🚀 How to Run Locally

```bash
cp .env.production .env
docker compose up --build
```

Once up:

* Backend: [http://localhost:8000/](http://localhost:8000/)
* Admin panel: [http://localhost:8000/admin](http://localhost:8000/admin)
* Frontend (dev): [http://localhost:5173/](http://localhost:5173/)

---

## 📁 Project Structure

```
/
├── backend/
│   ├── Dockerfile
│   ├── manage.py
│   ├── refupet_project/
│   ├── requirements.txt
│   └── entrypoint.sh
├── frontend/
│   ├── Dockerfile
│   └── ...
├── docker/
│   └── docker-compose.yml
├── .env
└── README.md
```

---

## 📝 License

Licensed under the **GNU AGPL v3**.
See [LICENSE](LICENSE) for details.

> This license ensures that all modifications and usage in networks (e.g., as a web app) remain open-source.

---

## 🚘 Support

Got questions or ideas? We’re happy to hear them:

* 📂 [GitHub Issues](https://github.com/hackapet-project/petsync-web/issues)
* 📢 [dev@hackapet.org](mailto:dev@hackapet.org)

<div align="center">
Made with ❤️ by the Hackapet Team
</div>
