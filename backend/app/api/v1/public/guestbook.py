from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models.guestbook import GuestbookEntry
from app.schemas.guestbook import GuestbookCreate, GuestbookResponse
from app.utils.email import send_guestbook_notification
router = APIRouter(
    prefix="/guestbook",
    tags=["Guestbook"],
)

@router.post("/", response_model=GuestbookResponse)
def create_entry(
    entry: GuestbookCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    db_entry = GuestbookEntry(**entry.model_dump())
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)


    background_tasks.add_task(
        send_guestbook_notification,
        db_entry.name,
        db_entry.message,
        db_entry.email
    )
    return db_entry

@router.get("/", response_model=list[GuestbookResponse])
def list_entries(db: Session = Depends(get_db)):
    stmt = select(GuestbookEntry).order_by(GuestbookEntry.created_at.desc())
    return db.execute(stmt).scalars().all()