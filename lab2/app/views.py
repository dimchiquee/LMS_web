from flask import Blueprint, render_template
from .extensions import db
from .models import WeaponType, RarityType, Skin, CaseType, SkinPrice
from .queries import query1, query2, query3, query4, query5

main = Blueprint('main', __name__)


@main.route('/')
def index():

    weapons = db.session.query(WeaponType).limit(5).all()
    rarities = db.session.query(RarityType).limit(5).all()
    skins = db.session.query(Skin).limit(5).all()
    cases = db.session.query(CaseType).limit(5).all()
    prices = db.session.query(SkinPrice).limit(5).all()
    weapon_columns = WeaponType.__table__.columns.keys()
    weapon_rarities = RarityType.__table__.columns.keys()
    weapon_skins = Skin.__table__.columns.keys()
    weapon_cases = CaseType.__table__.columns.keys()
    weapon_prices = SkinPrice.__table__.columns.keys()
    q1 = query1()
    q2 = query2()
    q3 = query3()
    q4 = query4()
    q5 = query5()

    return render_template(
        'index.html',
        weapons=weapons,
        weapon_columns=weapon_columns,
        weapon_rarities=weapon_rarities,
        weapon_skins=weapon_skins,
        weapon_cases=weapon_cases,
        weapon_prices=weapon_prices,
        rarities=rarities,
        skins=skins,
        cases=cases,
        prices=prices,
        q1=q1,
        q2=q2,
        q3=q3,
        q4=q4,
        q5=q5
    )