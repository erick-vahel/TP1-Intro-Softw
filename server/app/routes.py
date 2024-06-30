from flask import request, jsonify
# from flask import Flask
from app import db
from app.models import Usuarios
# from app import create_app

from flask import current_app as app

# app = Flask(__name__)

@app.route("/")
def home():
    return """
    <html>
    <body>
    <h1>Welcome to my heroes API</h1>
    <a href="/characters">Go to all characters</a>
    </body>
    </html>
    """

@app.route('/inicio', methods=['GET', 'POST'])
def example_route():
    if request.method == 'POST':
        data = request.json
        new_entry = Usuarios(nombre=data['nombre'])
        db.session.add(new_entry)
        db.session.commit()
        return jsonify({'message': 'New entry created'}), 201

    elif request.method == 'GET':
        entries = Usuarios.query.all()
        return jsonify([{'id': entry.id, 'nombre': entry.nombre, 'monedas': entry.monedas, 'fecha_registro': entry.fecha_registro} for entry in entries]), 200
