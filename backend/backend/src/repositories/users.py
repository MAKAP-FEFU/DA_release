from src.schemas.users import User
from src.models.users import UsersOrm
from src.repositories.base import BaseRepository

class UsersRepository(BaseRepository):
    schema = User
    model = UsersOrm