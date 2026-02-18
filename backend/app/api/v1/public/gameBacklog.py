from fastapi import  APIRouter,  Depends, HTTPException 
from sqlalchemy.orm import Session 
from app.db.models import GameBase
from app.db.session import get_db
from app.schemas.gameBacklog import  GameResponse  # Pydantic model for API responses
from typing import List

router = APIRouter(tags=["game"])

@router.get("/games/", response_model=List[GameResponse])
def list_games(
    db: Session = Depends(get_db)
):
    return db.query(GameBase).all()

@router.get("/games/{game_id}", response_model=GameResponse)
def get_game(
    game_id: int,  
    db: Session = Depends(get_db)
):
    game = db.query(GameBase).filter(GameBase.id == game_id).first()
    if not game:
        raise HTTPException(status_code=404, detail="Game not found")
    return game
 