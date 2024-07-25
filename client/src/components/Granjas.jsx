import Tarjeta from "./Tarjeta";
import "./Granjas.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Granjas() {
    const [granjas, setGranjas] = useState([]);
    const [nombre, setNombre] = useState('');
    const params = new URLSearchParams(location.search);
    const urlParams = useParams();

    useEffect(() => {
        fetchGranjas();
        setNombre(params.get("nombre"));
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
            <h2>Granjas de {nombre}</h2>
            <div id="contenedor-granjas">
                {granjas.map(granja => {
                    return  <Tarjeta
                                info={granja}
                            />
                })}
            </div>
        </div>
    );
}


export default Granjas;