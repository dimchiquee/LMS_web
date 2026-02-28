from .models import TypeBuilding, Country, City, Building
from .extensions import db


def create():
    item = TypeBuilding('Небоскрёб')
    db.session.add(item)
    item = TypeBuilding('Антенная мачта')
    db.session.add(item)
    item = TypeBuilding('Бетонная башня')
    db.session.add(item)
    item = TypeBuilding('Радиомачта')
    db.session.add(item)
    item = TypeBuilding('Гиперболоидная башня')
    db.session.add(item)
    item = TypeBuilding('Дымовая труба')
    db.session.add(item)
    item = TypeBuilding('Решётчатая мачта')
    db.session.add(item)
    item = TypeBuilding('Башня')
    db.session.add(item)
    item = TypeBuilding('Мост')
    db.session.add(item)
    db.session.commit()

def read():
   query = TypeBuilding.query.all()
   print(query)

def read_c():
   query = Country.query.all()
   print(query)

def read_ci():
   query = City.query.all()
   print(query)

def read_b():
   query = Building.query.all()
   print(query)

def update():
    (TypeBuilding.query.filter(TypeBuilding.name == 'Мост')
             .update({TypeBuilding.name: "Мосты"})
    )
    db.session.commit()

    query = TypeBuilding.query.all()
    print(query)


def delete():
    TypeBuilding.query.filter(TypeBuilding.id == 9).delete()

    db.session.commit()

    query = TypeBuilding.query.all()
    print(query)