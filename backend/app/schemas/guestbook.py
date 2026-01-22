from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class GuestbookCreate(BaseModel):
    name: str = Field(..., max_length=50)
    email: Optional[EmailStr] = Field(None, max_length=100)
    message: str = Field(..., max_length=300)



class GuestbookOut(GuestbookCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True  # SQLAlchemy compatibility

