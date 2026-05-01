# 💼 Job Application Tracker

A full-stack web application for tracking job applications from first contact to final outcome — with JWT authentication, per-user data isolation, a REST API, and a minimal vanilla JS frontend.

Built with **FastAPI**, **SQLite**, and **SQLAlchemy** as a portfolio project demonstrating production-style Python backend skills.

---

## ✨ Features

- 🔐 **JWT authentication** — register, login, and protected routes via Bearer tokens
- 📋 **Application management** — create, read, update, and delete job applications
- 👤 **Per-user isolation** — each user only sees their own data
- 🌐 **Minimal frontend** — register, login, and manage applications from the browser
- 💬 **Swagger UI** — built-in interactive API docs at `/docs`
- 🗃️ **SQLite persistence** — data survives server restarts
- 🐳 **Docker support** — run the full app with Docker Compose

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | FastAPI (Python 3.13) |
| Database | SQLite + SQLAlchemy ORM |
| Auth | JWT (Bearer tokens via python-jose) |
| Validation | Pydantic v2 |
| Frontend | HTML, CSS, Vanilla JavaScript |
| Server | Uvicorn (ASGI) |
| Container | Docker + Docker Compose |

---

## 📁 Project Structure

```
job-application-tracker/
├── app/
│   ├── main.py           # App entry point and router registration
│   ├── api/              # Route handlers (auth, applications)
│   ├── models/           # SQLAlchemy database models
│   ├── schemas/          # Pydantic request/response schemas
│   ├── db/               # Database setup and session management
│   ├── core/             # Config, security, and JWT utilities
│   ├── templates/        # HTML templates
│   └── static/           # CSS and JavaScript files
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
└── .env.example
```

---

## 🚀 Getting Started

### Option A — Run locally

#### 1. Clone the repo

```bash
git clone https://github.com/Gowsikan123/job-application-tracker.git
cd job-application-tracker
```

#### 2. Create and activate a virtual environment

```bash
# Windows
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# macOS/Linux
python3 -m venv .venv
source .venv/bin/activate
```

#### 3. Install dependencies

```bash
pip install -r requirements.txt
```

#### 4. Set up environment variables

```bash
cp .env.example .env
# Edit .env with your values
```

Key variables:

```env
DATABASE_URL=sqlite:///./job_tracker.db
JWT_SECRET_KEY=change-me
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

#### 5. Run the app

```bash
uvicorn app.main:app --reload
```

### Option B — Run with Docker

```bash
docker-compose up --build
```

Then open:

- **Frontend:** [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **API docs (Swagger):** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 📖 API Overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login and receive JWT token |
| `GET` | `/applications` | List your applications |
| `POST` | `/applications` | Create a new application |
| `PUT` | `/applications/{id}` | Update an application |
| `DELETE` | `/applications/{id}` | Delete an application |

All `/applications` routes require `Authorization: Bearer <token>`.

---

## 🔮 Planned Improvements

- Filter by status, company, or date applied
- Dashboard stats (applied, interviewing, offers, rejected)
- Notes and timeline per application
- Switch to PostgreSQL for production deployments

---

## 👤 Author

**Gowsikan** — [GitHub](https://github.com/Gowsikan123)
