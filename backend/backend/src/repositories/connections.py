from sqlalchemy import select
from src.repositories.base import BaseRepository
from src.models.connections import ConnectionsOrm
from src.schemas.connections import Connection, ConnectionWithModel


class ConnectionsRepository(BaseRepository):
    model = ConnectionsOrm
    schema = Connection
    


