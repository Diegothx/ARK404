from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.db.session import get_db
from app.dependencies.admin_required import admin_required
from app.schemas.quote import QuoteCreate

router = APIRouter(tags=["Admin"])

@router.post("/admin/add-quote")
def add_quote(
    payload: QuoteCreate,
    db: Session = Depends(get_db),
    user=Depends(admin_required),
):
    db.execute(
        text("INSERT INTO quotes (content) VALUES (:content)"),
        {"content": payload.content},
    )
    db.commit()
    return {"message": "Quote added successfully"}

