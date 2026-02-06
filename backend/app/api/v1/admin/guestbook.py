from fastapi import APIRouter, Depends 
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models.guestbook import GuestbookEntry 
from app.dependencies.admin_required import admin_required

router = APIRouter(
    prefix="/guestbook",
    tags=["Guestbook"],
)

@router.delete("/{entry_id}", response_model=dict)
def delete_entry(
    entry_id: int,
    db: Session = Depends(get_db),
    admin = Depends(admin_required)
):
    entry = db.get(GuestbookEntry, entry_id)
    if not entry:
        return {"success": False, "message": "Entry not found"}
    db.delete(entry)
    db.commit()
    return {"success": True, "message": "Entry deleted"}