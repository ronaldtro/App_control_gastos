import React from 'react'
import {useState} from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({setIsValidPresupuesto, presupuesto, setPresupuesto}) => {

    const [mensaje, setMensaje] = useState('');

    const handlePresupuesto = e => {
        e.preventDefault();

        if(presupuesto<=0 ){
            setMensaje('No es un presupuesto valido');
        }else{
            setMensaje('');
            setIsValidPresupuesto(true);
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form onSubmit={handlePresupuesto} className="formulario">
                <div className="campo">
                    <label>Definir presupuesto</label>
                    <input type="number" className="nuevo-presupuesto" placeholder="Añade tu presupuesto" onChange={e => setPresupuesto(Number(e.target.value)) } value={presupuesto}/>
                </div>
                <input type="submit" value="añadir" />
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        </div>
    )
}

export default NuevoPresupuesto