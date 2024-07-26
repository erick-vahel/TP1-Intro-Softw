// context/MyContext.js
import React, { createContext, useState } from 'react';

// Crear el contexto
const GranjasContext = createContext();

// Crear el proveedor del contexto
const GranjasProvider = ({ children }) => {
    const [cantGranjas, setCantGranjas] = useState(0);

    function incrementarCantGranjas() {
        setCantGranjas((prevState) => prevState + 1);
        console.log(cantGranjas);
    }

    function decrementarCantGranjas() {
        setCantGranjas((prevState) => prevState - 1);
        console.log(cantGranjas);
    }

    /**
     * Actualiza la cantidad de granjas
     * @param {Number} cant de granjas detectadas
     */
    function actualizarCantGranjas(cant) {
        setCantGranjas(cant);
    }

    return (
        <GranjasContext.Provider
            value={{
                cantGranjas,
                incrementarCantGranjas,
                decrementarCantGranjas,
                actualizarCantGranjas
            }}>
            {children}
        </GranjasContext.Provider>
    );
};

export { GranjasContext, GranjasProvider};
