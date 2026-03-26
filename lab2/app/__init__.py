from flask import Flask
from .config import DevelopmentConfig
from .extensions import db, ma
from app.views import main
from .query import query
from .fill_db import fill_db

from app.routes.skins import skin_bp
from app.routes.aggregates import aggregate_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)

    db.init_app(app)
    ma.init_app(app)

    app.register_blueprint(main)
    app.register_blueprint(skin_bp, url_prefix='/api/v1')
    app.register_blueprint(aggregate_bp, url_prefix='/api/v1')

    app.app_context().push()

    with app.app_context():
        db.create_all()
        # fill_db("app/data/skins.csv")
        # query()

    return app