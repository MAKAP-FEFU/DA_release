from pydantic import BaseModel
from sqlalchemy import select, insert, delete, update

class BaseRepository:
    model = None
    schema: BaseModel = None

    def __init__(self, session):
            self.session = session

    async def get(self, *filter, **filter_by):
        query = select(self.model).filter(*filter).filter_by(**filter_by)
        result = await self.session.execute(query)
        instances = result.scalars().all()
        if instances is None:
            return None 
        else:
            return [self.schema.model_validate(instance, from_attributes=True) for instance in instances] 
    
    async def get_one_or_none(self, **filter_by):
        query = select(self.model).filter_by(**filter_by)
        result = await self.session.execute(query)
        instance = result.scalars().one_or_none()
        print(instance)
        if instance is None:
            return None 
        else:
            return self.schema.model_validate(instance, from_attributes=True) 
    
    
    async def add(self, data: BaseModel):
        stmt = insert(self.model).values(**data.model_dump()).returning(self.model)
        print(stmt.compile(compile_kwargs={"literal_binds": True}))
        result = await self.session.execute(stmt)
        instance = result.scalars().one()
        return self.schema.model_validate(instance, from_attributes=True)
    

    async def edit(self, data: BaseModel, **filter_by):
        update_stmt = (
            update(self.model)
            .filter_by(**filter_by)
            .values(**data.model_dump())
        )
        await self.session.execute(update_stmt)
    

    async def delete_bulk(self, *filter):
        stmt = delete(self.model).filter(*filter)

    async def delete_by_ids(self, ids: list[int]):
        stmt = delete(self.model).filter(self.model.id.in_(ids))
        await self.session.execute(stmt)
