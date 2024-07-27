import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import "./Granja.css"
import Casilla from './Casilla';
import { Button } from 'react-bootstrap';
import { useContext, useEffect, useId } from 'react';
import { CultivosContext } from '../context/CultivosContext';
import { useParams } from 'react-router-dom';


function Granja() {
  const { actualizarCultivos, cultivos } = useContext(CultivosContext);
  const urlParams = useParams();
  const ID = useId();


  useEffect(() => {
    //actualiza los cultivos e inicializa los componentes casilla
    fetchCultivos();
  }, []);

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
      console.log(response);
      actualizarCultivos(data); // Actualiza el estado con los usuarios recibidos
    } catch (error) {
      console.error('Error al solicitar cultivos:', error);
    }
  };

  function generarFilas() {
    return cultivos.map((fila) => {
      return (
        <Row key={`${ID}-${fila.pos}`}>
          {generarCultivos(fila)}
        </Row>
      );
    });
  }

  function generarCultivos(fila) {
    return fila.map(cultivo => {
      return (
        <Casilla key={`${ID}-${fila.pos}-${cultivo.pos}`}>
        </Casilla>
      );
    });
  }


  return (
    <div id="contenedor-granja-administrar">
      <h2>Administrando granja</h2>
      <div id='opciones-cultivo'>
        <Button onClick={() => agregarGranja(urlParams.id)} variant="outline-success">Cultivar</Button>
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