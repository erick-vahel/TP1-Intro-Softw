import Tarjetas from "./Tarjetas";
import "./Tablero.css";

function Tablero() {
    return (
        <div id="tablero">
            <h2>Granjas (en desarrollo)</h2>
            <div id="contenedor-granjas">
            <Tarjetas/>
            <Tarjetas/>
            </div>
        </div>
    );
}


export default Tablero;