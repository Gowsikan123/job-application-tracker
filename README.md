# Job Application Tracker

A small FastAPI project for tracking job applications with JWT authentication and a minimal HTML/JavaScript frontend.

Built as a portfolio project to demonstrate **backend** skills (FastAPI, SQLAlchemy, JWT auth) plus a simple browser UI for CRUD. 

## Tech Stack

**Backend**

- Python 3.13
- FastAPI
- Pydantic v2
- SQLAlchemy ORM
- SQLite (local development)
- Uvicorn

**Frontend**

- HTML template rendered by FastAPI
- Vanilla JavaScript (`fetch`)
- Simple CSS (no framework)

## Features

### Implemented

- JWT-based user authentication
  - Register new user
  - Login to get access token
  - Protected routes with `Authorization: Bearer <token>`
- Job applications CRUD (per user)
  - Create application
  - List your applications
  - Edit application
  - Delete application
- Simple browser UI
  - Login and register forms
  - “Add / Edit application” form
  - “Your applications” list with Edit/Delete buttons
- Data persistence with SQLite (survives server restarts)

### Planned / Nice to Have

- Filtering by status, source, or date
- Basic stats (total applications, interviews, offers, rejected)
- Switch from SQLite to PostgreSQL for production
- Docker setup with Postgres + Redis

## Project Structure

```text
app/
  api/
    v1/
      applications.py      # Applications CRUD endpoints
      auth.py              # Auth endpoints (register, login)
  core/
    security.py            # JWT creation and password hashing
  db/
    base.py                # SQLAlchemy base class
    session.py             # Engine + SessionLocal + get_db()
  models/
    application.py         # Application ORM model
    user.py                # User ORM model
  schemas/
    application.py         # Pydantic models for applications
    user.py                # Pydantic models for users
  static/
    app.js                 # Frontend logic (login, CRUD via fetch)
  templates/
    index.html             # Simple frontend (login + tracker UI)
  main.py                  # FastAPI app, router registration, DB init

.env.example               # Example environment variables
requirements.txt           # Python dependencies
Dockerfile                 # Container definition (future use)
docker-compose.yml         # Local stack (future use)
```

## Running Locally (without Docker)

```bash