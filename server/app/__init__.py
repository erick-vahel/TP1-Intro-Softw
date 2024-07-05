""" from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app.config import Config
from dotenv import load_dotenv
from flask_cors import CORS
from app.routes import register_blueprints """

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app.config import Config
from flask_cors import CORS
from dotenv import load_dotenv
from app.routes import register_blueprints
""" from app.extensions import db """


load_dotenv()

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    db.init_app(app)

    with app.app_context():
        from app import routes, models
        db.create_all()
        
    register_blueprints(app)
    return app
