from fastapi import APIRouter,  Depends, HTTPException 
from sqlalchemy.orm import Session 
from models import Game  # SQLAlchemy model matching DB schema
from app.db.session import get_db
from app.dependencies.admin_required import admin_required
from schemas import GameCreate, GameUpdate, GameInDB
from typing import List
 
router = APIRouter(tags=["Admin"])
@router.post("/games/", response_model=GameInDB)
def create_game(
    game: GameCreate, 
    db: Session = Depends(get_db),
    admin = Depends(admin_required)
):
    # Check if a game with the same title already exists
    existing_game = (
        db.query(Game)
        .filter(Game.title.ilike(game.title))  # case-insensitive match
        .first()
    )

    if existing_game:
        raise HTTPException(
            status_code=400,
            detail=f"Game '{game.title}' already exists in your backlog."
        )

    db_game = Game(**game.dict())
    db.add(db_game)
    db.commit()
    db.refresh(db_game)
    return db_game

@router.put("/games/{game_id}", response_model=GameInDB)
def update_game(
    game_id: int, 
    game: GameUpdate, 
    db: Session = Depends(get_db),
    admin = Depends(admin_required)
):
    db_game = db.query(Game).filter(Game.id == game_id).first()
    if not db_game:
        raise HTTPException(status_code=404, detail="Game not found")
    for key, value in game.dict(exclude_unset=True).items():
        setattr(db_game, key, value)
    db.commit()
    db.refresh(db_game)
    return db_game

@router.delete("/games/{game_id}")
def delete_game(
    game_id: int,  
    db: Session = Depends(get_db),
    admin = Depends(admin_required)
):
    db_game = db.query(Game).filter(Game.id == game_id).first()
    if not db_game:
        raise HTTPException(status_code=404, detail="Game not found")
    db.delete(db_game)
    db.commit()
    return {"message": "Game deleted"}
