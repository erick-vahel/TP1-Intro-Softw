- crear entorno
    1. python -m venv venv

- inicializar
    1. source venv/bin/activate
    1. pip install -r requirements.txt
    1. deactivate

- para ingresar a db
    1. psql -U erick_db -d juego -W


- join by id

    1. `SELECT u.id AS usuario_id, u.nombre AS nombre_usuario, u.monedas, u.fecha_registro AS fecha_registro_usuario,
        g.id AS granja_id, g.fecha_registro AS fecha_registro_granja
    FROM usuarios u
    JOIN granjas g ON u.id = g.usuario_id
    WHERE u.id = 1;  -- Aquí reemplaza 1 con el id del usuario específico que quieres consultar
    `