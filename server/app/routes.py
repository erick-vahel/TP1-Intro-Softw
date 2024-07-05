from flask import Flask
from app.usuarios_routes import usuarios_bp
""" from routes.granjas import granjas_bp """

def register_blueprints(app: Flask):
    app.register_blueprint(usuarios_bp)
    """ app.register_blueprint(granjas_bp) """
