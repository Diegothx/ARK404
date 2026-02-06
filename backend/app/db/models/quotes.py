from sqlalchemy import Column, Integer, Text, DateTime
from sqlalchemy.sql import func  
from app.db.base import Base

class QuoteEntry(Base):
    __tablename__ = "quotes"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())