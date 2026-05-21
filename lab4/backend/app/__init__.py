from flask import Flask
from flask_cors import CORS
from .models import db
from .routes import api
from .load_data import load_initial_data


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///skins_market.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    CORS(app)
    db.init_app(app)
    app.register_blueprint(api, url_prefix="/api")

    with app.app_context():
        db.create_all()
        load_initial_data()

    return app
