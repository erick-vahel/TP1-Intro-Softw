import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate();
  const handleNameChange = (e) => {
    setNombre(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = 'http://127.0.0.1:5000/registro'; 
    const formData = { nombre }; 

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al crear usuario');
      }

      // Aquí puedes manejar la respuesta si es necesario
      console.log('Usuario creado correctamente');
      navigate('/perfiles');
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Crear Usuario</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    value={nombre}
                    onChange={handleNameChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Crear Usuario</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
