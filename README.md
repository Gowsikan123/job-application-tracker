# Job Application Tracker (API)

A headless FastAPI backend for tracking job applications, companies, contacts, notes, follow-ups, and analytics.  
Built as a portfolio project to demonstrate production-style Python backend skills.

## Tech Stack

**Current**

- Python 3.13
- FastAPI
- Pydantic v2
- Uvicorn
- SQLAlchemy ORM
- SQLite (local development)

**Planned**

- PostgreSQL (production database)
- Redis (caching, rate limiting, background jobs)
- Docker & docker-compose for one-command startup

## Features

**Implemented so far**

- `GET /` – API health message
- `GET /health` – simple health check
- `POST /applications` – create a job application from JSON
- `GET /applications` – list all applications
- Data persists using SQLite + SQLAlchemy (survives server restarts)

**Planned next**

- User accounts and authentication (JWT, password hashing)
- Company model and relationships
- Filtering by status, source, date
- Basic stats endpoint (applied, interviewing, offers, rejected)
- Docker-based local Postgres + Redis

## Project Structure

```text
app/
  api/
    v1/
      applications.py      # Applications router (GET/POST)
  db/
    base.py                # SQLAlchemy base class
    session.py             # Engine + SessionLocal + get_db()
  models/
    application.py         # Application ORM model
  schemas/
    application.py         # Pydantic models (ApplicationCreate, ApplicationRead)
  main.py                  # FastAPI app, router registration, DB init

.env.example               # Example environment variables
requirements.txt           # Python dependencies
Dockerfile                 # Container definition (planned usage)
docker-compose.yml         # Local stack (planned usage)
```

## Running Locally (without Docker)

```bash
# 1. Create and activate a virtual environment
python -m venv .venv
# Windows PowerShell:
.\.venv\Scripts\Activate.ps1

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run the API
python -m uvicorn app.main:app
```

Then open:

- API root: http://127.0.0.1:8000  
- API docs (Swagger): http://127.0.0.1:8000/docs

## Environment Variables

Copy `.env.example` to `.env` and adjust as needed:

```env
APP_ENV=development
APP_HOST=127.0.0.1
APP_PORT=8000

DATABASE_URL=sqlite:///./job_tracker.db
REDIS_URL=redis://localhost:6379/0

JWT_SECRET_KEY=change-me
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

(Current code uses the SQLite URL; Postgres/Redis will be wired in later.)

## Development Notes

- Uses Pydantic v2 models for request/response validation.
- Uses SQLAlchemy ORM for persistence.
- Designed to be extended with users, auth, and more complex job-tracking logic.
- API-first: this project is intentionally headless (no frontend) to focus on backend logic.