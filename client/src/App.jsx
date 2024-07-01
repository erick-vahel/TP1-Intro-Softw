import './App.css'
import Navegador from './components/Navegador';
import Perfiles from './components/Perfiles';
import Registro from './components/Registro';
import Tablero from './components/Tablero';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navegador />
        <Routes>
          <Route path="/registro" element={<Registro />}/>
          <Route path="/perfiles" element={<Perfiles />}/>
          <Route path="/registro/:id" element={<Registro />}/>
          <Route path="/" element={<Tablero/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
