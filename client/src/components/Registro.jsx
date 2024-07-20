import React, { useEffect, useState } from 'react';
import {useLocation, useNavigate,  useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [esActualizar, setEsActualizar] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const navigate = useNavigate();
  const urlParams = useParams();

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


  const handleUpdate = async (e) => {
    e.preventDefault();

    const apiUrl = `http://127.0.0.1:5000/perfiles/${urlParams.id}`; 
    const formData = { nombre }; 

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al modificar usuario en db');
      }

      // Aquí puedes manejar la respuesta si es necesario
      console.log('Usuario modificado correctamente');
      navigate('/perfiles');
    } catch (error) {
      console.error('Error al modificar usuario:', error);
    }
  };


  useEffect(() => {

    if (urlParams.id) {
        setEsActualizar(true);
        setNombre(params.get("nombre"));
    } 
}, [params.id]);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">{esActualizar?"Actualizando":"Crear"} Usuario</div>
            <div className="card-body">
              <form onSubmit={esActualizar?handleUpdate:handleSubmit}>
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
                <button type="submit" className="btn btn-primary">{esActualizar?"Actualizar":"Crear"} Usuario</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
