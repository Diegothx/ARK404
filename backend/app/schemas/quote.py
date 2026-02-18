from pydantic import BaseModel
from datetime import datetime

class QuoteCreate(BaseModel):
    content: str


class QuoteResponse(QuoteCreate):
    id: int 
    created_at: datetime
    updated_at: datetime 
