import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./Tarjeta.css"
import { useContext } from 'react';
import { GranjasContext } from '../context/GranjasContext';

function Tarjeta({info}) {

  const {decrementarCantGranjas} = useContext(GranjasContext);

  const eliminarGranja = async (id)=>{
    const apiUrl = `http://127.0.0.1:5000/granjas/${id}`; 
    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error en db al eliminar granja');
      }

      // Aquí puedes manejar la respuesta si es necesario
      console.log('Granja eliminada correctamente');
      decrementarCantGranjas();
    } catch (error) {
      console.error('Error al eliminar granja:', error);
    }
}

  return (
    <Card className='tarjeta-granja' style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Granja #{info.granja_id} <span id='titulo-propietario'> Propietario #{info.usuario_id} </span></Card.Title>
        <div className='detalles'>
          <ul >
            <li>Cultivos</li>
            <li>Sin cosechar</li>
            <li>Proxima cosecha</li>
          </ul>
        </div>
        <div className="botones">
          <Button disabled={true} variant="primary">Entrar</Button>
          <Button onClick={()=>eliminarGranja(info.granja_id)} variant="outline-danger">Eliminar</Button>
        </div>

      </Card.Body>
    </Card>
  );
}

export default Tarjeta;