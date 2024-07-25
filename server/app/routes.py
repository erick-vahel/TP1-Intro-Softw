from flask import request, jsonify
# from flask import Flask
from app import db
from app.models import Usuarios
from app.models import Granjas
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


@app.route('/granja/registro', methods=['POST'])
def registrarGranja():
    try:
        data = request.json
        param_id = data['id']
        new_entry = Granjas(usuario_id=param_id)
        db.session.add(new_entry)
        db.session.commit()
        return jsonify({'message': 'Nueva granja agregada para'+str(data['id'])}), 201
    except KeyError as e:
        db.session.rollback()
        return jsonify({'error': 'Faltan datos requeridos', 'detalles': str(e)}), 400
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Error al crear granja', 'detalles': str(e)}), 500


@app.route('/granjas', methods=['GET'])
def granjas():
    entries = Granjas.query.order_by(Granjas.fecha_registro).all()
    granjas_list = []
    target_timezone = pytz.timezone('America/Argentina/Buenos_Aires') 
    for granja in entries:
        if granja.fecha_registro:
            utc_date = granja.fecha_registro.replace(tzinfo=pytz.utc)
            localized_date = utc_date.astimezone(target_timezone)
            fecha_formateada = localized_date.strftime('%Y-%m-%d %H:%M:%S')
        else:
            fecha_formateada = None
        
        granja_data = {
            'id': granja.id,
            'fecha_registro': fecha_formateada,
            'usuario_id':granja.usuario_id
        }
        granjas_list.append(granja_data)
    return jsonify(granjas_list)



@app.route('/granjas/<int:id>', methods=['DELETE'])
def eliminar_granja(id):
    try:
        granja = Granjas.query.get(id)
        if granja:
            db.session.delete(granja)
            db.session.commit()
            return jsonify({'mensaje': 'granja eliminada correctamente'}), 200
        else:
            return jsonify({'error': 'granja no encontrada'}), 404
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Error al eliminar granja', 'detalles': str(e)}), 500



@app.route('/granjas/<int:id>', methods=['GET'])
def granjas_de_usuario(id):
    try:
        query = db.session.query(
            Usuarios.id.label('usuario_id'),
            Usuarios.nombre.label('nombre_usuario'),
            Usuarios.monedas,
            Usuarios.fecha_registro.label('fecha_registro_usuario'),
            Granjas.id.label('granja_id'),
            Granjas.fecha_registro.label('fecha_registro_granja')
        ).join(
            Granjas, Usuarios.id == Granjas.usuario_id
        ).filter(
            Usuarios.id == id
        ).all()

        if query:
            granjas = [{
                'usuario_id': row.usuario_id,
                'nombre_usuario': row.nombre_usuario,
                'monedas': row.monedas,
                'fecha_registro_usuario': row.fecha_registro_usuario,
                'granja_id': row.granja_id,
                'fecha_registro_granja': row.fecha_registro_granja
            } for row in query]
            return jsonify(granjas), 200
        else:
            return  "", 204
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Error al buscar granjas de usuario', 'detalles': str(e)}), 500




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