from datetime import datetime

from fastapi import APIRouter

from src.api.dependencies import DBDep, userIDDep
from src.database import async_session_maker
from src.models.sources import SourcesOrm
from src.schemas.sources import SourceAddReq, SourceAdd, SourcePUT, SourceDel, Source


router = APIRouter(prefix='/sources', tags=['Источники'])

@router.get('')
async def get_set(user_id: userIDDep, db: DBDep):
    user_models = await db.sources.get(user_id=user_id)
    return user_models

    
@router.post("/create")
async def save_source(source_data: SourceAddReq, user_id: userIDDep, db: DBDep):
    async with async_session_maker() as my_db:
        new_record = SourcesOrm(name=source_data.name, 
                                description=source_data.description,
                                user_id=user_id,
                                type=source_data.type,
                                creditional=source_data.creditional,
                                url=source_data.url, 
                                features=source_data.features,
                                created_at=datetime.now())
        instance = my_db.add(new_record)
        await my_db.commit()
    return new_record


@router.put("")
async def edit_model(source_data: SourcePUT, user_id: userIDDep, db: DBDep):
    edit_model = Source(user_id=user_id, **source_data.model_dump())
    await db.sources.edit(data=edit_model, id=source_data.id)
    await db.commit()
    return {"message" : "OK"}

@router.post("/delete", status_code=204)
async def delete_models(sources_del: SourceDel, db: DBDep):
    await db.sources.delete_by_ids(sources_del.ids)
    await db.commit()
    return {'data': {"message" : "OK"}}