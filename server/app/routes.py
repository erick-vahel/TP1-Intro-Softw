from flask import request, jsonify
# from flask import Flask
from app import db
from app.models import Usuarios
from sqlalchemy.exc import SQLAlchemyError
# from app import create_app

from flask import current_app as app

import pytz

# app = Flask(__name__)

@app.errorhandler(404)
def not_found(error):
    return """
    <html>
    <body>
    <h1>Ruta no encontrada</h1>
    </body>
    </html>
    """


@app.route('/registro', methods=['POST'])
def registro():
    data = request.json
    new_entry = Usuarios(nombre=data['nombre'])
    db.session.add(new_entry)
    db.session.commit()
    return jsonify({'message': 'New entry created'}), 201



@app.route('/perfiles', methods=['GET'])
def perfiles():
    entries = Usuarios.query.order_by(Usuarios.fecha_registro).all()
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


@app.route('/perfiles/<int:id>', methods=['DELETE'])
def eliminar_usuario(id):
    try:
        usuario = Usuarios.query.get(id)
        if usuario:
            db.session.delete(usuario)
            db.session.commit()
            return jsonify({'mensaje': 'Usuario eliminado correctamente'}), 200
        else:
            return jsonify({'error': 'Usuario no encontrado'}), 404
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Error al eliminar usuario', 'detalles': str(e)}), 500



@app.route('/perfiles/<int:id>', methods=['PUT'])
def actualizar_usuario(id):
    try:
        usuario = Usuarios.query.get(id)
        if usuario:
            nuevo_nombre = request.json.get('nombre')
            if nuevo_nombre:
                usuario.nombre = nuevo_nombre
                db.session.commit()
                return jsonify({'mensaje': 'Nombre de usuario actualizado correctamente'}), 200
            else:
                return jsonify({'error': 'Falta el campo "nombre" en la solicitud'}), 400
        else:
            return jsonify({'error': 'Usuario no encontrado'}), 404
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Error al actualizar el nombre del usuario', 'detalles': str(e)}), 500