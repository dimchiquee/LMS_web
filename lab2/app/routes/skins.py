from flask import Blueprint, request, jsonify
from ..models import Skin, db
from ..schemas import skin_schema, skin_list_schema

skin_bp = Blueprint('skin', __name__)


@skin_bp.route('/skins', methods=['GET'])
def get_all_skins():
    skins = Skin.query.all()
    return jsonify({
        "success": True,
        "skins": skin_list_schema.dump(skins)
    }), 200


@skin_bp.route('/skins/<int:id>', methods=['GET'])
def get_skin(id):
    skin = Skin.query.get(id)
    if not skin:
        return jsonify({"success": False, "error": "Skin not found"}), 404
    return jsonify({
        "success": True,
        "skin": skin_schema.dump(skin)
    }), 200


@skin_bp.route('/skins', methods=['POST'])
def create_skin():
    try:
        data = request.get_json()
        new_skin = skin_schema.load(data)
        db.session.add(new_skin)
        db.session.commit()
        return jsonify({
            "success": True,
            "skin": skin_schema.dump(new_skin)
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "error": str(e)}), 400


@skin_bp.route('/skins/<int:id>', methods=['PUT'])
def update_skin(id):
    skin = Skin.query.get(id)
    if not skin:
        return jsonify({"success": False, "error": "Skin not found"}), 404
    try:
        data = request.get_json()
        skin_schema.load(data, instance=skin, partial=True)
        db.session.commit()
        return jsonify({
            "success": True,
            "skin": skin_schema.dump(skin)
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "error": str(e)}), 400


@skin_bp.route('/skins/<int:id>', methods=['DELETE'])
def delete_skin(id):
    skin = Skin.query.get(id)
    if not skin:
        return jsonify({"success": False, "error": "Skin not found"}), 404
    db.session.delete(skin)
    db.session.commit()
    return jsonify({"success": True, "message": "Skin deleted"}), 200