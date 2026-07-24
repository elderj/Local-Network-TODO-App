# TODO App

A simple TODO application built as a full-stack Dockerized project.

The goal of this project is to experiment with a swappable backend architecture:
- React frontend
- Node.js/Express API backend
- Ruby on Rails API backend (planned)
- Shared database layer (planned)

The frontend should remain unchanged regardless of which backend implementation is running.

## Current Project Structure

home-todo/
│
├── frontend/
│ ├── React + Vite application
│ └── Dockerfile
│
├── backend/
│ ├── Node.js + Express API
│ ├── SQLite database (temporary)
│ └── Dockerfile
│
└── docker-compose.yml