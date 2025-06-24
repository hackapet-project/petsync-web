#!/bin/sh
set -e

echo "📡 Waiting for Postgres..."
until python -c "import psycopg2, os; psycopg2.connect(os.environ['DATABASE_URL'])"; do
  echo "Postgres not ready — sleeping"
  sleep 1
done

echo "🔧 Applying migrations..."
python manage.py migrate --noinput

echo "🎨 Collecting static files..."
python manage.py collectstatic --noinput

echo "🚀 Starting Gunicorn..."
exec gunicorn refupet_project.wsgi:application \
  --bind 0.0.0.0:8001 \
  --workers 3 \
  --threads 2 \
  --timeout 120 \
  --log-level info
