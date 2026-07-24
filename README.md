# TODO App

A simple TODO application built as a full-stack Dockerized project.

The goal of this project is to experiment with interchangeable backend implementations while keeping the React frontend unchanged.

Designed to run on a Raspberry Pi 5 on my internal network allowing for any device connected to be able to add household todos.

## Current Features

- React + Vite frontend
- Node.js + Express REST API
- Docker Compose orchestration
- SQLite persistence (temporary)

## Planned Features

- Ruby on Rails API implementation
- Optional FastAPI implementation
- PostgreSQL shared database
- Backend selection via Docker Compose

## Project Structure

```text
todo-app/
│
├── frontend/
│   ├── React + Vite
│   └── Dockerfile
│
├── backend-node/
│   ├── Express API
│   ├── SQLite database
│   └── Dockerfile
│
├── backend-rails/
│   └── Rails API (in progress)
│
└── docker-compose.yml
```

## Running

Requirements:

- Docker
- Docker Compose

From the project root:

```bash
docker compose up --build
```

The application will be available at:

- Frontend: http://localhost:5173
- Node API: http://localhost:3030