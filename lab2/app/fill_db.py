import csv

from .extensions import db
from .models import WeaponType, RarityType, Skin, CaseType, SkinPrice


def fill_db(csv_path):

    weapons_cache = {}
    rarity_cache = {}
    case_cache = {}
    skins_cache = {}

    with open(csv_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)

        for row in reader:

            weapon_name = row["Weapon"].strip()
            rarity_name = row["Rarity"].strip()
            skin_name = row["Skin"].strip()
            case_name = row["Case"].strip()
            price = float(row["Price"])

            if weapon_name not in weapons_cache:
                weapon = db.session.query(WeaponType)\
                    .filter_by(weapon=weapon_name)\
                    .first()

                if not weapon:
                    weapon = WeaponType(weapon=weapon_name)
                    db.session.add(weapon)
                    db.session.flush()

                weapons_cache[weapon_name] = weapon

            weapon = weapons_cache[weapon_name]

            if rarity_name not in rarity_cache:
                rarity = db.session.query(RarityType)\
                    .filter_by(rarity=rarity_name)\
                    .first()

                if not rarity:
                    rarity = RarityType(rarity=rarity_name)
                    db.session.add(rarity)
                    db.session.flush()

                rarity_cache[rarity_name] = rarity

            rarity = rarity_cache[rarity_name]

            if case_name not in case_cache:
                case = db.session.query(CaseType)\
                    .filter_by(case=case_name)\
                    .first()

                if not case:
                    case = CaseType(case=case_name)
                    db.session.add(case)
                    db.session.flush()

                case_cache[case_name] = case

            case = case_cache[case_name]

            skin_key = (skin_name, weapon.id, rarity.id)

            if skin_key not in skins_cache:
                skin = db.session.query(Skin)\
                    .filter_by(
                        skin=skin_name,
                        weapon_id=weapon.id,
                        rarity_id=rarity.id
                    ).first()

                if not skin:
                    skin = Skin(
                        skin=skin_name,
                        weapon_id=weapon.id,
                        rarity_id=rarity.id
                    )
                    db.session.add(skin)
                    db.session.flush()

                skins_cache[skin_key] = skin

            skin = skins_cache[skin_key]

            price_row = SkinPrice(
                case_id=case.id,
                skin_id=skin.id,
                price=price
            )

            db.session.add(price_row)

    db.session.commit()