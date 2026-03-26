from .extensions import db
from .models import WeaponType, RarityType, Skin, CaseType, SkinPrice
from sqlalchemy import func



#1. Предметы с редкостью 'Covert Rifle' отсортированные по цене
def query1():
    result = (db.session.query(Skin.skin, WeaponType.weapon, SkinPrice.price)
        .join(WeaponType)
        .join(SkinPrice)
        .join(RarityType)
        .filter(RarityType.rarity == "Covert Rifle")
        .order_by(SkinPrice.price.desc())
        .limit(5)
        .all())

    return result


#2. Разница между ценой предмета и средней ценой предметов в этой коллекции
def query2():

    avg_case_price = (
        db.session.query(
            SkinPrice.case_id,
            func.avg(SkinPrice.price).label("avg_price")
        )
        .group_by(SkinPrice.case_id)
        .subquery()
    )

    result = (
        db.session.query(
            Skin.skin,
            CaseType.case,
            SkinPrice.price,
            func.round(
                SkinPrice.price - avg_case_price.c.avg_price, 2
            ).label("price_difference")
        )
        .join(SkinPrice, Skin.id == SkinPrice.skin_id)
        .join(CaseType, CaseType.id == SkinPrice.case_id)
        .join(avg_case_price, avg_case_price.c.case_id == SkinPrice.case_id)
        .limit(5)
        .all()
    )

    return result


#3. Средняя цена предмета в коллекции
def query3():
    result = (db.session.query(
            CaseType.case,
            func.round(func.avg(SkinPrice.price), 2).label("avg_price")
        )
        .join(SkinPrice)
        .group_by(CaseType.case)
        .limit(5)
        .all())

    return result


#4. Коллекции где средняя цена больше 10
def query4():
    result = (db.session.query(
            CaseType.case,
            func.round(func.avg(SkinPrice.price), 2).label("avg_price")
        )
        .join(SkinPrice)
        .filter(SkinPrice.price > 1)
        .group_by(CaseType.case)
        .having(func.avg(SkinPrice.price) > 10)
        .limit(5)
        .all())

    return result


#5. Предметы дороже средней цены на них
def query5():
    avg_price_subquery = (
        db.session.query(
            func.round(func.avg(SkinPrice.price), 2).label("avg_price")
        )
        .subquery()
    )

    result = (
        db.session.query(
            Skin.skin,
            SkinPrice.price
        )
        .join(SkinPrice)
        .join(avg_price_subquery, SkinPrice.price > avg_price_subquery.c.avg_price)
        .limit(5)
        .all()
    )

    return result
