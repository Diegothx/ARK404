# app/schemas/drawing.py
from datetime import date
from typing import Optional, List
from pydantic import BaseModel


# ---- DrawingCollection schema ----
class DrawingCollection(BaseModel):
    drawing_id: int
    collection_id: int
    position: Optional[int] = None 


class CollectionBase(BaseModel):
    name: str
    description: Optional[str] = None
    type: Optional[str] = None  # sketchbook, franchise, challenge, year, project
# ---- Collection schema ----
class Collection(CollectionBase):
    id: int


# ---- Drawing schema ----
class Drawing(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    file_url: str
    thumbnail_url: Optional[str] = None
    drawing_date: Optional[date] = None
    is_favorite: bool = False
    is_public: bool = False
    collections: Optional[List[Collection]] = []

class CollectionDrawingAssignment(BaseModel):
    collection_ids: List[int] | None = None
    drawing_ids: List[int] | None = None