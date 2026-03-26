from .extensions import ma, db
from .models import WeaponType, RarityType, Skin, CaseType, SkinPrice


class WeaponTypeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = WeaponType
        load_instance = True
        sqla_session = db.session


class RarityTypeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = RarityType
        load_instance = True
        sqla_session = db.session


class CaseTypeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = CaseType
        load_instance = True
        sqla_session = db.session


class SkinPriceSchema(ma.SQLAlchemyAutoSchema):
    case = ma.Nested(CaseTypeSchema)

    class Meta:
        model = SkinPrice
        load_instance = True
        sqla_session = db.session


class SkinSchema(ma.SQLAlchemyAutoSchema):
    weapon = ma.Nested(WeaponTypeSchema)
    rarity = ma.Nested(RarityTypeSchema)
    prices = ma.Nested(SkinPriceSchema, many=True)

    class Meta:
        model = Skin
        load_instance = True
        sqla_session = db.session


skin_schema = SkinSchema()
skin_list_schema = SkinSchema(many=True)
weapon_schema = WeaponTypeSchema()
rarity_schema = RarityTypeSchema()
