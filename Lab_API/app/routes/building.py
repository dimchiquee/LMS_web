from flask import Blueprint, jsonify, request
from app.models.building import Building
from app.extensions import db, auth
from app.schemas.building import buildings_cschema, building_cschema
from marshmallow import ValidationError

building_bp = Blueprint('building', __name__)

@building_bp.route('/', methods=['GET'])
def get_buildings():

    buildings = Building.query.all()
    return jsonify({
        "success": True,
        "buildings": buildings_cschema.dump(buildings)
    }), 200

@building_bp.route('/<int:id>', methods=['GET'])
def get_one_building(id):

    building = Building.query.get(id)
    if not building:
        return jsonify({
            "success": False,
            "error": "Building not found"
        }), 404

    return jsonify({
        "success": True,
        "building": building_cschema.dump(building)
    }), 200


@building_bp.route('/', methods=['POST'])
@auth.login_required
def create_building():
    try:
        data = request.get_json()

        building = building_cschema.load(data, session=db.session)

        db.session.add(building)
        db.session.commit()

        return jsonify({
            "success": True,
            "building": building_cschema.dump(building)
        }), 201

    except ValidationError as err:
        db.session.rollback()
        return jsonify({
            "success": False,
            "errors": err.messages
        }), 400

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@building_bp.route('/<int:id>', methods=['PUT'])
@auth.login_required
def update_building(id):
    try:
        building = Building.query.get(id)
        if not building:
            return jsonify({
                "success": False,
                "error": "Building not found"
            }), 404

        data = request.get_json()
        building = building_cschema.load(data, instance=building, partial=True, session=db.session)
        db.session.commit()

        return jsonify({
            "success": True,
            "building": building_cschema.dump(building)
        }), 200

    except ValidationError as err:
        db.session.rollback()
        return jsonify({
            "success": False,
            "errors": err.messages
        }), 400

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@building_bp.route('/<int:id>', methods=['DELETE'])
@auth.login_required
def delete_building(id):
    try:
        building = Building.query.get(id)
        if not building:
            return jsonify({
                "success": False,
                "error": "Building not found"
            }), 404

        db.session.delete(building)
        db.session.commit()

        return jsonify({
            "success": True,
            "message": f"Building with id {id} has been deleted"
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500