from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase, Mapped, mapped_column


#
engine = create_engine("sqlite:///my_db.sql", echo=True,)
Session = sessionmaker(engine)



class Base(DeclarativeBase):
    id: Mapped[int] = mapped_column(primary_key=True)


def up():
    Base.metadata.create_all(engine)

def down():
    Base.metadata.drop_all(engine)


from .models import Event, User


down()
up()