from datetime import date
from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.consts.connections import ConnectionType

from src.database import Base

class ConnectionsOrm(Base):
    __tablename__='connections'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String)
    model_id: Mapped[int] = mapped_column(ForeignKey('models.id'))
    source_id: Mapped[int] = mapped_column(ForeignKey('sources.id'))
    last_connection: Mapped[date | None] = mapped_column(default=None)
    status: Mapped[str] = mapped_column(String, default=ConnectionType.INACTIVE)

    models: Mapped["ModelsOrm"] = relationship(back_populates='connections')
    