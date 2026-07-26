# TODO App

A simple TODO application built as a full-stack Dockerized project.

The goal of this project is to experiment with interchangeable backend implementations while keeping the React frontend unchanged.

Designed to run on a Raspberry Pi 5 on my internal network allowing for any device connected to be able to add household todos.

## Current Features

- React + Vite frontend
- Node.js + Express REST API
- Ruby on Rails REST API
- Python FastAPI REST API
- Interchangeable backend architecture
  - Backend selection via Docker Compose profiles
  - Frontend remains unchanged between backend implementations
- Shared SQLite persistence layer
- Docker Compose orchestration

## Planned Features

- PostgreSQL shared database

## Project Structure

```text
home-todos/
│
├── frontend/
│   ├── React + Vite application
│   └── Dockerfile
│
├── backend-express/
│   ├── Express REST API
│   └── Dockerfile
│
├── backend-rails/
│   ├── Rails REST API
│   └── Dockerfile
|
├── backend-fastapi/
│   ├── FastAPI REST API
│   └── Dockerfile
│
├── database/
│   └── Shared SQLite database
│
└── docker-compose.yml
```

## Running

Requirements:

- Docker
- Docker Compose

From the project root:

### Node.js backend

```bash
docker compose --profile express up --build
```

### Ruby on Rails backend

```bash
docker compose --profile rails up --build
```

### Python FastAPI backend

```bash
docker compose --profile fastapi up --build
```

The application will be available at:

- Frontend: http://localhost:5173
- Node API: http://localhost:3030
