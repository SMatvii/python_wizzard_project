from .. import Base

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey

from datetime import time, date


class Event(Base):
    __tablename__ = "events"

    header: Mapped[str]
    description: Mapped[str] = mapped_column(nullable=True)
    start_date: Mapped[date]
    start_time: Mapped[time] = mapped_column(nullable=True)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    user: Mapped["User"] = relationship(back_populates="events")
