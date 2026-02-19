from datetime import date
from typing import List, Optional
from enum import Enum
from sqlalchemy import String, Integer, Float, Date, Enum as SQLEnum, ForeignKey
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base
from app.db.models.drawings import Collection  # Import Collection for relationship

class GamePriority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


class GameStatus(str, Enum):
    wishlist = "wishlist"        # want to buy/play
    backlog = "backlog"          # owned but no immediate plan
    playing = "playing"          # actively playing
    casual = "casual"            # occasional / social play
    on_hold = "on_hold"          # paused mid-progress
    finished_main = "finished_main"        # completed main experience
    finished_100 = "finished_100"
    dropped = "dropped"


class GameBase(Base):
    __tablename__ = "game_backlog"

    title: Mapped[str] = mapped_column(String, nullable=False)

    developer: Mapped[Optional[str]] = mapped_column(String, nullable=True)

    publisher: Mapped[Optional[str]] = mapped_column(String, nullable=True)

    status: Mapped[GameStatus] = mapped_column(
        SQLEnum(GameStatus),
        default=GameStatus.backlog,
        nullable=False,
    )

    platform: Mapped[Optional[List[str]]] = mapped_column(
        ARRAY(String),
        default=list,
        nullable=True,
    )

    genre: Mapped[Optional[List[str]]] = mapped_column(
        ARRAY(String),
        default=list,
        nullable=True,
    )

    release_year: Mapped[Optional[int]] = mapped_column(Integer)

    rating: Mapped[Optional[float]] = mapped_column(Float)

    priority: Mapped[Optional[GamePriority]] = mapped_column(
        SQLEnum(GamePriority, name="gamepriority", create_type=True),
        nullable=True
    )

    start_date: Mapped[Optional[date]] = mapped_column(Date)

    finish_date: Mapped[Optional[date]] = mapped_column(Date)
    # Relationship to diary-style notes
    notes: Mapped[List["GameNote"]] = relationship("GameNote", back_populates="game", cascade="all, delete-orphan")
 

    # Optional link to a Collection
    collection_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("collections.id"), nullable=True
    )
    collection: Mapped[Optional["Collection"]] = relationship("Collection")

class GameNote(Base):
    __tablename__ = "game_notes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    game_id: Mapped[int] = mapped_column(ForeignKey("game_backlog.id"), nullable=False)
    content: Mapped[str] = mapped_column(String, nullable=False)
    #media_url: Mapped[Optional[str]] = mapped_column(String, nullable=True)

    game: Mapped["GameBase"] = relationship("GameBase", back_populates="notes")
