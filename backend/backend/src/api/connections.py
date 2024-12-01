from fastapi import APIRouter
from src.api.dependencies import userIDDep, DBDep
from src.schemas.connections import ConnectionAdd, ConcectionsDelete, ConnectionPUT, ConnectData
from src.models.connections import ConnectionsOrm
from src.services.matching import MatchingService
from src.api.utils import connection_with_models_and_source



router = APIRouter(prefix='/connections', tags=['Соединения'])


@router.get('')
async def get_connections(user_id: userIDDep, db: DBDep):
    models = await db.models.get(user_id=user_id)
    sources = await db.sources.get(user_id=user_id)
    print(user_id)
    user_connections = await db.connections.get(ConnectionsOrm.model_id.in_([model.id for model in models]))
    return connection_with_models_and_source(user_connections, models, sources=sources)


    
@router.post("/create")
async def save_connection(connection_data: ConnectionAdd, user_id: userIDDep, db: DBDep):
    instance = await db.connections.add(connection_data)
    await db.commit()
    return instance


@router.put("")
async def edit_model(connection_data: ConnectionPUT, user_id: userIDDep, db: DBDep):
    # edit_model = Model(user_id=user_id, **model_data.model_dump())
    await db.connections.edit(data=connection_data, id=connection_data.id)
    await db.commit()
    return {"message" : "OK"}

@router.post("/delete", status_code=204)
async def delete_models(connections_del: ConcectionsDelete, db: DBDep):
    await db.connections.delete_models(connections_del.ids)
    await db.commit()
    return {'data': {"message" : "OK"}}


@router.post("/connect")
async def connect(connection_data: ConnectData, db: DBDep):
    source = await db.sources.get_one_or_none(id=connection_data.source_id)
    model = await db.models.get_one_or_none(id=connection_data.model_id)
    return {"data" : "Здесь будет результат приведения типов"}