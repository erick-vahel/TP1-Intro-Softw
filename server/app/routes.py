from flask import request, jsonify
# from flask import Flask
from app import db
from app.models import Usuarios
# from app import create_app

from flask import current_app as app

import pytz

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
        print(data)
        new_entry = Usuarios(nombre=data['nombre'])
        db.session.add(new_entry)
        db.session.commit()
        return jsonify({'message': 'New entry created'}), 201

    elif request.method == 'GET':
        entries = Usuarios.query.all()
        user_list = []
        target_timezone = pytz.timezone('America/Argentina/Buenos_Aires') 
        for user in entries:
            # Convertir y formatear la fecha de registro
            if user.fecha_registro:
                utc_date = user.fecha_registro.replace(tzinfo=pytz.utc)
                localized_date = utc_date.astimezone(target_timezone)
                fecha_formateada = localized_date.strftime('%Y-%m-%d %H:%M:%S')
            else:
                fecha_formateada = None
            
            user_data = {
                'id': user.id,
                'nombre': user.nombre,
                'monedas': user.monedas,
                'fecha_registro': fecha_formateada
            }
            user_list.append(user_data)
        
        return jsonify(user_list)
        # return jsonify([{'id': entry.id, 'nombre': entry.nombre, 'monedas': entry.monedas, 'fecha_registro': entry.fecha_registro} for entry in entries]), 200
