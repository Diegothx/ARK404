from datetime import date 
from typing import  Optional
from sqlalchemy import String,  Date, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base


class Drawing(Base):
    __tablename__ = "drawings"
    title: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    file_url: Mapped[str] = mapped_column(String, nullable=False)
    thumbnail_url: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    drawing_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
  
    is_favorite: Mapped[bool] = mapped_column(default=False)
    is_public: Mapped[bool] = mapped_column(default=False)

    collections_assoc: Mapped[list["DrawingCollection"]] = relationship(
        "DrawingCollection", back_populates="drawing", cascade="all, delete-orphan"
    )
    collections: Mapped[list["Collection"]] = relationship(
        "Collection", secondary="drawing_collections", back_populates="drawings"
    )

 
class Collection(Base):
    __tablename__ = "collections"
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    type: Mapped[Optional[str]] = mapped_column(String, nullable=True)  # sketchbook, franchise, challenge, year, project

    drawings_assoc: Mapped[list["DrawingCollection"]] = relationship(
        "DrawingCollection", back_populates="collection", cascade="all, delete-orphan"
    )
    drawings: Mapped[list["Drawing"]] = relationship(
        "Drawing", secondary="drawing_collections", back_populates="collections"
    )
 
class DrawingCollection(Base):
    __tablename__ = "drawing_collections"
    
    drawing_id: Mapped[int] = mapped_column(ForeignKey("drawings.id"), primary_key=True)
    collection_id: Mapped[int] = mapped_column(ForeignKey("collections.id"), primary_key=True)
    
    position: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)  # page order 

    # Relationships
    drawing: Mapped["Drawing"] = relationship("Drawing", back_populates="collections_assoc")
    collection: Mapped["Collection"] = relationship("Collection", back_populates="drawings_assoc")
