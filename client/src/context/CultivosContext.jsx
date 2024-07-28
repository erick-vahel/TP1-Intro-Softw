import React, { createContext, useState } from 'react';

const CultivosContext = createContext();

const CultivosProvider = ({ children }) => {
  const [cultivos, setCultivos] = useState([[-1,-1,-1], [-1,-1,-1], [-1,-1,-1]]);

  function asignarCultivoEn(fila, col, tipoCultiv) {
    console.log(fila, col, tipoCultiv);
    setCultivos((prevState) => {
      const auxMatrix = [...prevState];
      auxMatrix[fila][col] = tipoCultiv
      return auxMatrix;
    });
    console.log(cultivos);
  }


  function configurarCultivos(config) {
    setCultivos((prevState) => {
      const auxMatrix = [...prevState];
      config.forEach(cultivo => {
        auxMatrix[cultivo.fila][cultivo.col] = cultivo.tipo_cultivo
      });
      return auxMatrix;
    });
  }

  /**
   * Actualiza la configuracion de cultivo
   * @param {Array<Array<Number>>} config de cultivos detectados
   */
  function actualizarCultivos(config) {
    if (config.length) {
      configurarCultivos(config);
    }
  }

  return (
    <CultivosContext.Provider
      value={{
        cultivos,
        asignarCultivoEn,
        actualizarCultivos
      }}>
      {children}
    </CultivosContext.Provider>
  );
};

export { CultivosContext, CultivosProvider };
