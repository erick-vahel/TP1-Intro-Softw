import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./Tarjeta.css"

function Tarjeta({info}) {

  return (
    <Card className='tarjeta-granja' style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Granja #{info.id}</Card.Title>
        <div className='detalles'>
          <ul >
            <li>Cultivos</li>
            <li>Sin cosechar</li>
            <li>Proxima cosecha</li>
          </ul>
        </div>
        <div className="botones">
          <Button disabled={true} variant="primary">Entrar</Button>
          <Button disabled={true} variant="outline-danger">Eliminar</Button>
        </div>

      </Card.Body>
    </Card>
  );
}

export default Tarjeta;