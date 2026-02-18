from datetime import date
from app.db.models.gameBacklog import  GameStatus
from pydantic import BaseModel,   Field

from typing import Optional, List

class GameCreate(BaseModel):
    title: str = Field(..., max_length=200)
    status: GameStatus = GameStatus.backlog
    platform: Optional[List[str]] = None
    genre: Optional[List[str]] = None
    release_year: Optional[int] = None
    hours_played: Optional[int] = 0
    rating: Optional[float] = None
    priority: Optional[str] = None
    notes: Optional[str] = None
    start_date: Optional[date] = None
    finish_date: Optional[date] = None

class GameUpdate(BaseModel):
    title: Optional[str] = None
    status: Optional[GameStatus] = None
    platform: Optional[List[str]] = None
    genre: Optional[List[str]] = None
    release_year: Optional[int] = None
    hours_played: Optional[int] = None
    rating: Optional[float] = None
    priority: Optional[str] = None
    notes: Optional[str] = None
    start_date: Optional[date] = None
    finish_date: Optional[date] = None


class GameResponse(GameCreate):
    id: int
    created_at: date
    updated_at: date
