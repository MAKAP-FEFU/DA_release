from datetime import date 
from typing import Dict, Any
from pydantic import BaseModel


class ModelAddRequest(BaseModel):
    name: str
    descriptions: str | None = None
    features: Dict[Any, Any]

class ModelAdd(ModelAddRequest):
    user_id: int

class Model(ModelAdd):
    id: int
    created_at: date


class ModelPUT(BaseModel):
    id: int
    name: str
    descriptions: str | None = None
    features: Dict[Any, Any]


class ModelDelete(BaseModel):
    ids: list[int]