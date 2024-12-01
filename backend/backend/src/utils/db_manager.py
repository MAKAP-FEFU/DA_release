from src.repositories.connections import ConnectionsRepository
from src.repositories.sources import SourcesRepository
from src.repositories.models import ModelsRepository
from src.repositories.users import UsersRepository


class DBManager:

    def __init__(self, session_factory):
        self.session_factory = session_factory

    async def __aenter__(self):
        self.session = self.session_factory()

        self.users = UsersRepository(self.session)
        self.models = ModelsRepository(self.session)
        self.sources = SourcesRepository(self.session)
        self.connections = ConnectionsRepository(self.session)


        return self

    async def __aexit__(self, *args):
        await self.session.rollback()
        await self.session.close()

    async def commit(self):
        await self.session.commit()
