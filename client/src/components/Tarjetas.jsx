import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./Tarjeta.css"

function Tarjetas() {
  return (
    <Card className='tarjeta-granja' style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Granja 1</Card.Title>
        <Card.Text className='detalles'>
          <ul >
            <li>Cultivos</li>
            <li>Sin cosechar</li>
            <li>Cosecha más proxima</li>
          </ul>
        </Card.Text>
        <div class="botones">
          <Button disabled={true} variant="primary">Entrar</Button>
          <Button disabled={true} variant="outline-danger">Eliminar</Button>
        </div>

      </Card.Body>
    </Card>
  );
}

export default Tarjetas;