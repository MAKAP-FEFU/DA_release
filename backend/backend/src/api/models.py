import json

from datetime import date, datetime
from fastapi import APIRouter

from src.schemas.models import ModelAddRequest, ModelAdd, Model, ModelPUT, ModelDelete
from src.config import settings
from src.api.dependencies import DBDep, userIDDep
from src.database import async_session_maker
from src.models.models import ModelsOrm
from sqlalchemy import insert
from sqlalchemy.orm import sessionmaker

router = APIRouter(prefix='/models', tags=['Модели'])


@router.get('')
async def get_set(user_id: userIDDep, db: DBDep):
    user_models = await db.models.get(user_id=user_id)
    return  user_models

    
@router.post("/create")
async def save_model(model_data: ModelAddRequest, user_id: userIDDep, db: DBDep):
    async with async_session_maker() as my_db:
        new_record = ModelsOrm(name=model_data.name, descriptions=model_data.descriptions, user_id=user_id, features=model_data.features,created_at=datetime.now())
        instance = my_db.add(new_record)
        await my_db.commit()
    return instance


@router.put("")
async def edit_model(model_data: ModelPUT, user_id: userIDDep, db: DBDep):
    edit_model = Model(user_id=user_id, **model_data.model_dump())
    await db.models.edit(data=edit_model, id=model_data.id)
    await db.commit()
    return {"message" : "OK"}

@router.post("/delete", status_code=204)
async def delete_models(model_del: ModelDelete, db: DBDep):
    await db.models.delete_models(model_del.ids)
    await db.commit()
    return {'data': {"message" : "OK"}}
    # model_data_add = ModelAdd(user_id=user_id, **model_data.model_dump())
    # model_data_add.features = {"name" : "xz", "surname": "xzxz"}
    # instance = await db.models.add(model_data_add)
    # return instance




