from app.extensions import db

class City(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column('Город', db.String(100))
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))
    buildings = db.relationship("Building", back_populates="city", cascade='all, delete')
    country = db.relationship("Country", back_populates="cities")

    def __init__(self, name, country_id):
        self.name = name
        self.country_id = country_id

    def __repr__(self):
        return f'\nid: {self.id}, Город: {self.name}, country_id: {self.country_id}'