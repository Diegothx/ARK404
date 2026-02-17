from fastapi import  APIRouter,  Depends, HTTPException 
from sqlalchemy.orm import Session 
from models import Game  # SQLAlchemy model matching DB schema
from app.db.session import get_db
from schemas import  GameInDB
from typing import List

router = APIRouter(tags=["game"])

@router.get("/games/", response_model=List[GameInDB])
def list_games(
    db: Session = Depends(get_db)
):
    return db.query(Game).all()

@router.get("/games/{game_id}", response_model=GameInDB)
def get_game(
    game_id: int,  
    db: Session = Depends(get_db)
):
    game = db.query(Game).filter(Game.id == game_id).first()
    if not game:
        raise HTTPException(status_code=404, detail="Game not found")
    return game
 