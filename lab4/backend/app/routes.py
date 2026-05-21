from flask import Blueprint, jsonify, request
from sqlalchemy import asc, desc, func, or_
from .models import db, Skin, QuizQuestion

api = Blueprint("api", __name__)

SORT_FIELDS = {
    "id": Skin.id,
    "name": Skin.name,
    "weapon": Skin.weapon,
    "rarity": Skin.rarity,
    "collection": Skin.collection,
    "price": Skin.price,
    "wear": Skin.wear,
    "source": Skin.source,
    "releaseYear": Skin.release_year,
}

GROUP_FIELDS = {
    "rarity": Skin.rarity,
    "weaponType": Skin.weapon_type,
    "wear": Skin.wear,
    "source": Skin.source,
    "releaseYear": Skin.release_year,
}


def _skin_from_payload(payload, skin=None):
    skin = skin or Skin()
    skin.name = payload.get("name", skin.name)
    skin.weapon = payload.get("weapon", skin.weapon)
    skin.weapon_type = payload.get("weaponType", payload.get("weapon_type", skin.weapon_type))
    skin.rarity = payload.get("rarity", skin.rarity)
    skin.collection = payload.get("collection", skin.collection)
    skin.price = float(payload.get("price", skin.price or 0))
    skin.wear = payload.get("wear", skin.wear)
    skin.source = payload.get("source", skin.source)
    skin.release_year = int(payload.get("releaseYear", payload.get("release_year", skin.release_year or 0)))
    skin.image = payload.get("image", skin.image)
    skin.description = payload.get("description", skin.description)
    return skin


@api.get("/health")
def health():
    return jsonify({"status": "ok"})


@api.get("/skins")
def get_skins():
    page = request.args.get("page", default=1, type=int)
    per_page = request.args.get("per_page", default=10, type=int)
    search = request.args.get("search", default="", type=str)
    rarity = request.args.get("rarity", default="", type=str)
    weapon_type = request.args.get("weaponType", default="", type=str)
    sort_by = request.args.get("sort_by", default="id", type=str)
    sort_order = request.args.get("sort_order", default="asc", type=str)

    query = Skin.query

    if search:
        like_value = f"%{search}%"
        query = query.filter(
            or_(
                Skin.name.ilike(like_value),
                Skin.weapon.ilike(like_value),
                Skin.collection.ilike(like_value),
            )
        )

    if rarity:
        query = query.filter(Skin.rarity == rarity)

    if weapon_type:
        query = query.filter(Skin.weapon_type == weapon_type)

    sort_column = SORT_FIELDS.get(sort_by, Skin.id)
    query = query.order_by(desc(sort_column) if sort_order == "desc" else asc(sort_column))

    pagination = query.paginate(page=page, per_page=per_page, error_out=False)
    return jsonify({
        "items": [skin.to_dict() for skin in pagination.items],
        "total": pagination.total,
        "page": pagination.page,
        "perPage": pagination.per_page,
        "totalPages": pagination.pages,
    })


@api.get("/skins/<int:skin_id>")
def get_skin(skin_id):
    skin = Skin.query.get_or_404(skin_id)
    return jsonify(skin.to_dict())


@api.post("/skins")
def create_skin():
    payload = request.get_json() or {}
    skin = _skin_from_payload(payload)
    db.session.add(skin)
    db.session.commit()
    return jsonify(skin.to_dict()), 201


@api.put("/skins/<int:skin_id>")
def update_skin(skin_id):
    skin = Skin.query.get_or_404(skin_id)
    payload = request.get_json() or {}
    _skin_from_payload(payload, skin)
    db.session.commit()
    return jsonify(skin.to_dict())


@api.delete("/skins/<int:skin_id>")
def delete_skin(skin_id):
    skin = Skin.query.get_or_404(skin_id)
    db.session.delete(skin)
    db.session.commit()
    return jsonify({"message": "deleted"})


@api.get("/skins/groups")
def get_grouped_skins():
    group_by = request.args.get("group_by", default="rarity", type=str)
    group_column = GROUP_FIELDS.get(group_by, Skin.rarity)

    rows = (
        db.session.query(
            group_column.label("group"),
            func.count(Skin.id).label("count"),
            func.min(Skin.price).label("minPrice"),
            func.avg(Skin.price).label("avgPrice"),
            func.max(Skin.price).label("maxPrice"),
        )
        .group_by(group_column)
        .order_by(group_column)
        .all()
    )

    return jsonify([
        {
            "id": index + 1,
            "group": str(row.group),
            "count": row.count,
            "minPrice": round(float(row.minPrice), 2),
            "avgPrice": round(float(row.avgPrice), 2),
            "maxPrice": round(float(row.maxPrice), 2),
        }
        for index, row in enumerate(rows)
    ])


@api.get("/quiz")
def get_quiz():
    questions = QuizQuestion.query.order_by(QuizQuestion.id).all()
    return jsonify([question.to_dict() for question in questions])
