import React from 'react'
import XCerrar from '../img/cerrar.svg'
import {useState, useEffect } from 'react'
import Mensaje from './Mensaje'

const Modal = ({setEditarGasto, editarGasto, guardarGasto, setModal, animarModal, setAnimarModal}) => {

  const [nombreGasto, setNombreGasto] = useState('');
  const [cantidadGasto, setCantidadGasto] = useState('');
  const [categoriaGasto, setCategoriaGasto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [id, setId] = useState('');
  const [fecha, setFecha] = useState('');

  useEffect(()=>{
    if(Object.keys(editarGasto).length > 0){
      setNombreGasto(editarGasto.nombreGasto)
      setCantidadGasto(editarGasto.cantidadGasto)
      setCategoriaGasto(editarGasto.categoriaGasto)
      setId(editarGasto.id)
      setFecha(editarGasto.fecha)
    }
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    
    if([nombreGasto, cantidadGasto, categoriaGasto].includes('')){
      setMensaje('Hay un campo vacio!');
      setTimeout(() => {
        setMensaje('');
      },1000);
    }

    guardarGasto({nombreGasto, cantidadGasto, categoriaGasto, id, fecha});
  }

  const cerrarModal = () => {
    setAnimarModal(false);
    setEditarGasto({});
    setTimeout(() => {
      setModal(false);
    }, 500);
  }

  return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img alt="imagen-cerrar" src={XCerrar} onClick={cerrarModal} />
        </div>
        <form onSubmit={handleSubmit} className={`formulario ${ animarModal ? 'animar' : 'cerrar'} `}>
          <legend>{editarGasto.nombreGasto ? 'Editar Gasto' : 'Nuevo gasto'}</legend>
          {
            mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>
          }
          <div className="campo">
            <label htmlFor="nombre">Nombre gasto</label>
            <input id="nombre" type="text" placeholder="Añade el nombre del gasto" value={nombreGasto} onChange={e => setNombreGasto(e.target.value)}/>
          </div>
          <div className="campo">
            <label htmlFor="cantidad">Cantidad</label>
            <input id="cantidad" type="number" placeholder="Añade la cantidad del gasto: 300.." value={cantidadGasto} onChange={e => setCantidadGasto(Number(e.target.value))} />
          </div>
          <div className="campo">
            <label htmlFor="categoria">Categoria</label>
            <select name="" id="categoria" value={categoriaGasto} onChange={e => setCategoriaGasto(e.target.value)} >
              <option value="">Seleccione</option>  
              <option value="ahorro">Ahorre</option>  
              <option value="comida">Comida</option>  
              <option value="casa">Casa</option>  
              <option value="ocio">ocio</option>  
            </select>
          </div>
          <input type="submit" value={editarGasto.nombreGasto ? 'Editar Gasto' : 'Añadir gasto'}/>
        </form>
    </div>
  )
}

export default Modal