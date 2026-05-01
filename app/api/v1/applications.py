from typing import List

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.api.v1.auth import get_current_user
from app.db.session import get_db
from app.models.application import Application
from app.models.user import User
from app.schemas.application import ApplicationCreate, ApplicationRead

router = APIRouter(prefix="/applications", tags=["applications"])


@router.get("/", response_model=List[ApplicationRead])
def list_applications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(Application)
        .filter(Application.user_id == current_user.id)
        .all()
    )


@router.post("/", response_model=ApplicationRead, status_code=status.HTTP_201_CREATED)
def create_application(
    payload: ApplicationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    application = Application(
        user_id=current_user.id,
        **payload.model_dump(),
    )
    db.add(application)
    db.commit()
    db.refresh(application)
    return application


@router.put("/{application_id}", response_model=ApplicationRead)
def update_application(
    application_id: int,
    payload: ApplicationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    application = (
        db.query(Application)
        .filter(Application.id == application_id)
        .first()
    )

    if application is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found",
        )

    if application.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this application",
        )

    for field, value in payload.model_dump().items():
        setattr(application, field, value)

    db.commit()
    db.refresh(application)
    return application


@router.delete("/{application_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_application(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    application = (
        db.query(Application)
        .filter(Application.id == application_id)
        .first()
    )

    if application is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found",
        )

    if application.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this application",
        )

    db.delete(application)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)