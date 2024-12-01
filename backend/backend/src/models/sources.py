from datetime import date

from sqlalchemy import String, DATE, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import JSON


from src.database import Base
from src.consts.sources import SourceType

class SourcesOrm(Base):
    __tablename__='sources'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String)
    description: Mapped[str | None] = mapped_column(String, default=None)
    type: Mapped[SourceType] = mapped_column(String)
    features: Mapped[dict] = mapped_column(JSON)
    creditional: Mapped[str | None] = mapped_column(String)
    url: Mapped[str] = mapped_column(String)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'))
    created_at: Mapped[date] = mapped_column()