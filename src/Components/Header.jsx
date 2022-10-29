import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import Control from './Control'

const Header = ({setGastos, gastos, isValidPresupuesto, setIsValidPresupuesto, presupuesto, setPresupuesto}) => {

    return (
        <header>
            <h1>Planificador de gastos</h1>
            {
            isValidPresupuesto ? 
                <Control setIsValidPresupuesto={setIsValidPresupuesto} setGastos={setGastos} gastos={gastos} setPresupuesto={setPresupuesto} presupuesto={presupuesto} />
            : 
            <NuevoPresupuesto setIsValidPresupuesto={setIsValidPresupuesto} presupuesto={presupuesto} setPresupuesto={setPresupuesto} />
            }
        </header>
    )
}

export default Header