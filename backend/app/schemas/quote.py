from pydantic import BaseModel

class QuoteCreate(BaseModel):
    content: str


class QuoteResponse(BaseModel):
    id: int
    content: str

    class Config:
        from_attributes = True
