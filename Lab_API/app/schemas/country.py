from app.models.country import Country
from app.extensions import ma, db

class CountrySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Country

country_schema = CountrySchema()
countries_schema = CountrySchema(many=True)
