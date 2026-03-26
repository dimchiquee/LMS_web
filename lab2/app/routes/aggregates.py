from flask import Blueprint, jsonify
from sqlalchemy import func
from ..models import SkinPrice, Skin, WeaponType, RarityType, CaseType, db

aggregate_bp = Blueprint('aggregate', __name__)


@aggregate_bp.route('/aggregate/rarity', methods=['GET'])
def aggregate_by_rarity():
    results = db.session.query(
        RarityType.rarity,
        func.avg(SkinPrice.price).label('avg_price'),
        func.max(SkinPrice.price).label('max_price'),
        func.min(SkinPrice.price).label('min_price')
    ).join(Skin, Skin.rarity_id == RarityType.id) \
     .join(SkinPrice, SkinPrice.skin_id == Skin.id) \
     .group_by(RarityType.rarity).all()

    data = [{"rarity": r, "avg_price": float(a), "max_price": float(m), "min_price": float(n)}
            for r, a, m, n in results]
    return jsonify({"success": True, "by_rarity": data}), 200


@aggregate_bp.route('/aggregate/weapon', methods=['GET'])
def aggregate_by_weapon():
    results = db.session.query(
        WeaponType.weapon,
        func.avg(SkinPrice.price).label('avg_price'),
        func.max(SkinPrice.price).label('max_price'),
        func.min(SkinPrice.price).label('min_price')
    ).join(Skin, Skin.weapon_id == WeaponType.id) \
     .join(SkinPrice, SkinPrice.skin_id == Skin.id) \
     .group_by(WeaponType.weapon).all()

    data = [{"weapon": w, "avg_price": float(a), "max_price": float(m), "min_price": float(n)}
            for w, a, m, n in results]
    return jsonify({"success": True, "by_weapon": data}), 200


@aggregate_bp.route('/aggregate/case', methods=['GET'])
def aggregate_by_case():
    results = db.session.query(
        CaseType.case,
        func.avg(SkinPrice.price).label('avg_price'),
        func.max(SkinPrice.price).label('max_price'),
        func.min(SkinPrice.price).label('min_price')
    ).join(SkinPrice, SkinPrice.case_id == CaseType.id) \
     .group_by(CaseType.case).all()

    data = [{"case": c, "avg_price": float(a), "max_price": float(m), "min_price": float(n)}
            for c, a, m, n in results]
    return jsonify({"success": True, "by_case": data}), 200