# Stage 1: Build dependencies
FROM python:3.11-slim as builder

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
 && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /wheels -r requirements.txt

# Stage 2: Final image
FROM python:3.11-slim

# Install netcat
RUN apt-get update && apt-get install -y netcat-traditional && rm -rf /var/lib/apt/lists/*

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV HOME=/home/app
ENV PATH="/home/app/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:$PATH"
ENV PIP_CACHE_DIR="/home/app/.cache/pip"

RUN groupadd -r app && useradd -r -g app -d /home/app -m -s /bin/false app

WORKDIR /home/app/web

COPY --from=builder /wheels /wheels
COPY --from=builder /usr/src/app/requirements.txt .

RUN pip install --no-cache /wheels/* --user

# Copy project files
COPY . .

# ✅ Ensure staticfiles/ is writable by non-root user
RUN mkdir -p /home/app/web/staticfiles && chown -R app:app /home/app/web/staticfiles

# Copy entrypoint
COPY entrypoint.sh /home/app/web/entrypoint.sh
RUN chmod +x /home/app/web/entrypoint.sh

USER app

EXPOSE 8000

CMD ["gunicorn", "refupet_project.wsgi:application", "--bind", "0.0.0.0:8000"]
