from datetime import date
from pydantic import BaseModel

from src.consts.sources import SourceType


class SourceAddReq(BaseModel):
    name: str
    description: str | None = None
    type: SourceType
    features: dict
    creditional: str | None = None
    url: str


class SourceAdd(SourceAddReq):
    user_id: int
    created_at: date
    
class Source(SourceAdd):
    id: int

class SourcePUT(BaseModel):
    id: int
    name: str
    description: str | None = None
    type: SourceType
    features: dict
    creditional: str | None = None
    url: str


class SourceDel(BaseModel):
    ids: list[int]