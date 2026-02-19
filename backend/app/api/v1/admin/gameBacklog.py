from fastapi import APIRouter,  Depends, HTTPException  
from sqlalchemy.orm import Session 
from app.db.models import GameBase, GameNote, Collection  # SQLAlchemy model matching DB schema
from app.db.session import get_db
from app.dependencies.admin_required import admin_required
from app.schemas.gameBacklog import GameCreate, GameUpdate, GameResponse,GameNoteSchema
from app.utils.drawing import create_collection_for_game
 
router = APIRouter(prefix="/games",tags=["Admin"])
@router.post("/", response_model=list[GameResponse])
def create_game(
    games: list[GameCreate], 
    db: Session = Depends(get_db),
    admin = Depends(admin_required)
):
    created_games = []
    for game in games: 
        existing_game = db.query(GameBase).filter(GameBase.title.ilike(game.title)).first()
        if existing_game:
            print(f"Game '{game.title}' already exists. Skipping creation.")
            continue

        data = game.model_dump()
        notes_data = data.pop("notes", [])
        db_game = GameBase(**data)

        # Optionally create a collection
        if getattr(game, "create_drawing_collection", False):
            collection = create_collection_for_game(db, game.title)
            db_game.collection_id = collection.id

        db.add(db_game)
        db.commit()
        db.refresh(db_game)

        # Add notes if provided
        for note in notes_data:
            db_note = GameNote(**note, game_id=db_game.id)
            db.add(db_note)
        if notes_data:
            db.commit()

        created_games.append(db_game)

    return created_games

@router.post('/{game_id}/create_collection')
def create_collection_for_game_route(
    game_id: int,
    db: Session = Depends(get_db),
    admin = Depends(admin_required)
):
    game = db.query(GameBase).filter(GameBase.id == game_id).first()
    if not game:
        raise HTTPException(status_code=404, detail="Game not found")
    
    if game.collection_id:
        raise HTTPException(status_code=400, detail="Collection already exists for this game")

    collection = create_collection_for_game(db, game.title)
    game.collection_id = collection.id
    db.commit()
    return {"message": "Collection created and linked to game", "collection_id": collection.id}

@router.post('/{game_id}/notes', response_model=list[GameNoteSchema])
def add_notes_to_game(
    game_id: int,
    notes: list[str],
    db: Session = Depends(get_db),
    admin = Depends(admin_required)
):
    db_game = db.query(GameBase).filter(GameBase.id == game_id).first()
    if not db_game:
        raise HTTPException(status_code=404, detail="Game not found")
    
    created_notes = []
    for note in notes:
        db_note = GameNote(content=note, game_id=game_id)
        db.add(db_note)
        created_notes.append(db_note)
    
    db.commit()
    return created_notes

@router.put("/{game_id}", response_model=GameResponse)
def update_game(
    game_id: int, 
    game: GameUpdate, 
    db: Session = Depends(get_db),
    admin = Depends(admin_required)
):
    db_game = db.query(GameBase).filter(GameBase.id == game_id).first()
    if not db_game:
        raise HTTPException(status_code=404, detail="Game not found")
    for key, value in game.model_dump(exclude_unset=True).items():
        setattr(db_game, key, value)
    db.commit()
    db.refresh(db_game)
    return db_game

@router.delete("/{game_id}")
def delete_game(
    game_id: int,  
    db: Session = Depends(get_db),
    admin = Depends(admin_required)
):
    db_game = db.query(GameBase).filter(GameBase.id == game_id).first()
    if not db_game:
        raise HTTPException(status_code=404, detail="Game not found")
    db.delete(db_game)
    db.commit()
    return {"message": "Game deleted"}
