from .models import Country, City, Building, TypeBuilding
from .extensions import db
from sqlalchemy import func

def query_1():
    result = (
        db.session.query(
            Building.title.label("Здание"),
            TypeBuilding.name.label("Тип"),
            Country.name.label("Страна"),
            City.name.label("Город"),
            Building.year.label("Год"),
            Building.height.label("Высота")
        )
        .join(Building.type_building)
        .join(Building.city)
        .join(City.country)
        .order_by(Building.height.desc())
        .all()
    )

    print(f'\n1 {result}')

def query_2():
    result = (
        db.session.query(
            Country.name.label("Страна"),
            func.max(Building.height).label("Макс"),
            func.min(Building.height).label("Мин"),
            func.avg(Building.height).label("Средняя")
        )
        .join(Country.cities)
        .join(City.buildings)
        .group_by(Country.id, Country.name)
        .order_by(Country.name.asc())
        .all()
    )

    print(f'\n2 {result}')

def query_3():
    result = (
        db.session.query(
            Building.year.label("Год"),
            func.max(Building.height).label("Макс"),
            func.min(Building.height).label("Мин"),
            func.avg(Building.height).label("Средняя")
        )
        .group_by(Building.year)
        .order_by(Building.year.asc())
        .all()
    )

    print(f'\n3 {result}')

def query_4():
    result = (
        db.session.query(
            TypeBuilding.name.label("Тип"),
            func.max(Building.height).label("Макс"),
            func.min(Building.height).label("Мин"),
            func.avg(Building.height).label("Средняя")
        )
        .join(TypeBuilding.buildings)
        .filter(TypeBuilding.name.like("%мачта%"))
        .group_by(TypeBuilding.id, TypeBuilding.name)
        .order_by(func.avg(Building.height).desc())
        .all()
    )

    print(f'\n4 {result}')

def query_5():
    result = (
        db.session.query(
            Country.name.label("Страна"),
            func.max(Building.height).label("Макс"),
            func.min(Building.height).label("Мин"),
            func.avg(Building.height).label("Средняя"),
            func.count(Building.id).label("Количество")
        )
        .join(Country.cities)
        .join(City.buildings)
        .group_by(Country.id, Country.name)
        .having(func.count(Building.id) > 1)
        .order_by(Country.name.asc())
        .all()
    )

    print(f'\n5 {result}')

def query():
    query_1()
    query_2()
    query_3()
    query_4()
    query_5()