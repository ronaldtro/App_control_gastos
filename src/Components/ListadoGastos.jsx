import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({filtro, gastosFiltrados, eliminarGasto, setEditarGasto, gastos}) => {
  return (
    <div className='listado-gastos contenedor'>

        {
            filtro ?
                    <> 
                         <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos'}</h2>  
                        {
                            gastosFiltrados.map(gasto => (
                                <Gasto key={gasto.id} eliminarGasto={eliminarGasto} gasto={gasto} setEditarGasto={setEditarGasto} />
                            ))
                        }
                    </>
                
            :   (
                    <>
                        <h2>{gastos.length ? 'Gastos' : 'No hay gastos'}</h2> 
                        {
                        gastos.map(gasto => (
                            <Gasto key={gasto.id} eliminarGasto={eliminarGasto} gasto={gasto} setEditarGasto={setEditarGasto} />
                        )) 
                        }
                    </>
                )             
        }

    </div>
  )
}

export default ListadoGastos