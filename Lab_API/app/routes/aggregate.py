from flask import Blueprint, jsonify
from sqlalchemy import func, desc
from app.schemas.aggregate import all_buildings_schema, stat_schema, year_stat_schema
from app.models.aggregate import get_all_buildings, get_country_stats, get_year_stats, get_type_stats

aggregate_bp = Blueprint('aggregate', __name__)

@aggregate_bp.route('/all/', methods=['GET'])
def all_buildings():
    results = get_all_buildings()
    return  jsonify({
        "success": True,
        "all_buildings": all_buildings_schema.dump(results)
    }), 200

@aggregate_bp.route('/country/', methods=['GET'])
def aggregate_by_country():
    results = get_country_stats()
    return jsonify({
        "success": True,
        "stat": stat_schema.dump(results)
    }), 200

@aggregate_bp.route('/year/', methods=['GET'])
def aggregate_by_year():
    results = get_year_stats()
    return jsonify({
        "success": True,
        "stat": year_stat_schema.dump(results)
    }), 200

@aggregate_bp.route('/type/', methods=['GET'])
def aggregate_by_type():
    results = get_type_stats()
    return jsonify({
        "success": True,
        "stat": stat_schema.dump(results)
    }), 200