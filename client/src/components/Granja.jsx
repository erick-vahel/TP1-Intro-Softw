import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import "./Granja.css"
import Casilla from './Casilla';
import { Button } from 'react-bootstrap';
import { useContext, useEffect, useId, useState } from 'react';
import { CultivosContext } from '../context/CultivosContext';
import { useParams } from 'react-router-dom';


function Granja() {
  const { actualizarCultivos, cultivos } = useContext(CultivosContext);
  const urlParams = useParams();
  const ID = useId();
  const [granjaActualizada, setGranjaActualizada]= useState(false);


  useEffect(() => {
    //actualiza los cultivos e inicializa los componentes casilla
    setGranjaActualizada(false);
    fetchCultivos();
  }, [granjaActualizada]);

  const fetchCultivos = async () => {
    const apiUrl = `http://127.0.0.1:5000/granjas/${urlParams.id}/cultivos`; // Reemplaza con tu URL de API
    let data = [];
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Error al cargar cultivos');
      } else if (response.status !== 204) {
        data = await response.json();
      }
      actualizarCultivos(data); // Actualiza el estado con los usuarios recibidos
    } catch (error) {
      console.error('Error al solicitar cultivos:', error);
    }
  };


  const cultivar = (granjaId) => {
    const apiUrl = `http://127.0.0.1:5000/cultivos/registro`;
    cultivos.forEach((filaCultiv, posFila) => {
      filaCultiv.forEach(async (tipoCultivo, posCol) => {
        if (tipoCultivo!==-1) {
          try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: granjaId,
                    tipo_cultivo:tipoCultivo,
                    fila: posFila,
                    col: posCol
                })
            });
    
            if (!response.ok) {
                throw new Error('Error en solicitud al crear cultivo en '+posFila+"-"+posCol);
            }
    
            // Aquí puedes manejar la respuesta si es necesario
            console.log('Cultivo creado correctamente');
        } catch (error) {
            console.error('Error al crear cultivo:', error);
        }
        }
      });
    });
    setGranjaActualizada(true);
  }

  function generarFilas() {
    return cultivos.map((filaCultv, f) => {
      return (
        <Row key={`${ID}-${f}`}>
          {generarCultivos(filaCultv, f)}
        </Row>
      );
    });
  }

  function generarCultivos(filaCultv, f) {
    return filaCultv.map((tipoCultivo, col) => {
      return (
        <Casilla
          key={`${ID}-${f}-${col}`}
          id={`pos-${f}-${col}`}
          codigoCultivo={tipoCultivo}
        >
        </Casilla>
      );
    });
  }


  return (
    <div id="contenedor-granja-administrar">
      <h2>Administrando granja</h2>
      <div id='opciones-cultivo'>
        <Button onClick={() => cultivar(urlParams.id)} variant="outline-success">Cultivar</Button>
      </div>
      <div id="granja-interfaz">
        {generarFilas()}
        {/* <Row>
          <Casilla></Casilla>
          <Casilla></Casilla>
          <Casilla></Casilla>
        </Row>
        <Row>
          <Casilla></Casilla>
          <Casilla></Casilla>
          <Casilla></Casilla>
        </Row>
        <Row>
          <Casilla></Casilla>
          <Casilla></Casilla>
          <Casilla></Casilla>
        </Row> */}
      </div>
    </div>
  )



}


export default Granja;