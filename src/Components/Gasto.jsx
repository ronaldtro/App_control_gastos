import React from 'react'

import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import { formatearFecha } from '../helpers';
import icono_ahorro from '../img/icono_ahorro.svg'
import icono_casa from '../img/icono_casa.svg'
import icono_comida from '../img/icono_comida.svg'
import icono_gastos from '../img/icono_gastos.svg'
import icono_ocio from '../img/icono_ocio.svg'
import icono_salud from '../img/icono_salud.svg'
import icono_suscripciones from '../img/icono_suscripciones.svg'


const diccionarioIconos = {
    ahorro : icono_ahorro,
    comida: icono_comida,
    casa: icono_casa,
    ocio: icono_ocio,  
}

const Gasto = ({eliminarGasto, gasto, setEditarGasto}) => {

  const {nombreGasto, cantidadGasto, categoriaGasto, id, fecha} = gasto;  

  const leadingActions = () => (
    <LeadingActions>
        <SwipeAction onClick={() => {setEditarGasto(gasto)}} >
            Editar
        </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
        <SwipeAction onClick={() => {eliminarGasto(id)}} destructive={true} >
            Eliminar
        </SwipeAction>
    </TrailingActions>
  )

  return (  
    <SwipeableList>
        <SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()} >
            <div className='gasto sombra'>
                <div className='contenido-gasto'>
                <img src={diccionarioIconos[categoriaGasto]} alt="icono_gasto" onClick="dissable" />
                <div className='descripcion-gasto'>
                        <p className='fecha-gasto'>
                            <span>{formatearFecha(fecha)}</span>
                        </p>
                        <p className='categoria'>
                            {categoriaGasto}
                        </p>
                        <p className='nombre-gasto'>
                            {nombreGasto}
                        </p>
                    </div>            
                </div>
                <p className='cantidad-gasto'>
                            ${cantidadGasto}
                </p> 
            </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto