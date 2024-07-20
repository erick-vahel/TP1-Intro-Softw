from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app.config import Config
from dotenv import load_dotenv
import os
from flask_cors import CORS
from flask_migrate import Migrate
load_dotenv()

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)
    migrate = Migrate(app, db)
    db.init_app(app)

    with app.app_context():
        from app import routes, models
        db.create_all()

    return app
