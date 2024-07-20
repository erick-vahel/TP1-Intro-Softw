from datetime import datetime
from app import db
from sqlalchemy.orm import relationship

class Usuarios(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    monedas = db.Column(db.Integer, default=0)
    fecha_registro = db.Column(db.DateTime, default=datetime.utcnow)
    # Relación con la tabla Granjas
    granjas = relationship('Granjas', back_populates='usuarios', cascade='all, delete')

    def __repr__(self):
        return f'<Usuarios {self.nombre}>'

class Granjas(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fecha_registro = db.Column(db.DateTime, default=datetime.utcnow)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id', ondelete='CASCADE'), nullable=False)
    # Relación con la tabla Usuario
    usuarios = relationship('Usuarios', back_populates='granjas')

    def __repr__(self):
        return f'<Granjas {self.id}>'
