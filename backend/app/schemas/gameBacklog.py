from datetime import date, datetime
 
from app.db.models.gameBacklog import GameStatus, GamePriority
from pydantic import BaseModel,   Field

from typing import Optional, List

class GameNoteSchema(BaseModel):
    content: str = Field(..., max_length=1000)
    created_at: datetime
    updated_at: datetime 

class GameCreate(BaseModel):
    title: str = Field(..., max_length=200)
    status: GameStatus = GameStatus.backlog
    platform: Optional[List[str]] = None
    genre: Optional[List[str]] = None
    release_year: Optional[int] = None 
    rating: Optional[float] = None
    priority: Optional[GamePriority] = None 
    notes: Optional[List[GameNoteSchema]] = None
    start_date: Optional[date] = None
    finish_date: Optional[date] = None
    collection_id: Optional[int] = None  # collection_id for association

class GameUpdate(BaseModel):
    title: Optional[str] = None
    status: Optional[GameStatus] = None
    platform: Optional[List[str]] = None
    genre: Optional[List[str]] = None
    release_year: Optional[int] = None
    hours_played: Optional[int] = None
    rating: Optional[float] = None
    priority: Optional[GamePriority] = None
    notes: Optional[List[GameNoteSchema]] = None
    start_date: Optional[date] = None
    finish_date: Optional[date] = None
    collection_id: Optional[int] = None  # collection_id for association


class GameResponse(GameCreate):
    id: int
    created_at: datetime 
    updated_at: datetime
