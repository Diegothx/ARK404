from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Text
from app.db.base import Base

class QuoteEntry(Base):
    __tablename__ = "quotes"

    content: Mapped[str] = mapped_column(Text, nullable=False)
