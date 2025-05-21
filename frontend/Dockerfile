# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve built files
FROM node:20-alpine

WORKDIR /app

# Install a static file server
RUN npm install -g serve

# Copy built frontend
COPY --from=build /app/dist /app/dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
