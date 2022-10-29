import React from 'react'
import { useState, useEffect } from 'react'

const Filtros = ({filtro, setFiltro}) => {
  return (
    <div className='filtros sombra contenedor'>
        <form action="">
            <div className="campo">
                <label htmlFor="fil">Filtrar gastos</label>
                <select value={filtro} onChange={e => setFiltro(e.target.value)} >
                    <option value="">Todas las categorias</option>  
                    <option value="ahorro">Ahorre</option>  
                    <option value="comida">Comida</option>  
                    <option value="casa">Casa</option>  
                    <option value="ocio">ocio</option>  
                </select>
            </div>
        </form>
    </div>
  )
}

export default Filtros