from .extensions import db


class WeaponType(db.Model):
    __tablename__ = "weapons_types"

    id = db.Column(db.Integer, primary_key=True)
    weapon = db.Column(db.String(100), unique=True, nullable=False)

    skins = db.relationship(
        "Skin",
        backref="weapon",
        cascade="all, delete",
        passive_deletes=True
    )


class RarityType(db.Model):
    __tablename__ = "rarity_types"

    id = db.Column(db.Integer, primary_key=True)
    rarity = db.Column(db.String(100), unique=True, nullable=False)

    skins = db.relationship(
        "Skin",
        backref="rarity",
        cascade="all, delete",
        passive_deletes=True
    )


class Skin(db.Model):
    __tablename__ = "skins"

    id = db.Column(db.Integer, primary_key=True)
    skin = db.Column(db.String(200), nullable=False)

    weapon_id = db.Column(
        db.Integer,
        db.ForeignKey("weapons_types.id", ondelete="CASCADE"),
        nullable=False
    )

    rarity_id = db.Column(
        db.Integer,
        db.ForeignKey("rarity_types.id", ondelete="CASCADE"),
        nullable=False
    )

    prices = db.relationship(
        "SkinPrice",
        backref="skin",
        cascade="all, delete",
        passive_deletes=True
    )


class CaseType(db.Model):
    __tablename__ = "case_types"

    id = db.Column(db.Integer, primary_key=True)
    case = db.Column(db.String(200), unique=True, nullable=False)

    prices = db.relationship(
        "SkinPrice",
        backref="case",
        cascade="all, delete",
        passive_deletes=True
    )


class SkinPrice(db.Model):
    __tablename__ = "skins_prices"

    id = db.Column(db.Integer, primary_key=True)

    case_id = db.Column(
        db.Integer,
        db.ForeignKey("case_types.id", ondelete="CASCADE"),
        nullable=False
    )

    skin_id = db.Column(
        db.Integer,
        db.ForeignKey("skins.id", ondelete="CASCADE"),
        nullable=False
    )

    price = db.Column(db.Float, nullable=False)