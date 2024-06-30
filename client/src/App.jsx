import './App.css'
import Navegador from './components/Navegador';
import Perfiles from './components/Perfiles';
import Registro from './components/Registro';
import Tablero from './components/Tablero';

function App() {

  return (
    <>
      <Navegador/>
      {/* <Tablero/> */}
      <Registro
      />
      <Perfiles></Perfiles>
    </>
  )
}

export default App
