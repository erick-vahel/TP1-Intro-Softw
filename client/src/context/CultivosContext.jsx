import React, { createContext, useState } from 'react';

const CultivosContext = createContext();

const CultivosProvider = ({ children }) => {
  const [cultivos, setCultivos] = useState([[1,1,1], [1,1,1], [1,1,1]]);

  function asignarCultivoEn(fila, col, tipoCultiv) {
    setCultivos((prevState) => prevState[fila][col] = tipoCultiv);
    console.log(cultivos);
  }

  /**
   * Actualiza la configuracion de cultivo
   * @param {Array<Array<Number>>} config de cultivos detectados
   */
  function actualizarCultivos(config) {
    setCultivos(config);
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
