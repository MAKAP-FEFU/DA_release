from datetime import date

from sqlalchemy import String, ForeignKey
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.database import Base


class ModelsOrm(Base):
    __tablename__ = 'models'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    descriptions: Mapped[str | None] = mapped_column(String(100), default=None)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'))
    features: Mapped[dict] = mapped_column(JSON)
    created_at: Mapped[date] = mapped_column()

    connections: Mapped[list["ConnectionsOrm"]] = relationship(back_populates="models")

