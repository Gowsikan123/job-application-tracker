from fastapi import FastAPI

from app.api.v1.applications import router as applications_router
from app.db.base import Base
from app.db.session import engine
from app.models.application import Application

app = FastAPI(title="Job Application Tracker API", version="0.1.0")

Base.metadata.create_all(bind=engine)

app.include_router(applications_router)


@app.get("/")
def root():
    return {"message": "Job Application Tracker API is running"}


@app.get("/health")
def health():
    return {"status": "ok"}