import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./Tarjeta.css"

function Tarjetas() {
  return (
    <Card className='tarjeta-granja' style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Granca 1</Card.Title>
        <Card.Text>
          Detalles:
            - creacion
            - crecimiento
            - estado
        </Card.Text>
        <Button variant="primary">Entrar</Button>
        <Button variant="danger">Eliminar</Button>
      </Card.Body>
    </Card>
  );
}

export default Tarjetas;