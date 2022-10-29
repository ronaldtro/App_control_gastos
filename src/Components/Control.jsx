import React from 'react'
import { useState, useEffect } from 'react'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Control = ({setIsValidPresupuesto, setGastos, gastos, setPresupuesto, presupuesto}) => {

  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidadGasto + total, 0)
    const totalDisponible = presupuesto - totalGastado

    //Calcular porcentaje - diagrama circular
    const nuevoPorcentaje = ( ((presupuesto - totalDisponible) / presupuesto) * 100 ).toFixed(2);
    
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    },1500)

    setDisponible(totalDisponible)
    setGastado(totalGastado)

  }, [gastos]);

  const handleResetApp = () => {
    const resultado = confirm("Esta seguro de reiniciar la app?")

    if(resultado){
      setGastos([]);
      setPresupuesto(0);
      setIsValidPresupuesto(false);
    }

  }

  const formatearPresupuesto = (presupuesto) => {
    return presupuesto.toLocaleString('en-US', {style: 'currency', currency: 'USD'})
  } 

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
          <CircularProgressbar value={porcentaje} text={`${porcentaje}%`} styles={buildStyles({pathColor: porcentaje > 100 ? '#FF2D00' : '#FF7C00' , trailColor:'#FFDC00'})} />;
        </div>
        <div className='contenido-presupuesto '>
            <button className='reset-app' type="button" onClick={handleResetApp}>Resetear App</button>
            <p>
                <span>Presupuesto: </span> {formatearPresupuesto(presupuesto)}
            </p>

            <p className = {` ${disponible < 0 ? 'negativo' : ''} `} >
                <span>Disponible: </span>  {formatearPresupuesto(disponible)}
            </p>

            <p>
                <span>Gastado: </span>  {formatearPresupuesto(gastado)}
            </p>
        </div>
    </div>
  )
}

export default Control