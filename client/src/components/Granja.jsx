import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import "./Granja.css"
import Casilla from './Casilla';


function Granja() {

    return (
        <div id="contenedor-granja-administrar">
            <h2>Administrando granja</h2>
            <Container id="granja-interfaz">
                <Row>
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
                </Row>
            </Container>
        </div>
    )

}


export default Granja;