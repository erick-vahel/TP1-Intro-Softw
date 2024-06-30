import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Perfiles = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const apiUrl = 'http://127.0.0.1:5000/inicio'; // Reemplaza con tu URL de API
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Error al cargar usuarios');
      }
      const data = await response.json();
      setUsers(data); // Actualiza el estado con los usuarios recibidos
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Usuarios</h2>
      <ul className="list-group">
        {users.map(user => (
          <li key={user.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4>{user.nombre}</h4>
                <p>Monedas: {user.monedas}</p>
                <p>Fecha de Registro: {user.fecha_registro}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Perfiles;
