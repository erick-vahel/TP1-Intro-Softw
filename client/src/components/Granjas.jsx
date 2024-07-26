import Tarjeta from "./Tarjeta";
import "./Granjas.css";
import { useContext, useEffect, useId, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { GranjasContext } from "../context/GranjasContext";

function Granjas() {
    const [granjasJoin, setGranjasJoin] = useState([]);
    const [nombre, setNombre] = useState('');
    const params = new URLSearchParams(location.search);
    const urlParams = useParams();
    const ID = useId();
    const { cantGranjas, incrementarCantGranjas, actualizarCantGranjas } = useContext(GranjasContext);

    useEffect(() => {
        setNombre(params.get("nombre"));
        fetchGranjas();
        console.log("act");
    }, [cantGranjas]);

    useEffect(()=>{
        actualizarCantGranjas(granjasJoin.length);
        console.log("tam actual", cantGranjas);
    },[granjasJoin]);

    const fetchGranjas = async () => {
        const apiUrl = `http://127.0.0.1:5000/granjas/${urlParams.id}`; // Reemplaza con tu URL de API
        let data = [];
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Error al cargar granjas');
            } else if (response.status !== 204) {
                data = await response.json();
            }
            console.log(response);
            setGranjasJoin(data); // Actualiza el estado con los usuarios recibidos
        } catch (error) {
            console.error('Error al solicitar granjas:', error);
        }
    };


    function generarTarjetasGranjas() {
        return granjasJoin.map(granja => {
            return <Tarjeta
                key={ID + granja.granja_id}
                info={granja} />;
        });
    }

    const agregarGranja = async (userID) => {
        const apiUrl = `http://127.0.0.1:5000/granja/registro`;
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: userID
                })
            });

            if (!response.ok) {
                throw new Error('Error en solicitud al crear granja');
            }

            // Aquí puedes manejar la respuesta si es necesario
            console.log('Granja creada correctamente');
            incrementarCantGranjas();
        } catch (error) {
            console.error('Error al crear granja:', error);
        }
    }

    return (
        <div id="tablero">
            <h2>Granjas de {nombre} #{urlParams.id}</h2>
            <div id="opciones-tablero">
                <Button onClick={() => agregarGranja(urlParams.id)} variant="outline-primary">Agregar granja</Button>
            </div>
            <div id="contenedor-granjas">
                {granjasJoin.length ? generarTarjetasGranjas() : <h3>Sin granjas</h3>}
            </div>
        </div>
    );


}


export default Granjas;