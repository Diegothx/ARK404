
from pydantic import BaseModel
from sqlalchemy import Column, Integer,   DateTime, Text
from sqlalchemy.sql import func

class QuoteEntry(BaseModel):
    __tablename__ = "quotes"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())