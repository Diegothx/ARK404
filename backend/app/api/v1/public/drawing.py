from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import  extract, func
from app.db.session import get_db
from app.db.models.drawings import Collection, Drawing
 
import os

router = APIRouter(
    prefix="/drawings",
    tags=["Drawings"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)  # create folder if not exists

 

# -----------------------------
# List drawings by year
# -----------------------------
@router.get("/year/{year}")
def get_drawings_by_year(year: int, db: Session = Depends(get_db)):
    drawings = db.query(Drawing).filter(
        extract("year", Drawing.drawing_date) == year
    ).order_by(Drawing.drawing_date.asc()).all()
    return drawings
 
# -----------------------------
# List drawings valid years
# -----------------------------
@router.get("/years")
def get_drawing_years(db: Session = Depends(get_db)):
    years = db.query(
        func.distinct(extract("year", Drawing.drawing_date))
    ).order_by(extract("year", Drawing.drawing_date).desc()).all()

    # flatten tuples to ints
    return [int(y[0]) for y in years if y[0] is not None]


# -----------------------------
# List all collections
# -----------------------------
@router.get("/collections")
def list_collections(db: Session = Depends(get_db)):
    return db.query(Collection).all()