# Job Application Tracker

> A self-hosted web application to track job applications, statuses, and deadlines — built with FastAPI and Docker.

![Status](https://img.shields.io/badge/status-complete-brightgreen)
![Stack](https://img.shields.io/badge/stack-FastAPI%20%7C%20Docker%20%7C%20SQLite-informational)
![Python](https://img.shields.io/badge/python-3.11%2B-blue)

---

## What It Does

Tired of tracking job applications across spreadsheets and browser tabs? This app gives you a clean dashboard to log every application, track its status through the pipeline, and set reminders for follow-ups and deadlines.

Built as a personal productivity tool and a practical exercise in containerised Python web services.

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Backend | FastAPI | Modern async Python API with automatic OpenAPI docs |
| Database | SQLite | Simple, file-based persistence, no server required |
| Containerisation | Docker | Reproducible environment, one-command setup |
| Frontend | Jinja2 Templates | Server-rendered HTML — fast and dependency-free |

---

## Key Features

- **Application logging** — Add companies, roles, application dates, and URLs
- **Status pipeline** — Track each application through: Applied → Interview → Offer → Rejected
- **Deadline tracking** — Flag upcoming interviews and follow-up dates
- **Dashboard view** — At-a-glance summary of your whole job search
- **Dockerised** — Runs identically on any machine with Docker installed
- **Auto API docs** — FastAPI's built-in `/docs` Swagger UI for exploring the API

---

## Local Setup

### With Docker (recommended)
```bash
git clone https://github.com/Gowsikan123/job-application-tracker.git
cd job-application-tracker
docker build -t job-tracker .
docker run -p 8000:8000 job-tracker
# Open http://localhost:8000
```

### Without Docker
```bash
git clone https://github.com/Gowsikan123/job-application-tracker.git
cd job-application-tracker
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
# Open http://localhost:8000
```

---

## API Reference

FastAPI generates interactive documentation automatically:

| Endpoint | Method | Description |
|---|---|---|
| `/` | GET | Dashboard view |
| `/applications` | GET | List all applications |
| `/applications` | POST | Add a new application |
| `/applications/{id}` | PUT | Update status or details |
| `/applications/{id}` | DELETE | Remove an application |
| `/docs` | GET | Swagger UI — interactive API explorer |

---

## What I Learned

- Structuring a FastAPI project with routers, models, and schemas
- Writing Dockerfiles and understanding container networking
- Using SQLAlchemy ORM with SQLite for type-safe database access
- Serving server-rendered HTML from a Python backend (Jinja2 templating)

---

## Author

**Gowsikan** — [GitHub](https://github.com/Gowsikan123)