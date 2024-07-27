import './App.css'
import Navegador from './components/Navegador';
import Perfiles from './components/Perfiles';
import Registro from './components/Registro';
import Granjas from './components/Granjas';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GranjasProvider } from './context/GranjasContext';
import Granja from './components/Granja';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navegador />
        <Routes>
          <Route path="/registro" element={<Registro />} />
          {/* <Route path="/perfiles" element={<Perfiles />}/> */}
          <Route path="/registro/:id" element={<Registro />} />
          <Route path="/granjas/:id" element={
            <GranjasProvider>
              <Granjas />
            </GranjasProvider>
          } />
          <Route path="/granjas/:id/administrar" element={<Granja />} />
          <Route path="/" element={<Perfiles />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
