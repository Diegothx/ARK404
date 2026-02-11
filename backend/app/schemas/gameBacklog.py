from datetime import date
from app.db.models.gameBacklog import GameBase

class GameCreate(GameBase):
    pass

class GameUpdate(GameBase):
    pass

class GameInDB(GameBase):
    id: int
    created_at: date
    updated_at: date

    class Config:
        orm_mode = True
