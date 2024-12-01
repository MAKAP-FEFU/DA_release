from src.schemas.sources import Source
from src.schemas.models import Model
from src.schemas.connections import Connection, ConnectionWithModelAndSource


def get_current(models: list[any], id: int)-> Model:
    for model in models:
        if model.id == id:
            return model


def connection_with_models_and_source(connections: list[Connection], models: list[Model], sources: list[Source])-> list:
    result = []
    models_ids = [model.id for model in models]
    sources_ids = [source.id for source in sources]
    for connection in connections:
        if  connection.model_id in models_ids:
            result.append(ConnectionWithModelAndSource
                          (model=get_current(models=models,id=connection.model_id), 
                           **connection.model_dump(), 
                           source=get_current(models=sources, 
                                              id=connection.source_id)))



    return result