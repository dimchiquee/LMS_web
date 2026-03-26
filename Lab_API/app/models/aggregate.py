from app.models.country import Country
from app.models.city import City
from app.models.type_building import TypeBuilding
from app.models.building import Building
from sqlalchemy import func, desc
from app.extensions import db

def get_all_buildings():
    query = (
        db.session.query(
            Building.id,
            Building.title,
            TypeBuilding.name.label("type"),
            Country.name.label("country"),
            City.name.label("city"),
            Building.year,
            Building.height
          )
        .select_from(Building)
        .join(TypeBuilding)
        .join(City)
        .join(Country)
    )
    results = query.all()
    keys = query.statement.columns.keys()

    formatted_results = [
        {field_name: value for field_name, value in zip(keys, result)}
        for result in results
    ]
    return formatted_results


def get_country_stats():
    query = (
        db.session.query(
            Country.id.label("id"),
            Country.name.label("name"),
            func.round(func.avg(Building.height), 1).label("avg_height"),
            func.max(Building.height).label("max_height"),
            func.min(Building.height).label("min_height")
        )
        .select_from(Country)
        .join(City)
        .join(Building)
        .group_by(Country.id, Country.name)
    )

    results = query.all()
    keys = ["id", "name", "avg_height", "max_height", "min_height"]
    return [{field_name: value for field_name, value in zip(keys, result)} for result in results]


def get_year_stats():
    query = (
        db.session.query(
            Building.year.label("year"),
            func.round(func.avg(Building.height), 1).label("avg_height"),
            func.max(Building.height).label("max_height"),
            func.min(Building.height).label("min_height")
        )
        .group_by(Building.year)
        .order_by(Building.year)
    )

    results = query.all()
    keys = ["year", "avg_height", "max_height", "min_height"]
    return [{field_name: value for field_name, value in zip(keys, result)} for result in results]


def get_type_stats():
    query = (
        db.session.query(
            TypeBuilding.id.label("id"),
            TypeBuilding.name.label("name"),
            func.round(func.avg(Building.height), 1).label("avg_height"),
            func.max(Building.height).label("max_height"),
            func.min(Building.height).label("min_height")
        )
        .select_from(TypeBuilding)
        .join(Building)
        .group_by(TypeBuilding.id, TypeBuilding.name)
    )

    results = query.all()
    keys = ["id", "name", "avg_height", "max_height", "min_height"]
    return [{field_name: value for field_name, value in zip(keys, result)} for result in results]