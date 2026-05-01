# Job Application Tracker

A small FastAPI project for tracking job applications with JWT authentication and a minimal HTML/JavaScript frontend.

Built as a portfolio project to demonstrate production-style Python backend skills (FastAPI, SQLAlchemy, JWT auth) plus a simple browser UI for CRUD.

---

## Tech Stack

- Python 3.13
- FastAPI
- Pydantic v2
- SQLAlchemy ORM
- SQLite (local development)
- Uvicorn
- HTML + vanilla JavaScript + CSS (no frontend framework)

---

## Features

### Backend

- JWT-based authentication
  - Register new user
  - Login to get access token
  - Protected routes using `Authorization: Bearer <token>`
- Job applications (per user)
  - Create application
  - List your applications
  - Update application
  - Delete application
- Data persisted in SQLite so it survives server restarts

### Frontend

- Simple web UI served at `/`
- Register and login forms
- “Add / Edit Application” form
- “Your Applications” list with Edit/Delete buttons
- All operations use `fetch` to call the FastAPI API

### Nice-to-have ideas (not implemented yet)

- Filters by status, source, or date
- Basic stats (how many applied, interview, offer, rejected)
- Switch to PostgreSQL for production
- Docker setup with Postgres + Redis

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Gowsikan123/job-application-tracker.git
cd job-application-tracker
```

### 2. Create and activate a virtual environment

```bash
python -m venv .venv

# Windows PowerShell
.\.venv\Scripts\Activate.ps1
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Copy `.env.example` to `.env` and adjust if needed:

```env
APP_ENV=development
APP_HOST=127.0.0.1
APP_PORT=8000

DATABASE_URL=sqlite:///./job_tracker.db

JWT_SECRET_KEY=change-me
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

The default `DATABASE_URL` uses a local SQLite file.

### 5. Run the app

```bash
uvicorn app.main:app --reload
```

Then open:

- Frontend: http://127.0.0.1:8000/
- API docs (Swagger): http://127.0.0.1:8000/docs

---

## Usage

1. Go to the root page (`/`).
2. Register a new account.
3. Log in with that account.
4. Add, edit, and delete your job applications from the UI.
5. Optionally, call the API directly using the Swagger docs or a tool like Postman.

Each user only sees **their own** applications.

---

## Why this project exists

This project is meant as a compact demonstration of:

- building a FastAPI backend with authentication,
- structuring CRUD endpoints with SQLAlchemy and Pydantic,
- wiring a minimal frontend to an API using `fetch`,
- and documenting setup clearly so others can run it easily.