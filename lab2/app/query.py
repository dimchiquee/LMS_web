from .extensions import db
from .models import WeaponType, RarityType, Skin, CaseType, SkinPrice


def query():
    #WeaponType.query.filter(WeaponType.id == 1).delete()

    print("\nWEAPONS_TYPES")
    weapons = db.session.query(WeaponType).all()
    for w in weapons:
        print(w.id, w.weapon)

    print("\nRARITY_TYPES")
    rarities = db.session.query(RarityType).all()
    for r in rarities:
        print(r.id, r.rarity)

    print("\nSKINS")
    skins = db.session.query(Skin).all()
    for s in skins:
        print(s.id, s.skin, s.weapon_id, s.rarity_id)

    print("\nCASE_TYPES")
    cases = db.session.query(CaseType).all()
    for c in cases:
        print(c.id, c.case)

    print("\nSKINS_PRICES")
    prices = db.session.query(SkinPrice).all()
    for p in prices:
        print(p.id, p.case_id, p.skin_id, p.price)