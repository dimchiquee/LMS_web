from marshmallow import fields
from app.extensions import ma

class AllBuildingsSchema(ma.Schema):
    id = fields.Int(required=True)
    title = fields.Str(required=True)
    type = fields.Str(required=True)
    country = fields.Str(required=True)
    city = fields.Str(required=True)
    year = fields.Int(required=True)
    height = fields.Float(required=True)

class StatSchema(ma.Schema):
    id = fields.Int()
    name = fields.Str()
    avg_height = fields.Float()
    max_height = fields.Float()
    min_height = fields.Float()

class YearStatSchema(ma.Schema):
    year = fields.Int()
    avg_height = fields.Float()
    max_height = fields.Float()
    min_height = fields.Float()

all_buildings_schema = AllBuildingsSchema(many=True)
stat_schema = StatSchema(many=True)
year_stat_schema = YearStatSchema(many=True)