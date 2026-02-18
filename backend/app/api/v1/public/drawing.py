from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import  extract, func
from app.db.session import get_db 
from app.schemas.drawing import Drawing, Collection 
from app.db.models import Drawing as DrawingModel,  Collection as CollectionModel
router = APIRouter(
    prefix="/drawings",
    tags=["Drawings"],
) 
# -----------------------------
# List drawings by year
# -----------------------------
@router.get("/year/{year}", response_model=list[Drawing])
def get_drawings_by_year(year: int, db: Session = Depends(get_db)):
    drawings = db.query(DrawingModel).filter(
        extract("year", DrawingModel.drawing_date) == year
    ).order_by(DrawingModel.drawing_date.asc()).all()
    return drawings
 
# -----------------------------
# List drawings valid years
# -----------------------------
@router.get("/years", response_model=list[int])
def get_drawing_years(db: Session = Depends(get_db)):
    years = db.query(
        func.distinct(extract("year", DrawingModel.drawing_date))
    ).order_by(extract("year", DrawingModel.drawing_date).desc()).all()

    # flatten tuples to ints
    return [int(y[0]) for y in years if y[0] is not None]


# -----------------------------
# List all collections
# -----------------------------
@router.get("/collections", response_model=list[Collection])
def list_collections(db: Session = Depends(get_db)):
    return db.query(CollectionModel).all()