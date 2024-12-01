from sqlalchemy import delete

from src.models.models import ModelsOrm
from src.schemas.models import Model
from src.repositories.base import BaseRepository

class ModelsRepository(BaseRepository):
    schema = Model
    model = ModelsOrm


    async def delete_models(self, ids: list[int]):
        stmt = delete(self.model).filter(ModelsOrm.id.in_(ids))
        await self.session.execute(stmt)
        