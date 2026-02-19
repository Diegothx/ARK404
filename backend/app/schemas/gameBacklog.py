from datetime import date, datetime 
 
from app.db.models.gameBacklog import GameStatus, GamePriority
from pydantic import BaseModel,   Field

from typing import Optional, List
class GameBase(BaseModel):
    title: str = Field(..., max_length=200)
    link: Optional[str] = Field(None, max_length=500)
    status: GameStatus = GameStatus.backlog
    platform: Optional[List[str]] = None
    genre: Optional[List[str]] = None
    release_year: Optional[int] = None 
    rating: Optional[float] = None
    priority: Optional[GamePriority] = None  
    start_date: Optional[date] = None
    finish_date: Optional[date] = None
    developer: Optional[str] = None
    publisher: Optional[str] = None
    collection_id: Optional[int] = None  

class GameNoteSchema(BaseModel):
    content: str = Field(..., max_length=1000)
    created_at: datetime
    updated_at: datetime 

class GameCreate(GameBase): 
    notes: Optional[List[str]] = None 

class GameUpdate(BaseModel):
    title: Optional[str] = None
    link: Optional[str] = None
    status: Optional[GameStatus] = None
    platform: Optional[List[str]] = None
    genre: Optional[List[str]] = None
    release_year: Optional[int] = None
    hours_played: Optional[int] = None
    rating: Optional[float] = None
    priority: Optional[GamePriority] = None
    start_date: Optional[date] = None
    finish_date: Optional[date] = None
    developer: Optional[str] = None
    publisher: Optional[str] = None
    collection_id: Optional[int] = None  # collection_id for association


class GameResponse(GameBase):
    id: int
    notes: Optional[List[GameNoteSchema]] = None
    created_at: datetime 
    updated_at: datetime
