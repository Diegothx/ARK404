from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.dependencies import get_current_admin

router = APIRouter(tags=["Admin"])

@router.post("/admin/add-quote")
def add_quote(quote: str, db: Session = Depends(get_db), admin: dict = Depends(get_current_admin)):
    """
    Add a new quote (admin only)
    """
    try:
        db.execute("INSERT INTO quotes (quote) VALUES (:quote)", {"quote": quote})
        db.commit()
        return {"message": "Quote added successfully"}
    except Exception as e:
        return {"error": str(e)}