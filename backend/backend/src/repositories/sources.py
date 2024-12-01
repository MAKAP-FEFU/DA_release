from src.models.sources import SourcesOrm
from src.schemas.sources import Source
from src.repositories.base import BaseRepository

class SourcesRepository(BaseRepository):
    model = SourcesOrm
    schema = Source