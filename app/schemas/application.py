from datetime import date
from pydantic import BaseModel, Field, ConfigDict


class ApplicationBase(BaseModel):
    job_title: str = Field(..., min_length=2, max_length=255)
    company_name: str = Field(..., min_length=2, max_length=255)
    status: str = Field("saved", description="saved, applied, interview, offer, rejected")
    source: str | None = None
    application_url: str | None = None
    salary_text: str | None = None
    applied_on: date | None = None
    notes: str | None = None


class ApplicationCreate(ApplicationBase):
    pass


class ApplicationRead(ApplicationBase):
    id: int
    user_id: int

    model_config = ConfigDict(from_attributes=True)