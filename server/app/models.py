from datetime import datetime
from app import db

class Usuarios(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    monedas = db.Column(db.Integer, default=0)
    fecha_registro = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<ExampleModel {self.name}>'

class Granjas(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    fila = db.Column(db.Integer, nullable=False)
    columna = db.Column(db.Integer, nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    usuario = db.relationship('Usuarios', backref=db.backref('granjas', lazy=True))


    def __repr__(self):
        return f'<ExampleModel {self.name}>'
