from flask import Flask
from .config import DevelopmentConfig
from .extensions import db
from app.views import main
from .query import query
from .fill_db import fill_db



def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)

    app.register_blueprint(main)
    db.init_app(app)
    app.app_context().push()

    with app.app_context():
        db.create_all()
        #fill_db("app/data/skins.csv")
        # query()


    return app


