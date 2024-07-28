import "./Casilla.css"
import Button from "react-bootstrap/Button";
import { useContext, useEffect, useState } from "react";
import { CultivosContext } from "../context/CultivosContext";


const IMG_OPC_CULT_1 = "https://cdn-icons-png.flaticon.com/512/1514/1514935.png";
const IMG_OPC_CULT_2 = "https://cdn-icons-png.flaticon.com/512/424/424227.png";
const IMG_OPC_CULT_3 = "https://cdn-icons-png.freepik.com/512/6532/6532538.png";

const OPC_CULTIVOS = [
  IMG_OPC_CULT_1,
  IMG_OPC_CULT_2,
  IMG_OPC_CULT_3
]


function Casilla({codigoCultivo,id}) {
  const [opcActual, setOpcActual] = useState(0);
  const {asignarCultivoEn} = useContext(CultivosContext); 

  useEffect(()=>{
    console.log("codig cultivo detectado ", codigoCultivo);
    if (codigoCultivo!==-1) {
      setOpcActual(codigoCultivo);
    }
    console.log(opcActual);
  },[codigoCultivo]);

  /**
   * Muestra la siguiente opcion para cultivar
   * @param {HTMLButtonElement} btn casilla en la granja a modificar
   */
  function mostrarSiguiente(e) {
    const pos = id.split("-");
    console.log("opc al cambiar img", opcActual);//****REVISAR */
    opcActual<(OPC_CULTIVOS.length-1)?setOpcActual((prevState)=>++prevState):setOpcActual(0);
    console.log("opc luego cambiar img", opcActual);
    asignarCultivoEn(pos[1], pos[2], opcActual);
  }

  return (
    <>
        <Button
         onClick={mostrarSiguiente} 
         className='casilla' 
         variant=" btn-outline-warning"
         id={id}
        >
        
          <img className="cultivo-icono" src={OPC_CULTIVOS[opcActual]} alt="opc-img-cultivo" />
        </Button>
    </>
  );
}


export default Casilla;