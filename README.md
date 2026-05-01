# Job Application Tracker

A full-stack portfolio project for tracking job applications, companies, contacts, notes, follow-ups, and analytics.

## Tech Stack

- FastAPI
- PostgreSQL
- Redis
- Docker
- Python

## Run locally

```bash
docker compose up --build
```

Then open:

- API: http://localhost:8000
- Docs: http://localhost:8000/docs

## Current Status

- FastAPI backend running locally
- OpenAPI docs at `/docs`
- `POST /applications` to create job applications
- `GET /applications` to list them
- Data stored in SQLite via SQLAlchemy (persists after restart)