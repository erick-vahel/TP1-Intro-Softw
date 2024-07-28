from datetime import datetime, timedelta
from sqlalchemy import Column, Integer, SmallInteger, Boolean, DateTime, ForeignKey, CheckConstraint, TIMESTAMP
from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy
from app import db


class Usuarios(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    monedas = db.Column(db.Integer, default=0)
    fecha_registro = db.Column(db.DateTime, default=datetime.utcnow)
    granjas = relationship('Granjas', back_populates='usuarios', cascade='all, delete')

    def __repr__(self):
        return f'<Usuarios {self.nombre}>'


class Granjas(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fecha_registro = db.Column(db.DateTime, default=datetime.utcnow)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id', ondelete='CASCADE'), nullable=False)
    usuarios = relationship('Usuarios', back_populates='granjas')
    cultivos = relationship('Cultivos', back_populates='granjas', cascade='all, delete')

    def __repr__(self):
        return f'<Granjas {self.id}>'



class Cultivos(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tipo_cultivo = db.Column(db.SmallInteger, CheckConstraint('tipo_cultivo >= 0 AND tipo_cultivo <= 9'))
    fecha_plantacion = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    fecha_cosecha = db.Column(db.TIMESTAMP, default=lambda: datetime.utcnow() + timedelta(minutes=3))
    cosechar = db.Column(db.Boolean, default=False)
    granja_id = db.Column(db.Integer, db.ForeignKey('granjas.id', ondelete='CASCADE'))

    # Relación con la tabla Granjas
    granjas = relationship('Granjas', back_populates='cultivos')

    def __repr__(self):
        return f'<Cultivos {self.id}>'