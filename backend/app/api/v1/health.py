from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text  # Add this import
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
        # Wrap the SQL string in text()
        result = db.execute(text("SELECT 1;")).fetchone()
        return {"db_connection": "Success", "result": result[0] if result else None}
    except Exception as e:
        return {"db_connection": "Failed", "error": str(e)}

@router.get("/get-quote")
def get_quote(db: Session = Depends(get_db)):
    """
    Retrieve a random quote from the database.
    """
    try:
        result = db.execute(text("SELECT quote FROM quotes ORDER BY RANDOM() LIMIT 1;")).fetchone()
        if result:
            return {"quote": result[0]}
        else:
            return {"quote": None, "message": "No quotes found in the database."}
    except Exception as e:
        return {"error": str(e)}