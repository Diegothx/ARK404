from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.db.session import get_db

router = APIRouter(tags=["Quotes"])

@router.get("/get-quote")
def get_quote(db: Session = Depends(get_db)):
    try:
        result = db.execute(
            text("SELECT content FROM quotes ORDER BY RANDOM() LIMIT 1")
        ).fetchone()

        if result:
            return {"quote": result.content}
        return {"quote": None, "message": "No quotes found"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
