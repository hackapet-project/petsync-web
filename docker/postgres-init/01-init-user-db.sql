-- Create user and database
CREATE USER refupet_user WITH PASSWORD 'refupet_password';
CREATE DATABASE refupet_db OWNER refupet_user;
GRANT ALL PRIVILEGES ON DATABASE refupet_db TO refupet_user;

-- Connect to the database and grant schema permissions
\c refupet_db;
GRANT ALL ON SCHEMA public TO refupet_user;