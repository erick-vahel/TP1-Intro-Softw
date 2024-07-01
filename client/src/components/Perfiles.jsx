import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Perfiles = () => {
  const [users, setUsers] = useState([]);
  const [actualizarUsuarios, setActualizarUsuarios] = useState(false);

  useEffect(() => {
    fetchUsers();
    setActualizarUsuarios(false);
  }, [actualizarUsuarios]);

  const fetchUsers = async () => {
    const apiUrl = 'http://127.0.0.1:5000/perfiles'; // Reemplaza con tu URL de API
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

  const eliminarUsuario = async (id)=>{
    const apiUrl = `http://127.0.0.1:5000/perfiles/${id}`; 
    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error en db al eliminar usuario');
      }

      // Aquí puedes manejar la respuesta si es necesario
      console.log('Usuario eliminado correctamente');
      setActualizarUsuarios(true);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
}

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
                <Link className='btn btn-primary' to={`/registro/${user.id}`}>Modificar</Link>
                <Button onClick={()=>eliminarUsuario(user.id)} variant="outline-danger">Eliminar</Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Perfiles;
