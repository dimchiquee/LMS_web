from flask import Flask
from .config import DevelopmentConfig
from .extensions import db
from .models import Country
from .crud import create, read, update, delete, read_c, read_ci, read_b
from app.views import main
from .upload_db import country_upload, city_upload, building_upload
from .query import query

def upload_data():
    create()
    country_upload()
    city_upload()
    building_upload()

def read_data():
    read()
    read_c()
    read_ci()
    read_b()

def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)

    app.register_blueprint(main)
    db.init_app(app)
    app.app_context().push()

    with app.app_context():
        db.create_all()
        # upload_data()
        # update()
        # delete()
        # read_data()
        query()

    return app


