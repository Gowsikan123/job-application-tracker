from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from app.api.v1.applications import router as applications_router
from app.api.v1.auth import router as auth_router
from app.db.base import Base
from app.db.session import engine
from app.models.application import Application
from app.models.user import User

app = FastAPI(title="Job Application Tracker API", version="0.1.0")

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(applications_router)

app.mount("/static", StaticFiles(directory="app/static"), name="static")
templates = Jinja2Templates(directory="app/templates")


@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={},
    )


@app.get("/health")
def health():
    return {"status": "ok"}