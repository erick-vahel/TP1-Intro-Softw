CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    monedas INT DEFAULT 0,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE granjas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fila INT NOT NULL,
    columna INT NOT NULL,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE
);


-- 1-zanahoria, 2-lechuga, 3-sandia
CREATE TABLE cultivo (
    id SERIAL PRIMARY KEY,
    tipo_cultivo SMALLINT CHECK (numero >= 0 AND numero <= 9),
    fecha_plantacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_cosecha TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '3 minutes')
    cosechar BOOLEAN DEFAULT FALSE
    granja_id INT REFERENCES granjas(id) ON DELETE CASCADE,
);
