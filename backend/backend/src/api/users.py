from typing import Annotated
from fastapi import APIRouter, Request, Header, HTTPException, Depends
from fastapi.responses import JSONResponse

from src.api.dependencies import DBDep, userIDDep
from src.schemas.users import UserAdd, UserAddReq
from src.services.auth import AuthService
from src.exceptions import UserExists, UserNotExists, InvalidCreditionals

router = APIRouter(prefix='/users', tags=['Пользователь'])



@router.post('/register')
async def register_user(data: UserAddReq, db: DBDep) -> dict:
    _exist_user = await db.users.get_one_or_none(username=data.username)
    if _exist_user:
        raise UserExists
    hashed_password = AuthService().hash_password(data.password)
    _user_add = UserAdd(username=data.username, hashed_password=hashed_password)
    instance = await db.users.add(_user_add)
    await db.commit()
    user_token = AuthService().create_access_token({"user_id" : instance.id}) 
    return {"token": user_token}


@router.post('/auth')
async def auth_user(db: DBDep, data: UserAddReq):
    _exist_user = await db.users.get_one_or_none(username=data.username)
    if not _exist_user:
        raise UserNotExists
    if AuthService().verify_password(data.password, _exist_user.hashed_password):
        return {"token" : AuthService().create_access_token({"user_id" : _exist_user.id}) }
    else: 
        raise InvalidCreditionals


@router.get('/me')
async def get_me(user_id: userIDDep, db: DBDep):
    print(user_id)
    if not user_id:
        return None
    currnet_user = await db.users.get_one_or_none(id=user_id)
    return {'id' : currnet_user.id, "username": currnet_user.username}


