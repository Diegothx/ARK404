from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base

class GuestbookEntry(Base):
    __tablename__ = "guestbook_entries"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=True) # Optional field
    message: Mapped[str] = mapped_column(Text, nullable=False)