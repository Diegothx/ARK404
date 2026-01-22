from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db

router = APIRouter(tags=["Health"])

@router.get("/")
async def root():
    return {"message": "Ark backend is running!"}

@router.get("/db-test")
def db_test(db: Session = Depends(get_db)):
    """
    Test database connection by running a simple query.
    """
    try:
        result = db.execute("SELECT 1;").fetchone()
        return {"db_connection": result[0] if result else None}
    except Exception as e:
        return {"db_connection": "Failed", "error": str(e)}
