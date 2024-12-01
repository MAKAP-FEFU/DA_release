from datetime import date

from pydantic import BaseModel

from src.schemas.sources import Source
from src.consts.connections import ConnectionType
from src.schemas.models import Model

class ConnectionAdd(BaseModel):
    name: str
    model_id: int
    source_id: int


class Connection(ConnectionAdd):
    id: int
    last_connections: date   | None = None
    status: ConnectionType = ConnectionType.INACTIVE



class ConnectionPUT(BaseModel):
    id: int
    name: str
    model_id: int
    source_id: int


class ConcectionsDelete(BaseModel):
    ids: list[int]


class ConnectionWithModel(Connection):
    model: Model


class ConnectionWithModelAndSource(Connection):
    model: Model
    source: Source


class ConnectData(BaseModel):
    connection_id: int
    source_id: int
    model_id: int