import Tarjeta from "./Tarjeta";
import "./Granjas.css";
import { useEffect, useState } from "react";

function Granjas() {
    const [granjas, setGranjas] = useState([]);
  
    useEffect(() => {
      fetchGranjas();
    }, []);

    const fetchGranjas = async () => {
        const apiUrl = 'http://127.0.0.1:5000/granjas'; // Reemplaza con tu URL de API
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Error al cargar usuarios');
            }
            const data = await response.json();
            setGranjas(data); // Actualiza el estado con los usuarios recibidos
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
        }
    };



    return (
        <div id="tablero">
            <h2>Granjas de </h2>
            <div id="contenedor-granjas">
                <Tarjeta />
                <Tarjeta />
            </div>
        </div>
    );
}


export default Granjas;