
from typing import Annotated, Optional

from fastapi import Depends, Request, HTTPException, Header

from src.services.auth import AuthService
from src.database import async_session_maker
from src.utils.db_manager import DBManager
from src.exceptions import Unauthorized

def get_token(Authorization: Optional[str] = Header(None)):
    if Authorization:
        return Authorization.split()[1]
    else:
        return None


def get_user_id(token: str = Depends(get_token)):
    print('\n\ntoken', token)
    if not token:
        return None
    data = AuthService().decode_token(token=token)
    return data.get('user_id')

userIDDep =  Annotated[int, Depends(get_user_id)]

async def get_db():
    async with DBManager(session_factory=async_session_maker) as db:
        yield db 

DBDep = Annotated[None, Depends(get_db)]