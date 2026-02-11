from datetime import date
from typing import List, Optional
from pydantic import BaseModel
from enum import Enum

class GameStatus(str, Enum):
    wishlist = "wishlist"
    backlog = "backlog"
    installed = "installed"
    next_up = "next_up"
    playing = "playing"
    on_hold = "on_hold"
    finished_main = "finished_main"
    finished_100 = "finished_100"
    finished_dlc = "finished_dlc"
    dropped = "dropped"
    soft_dropped = "soft_dropped"

class GameBase(BaseModel):
    title: str
    status: GameStatus = GameStatus.backlog
    platform: Optional[List[str]] = []
    genre: Optional[List[str]] = []
    release_year: Optional[int] = None 
    hours_played: Optional[int] = 0
    rating: Optional[float] = None
    priority: Optional[str] = None
    notes: Optional[str] = None
    start_date: Optional[date] = None
    finish_date: Optional[date] = None
 