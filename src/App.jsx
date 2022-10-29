import React from 'react'
import Header from './Components/Header';
import { useState, useEffect } from 'react';
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from './Components/Modal';
import {generarId} from './helpers';
import ListadoGastos from './Components/ListadoGastos';
import Filtros from './Components/filtros';
import { object } from 'prop-types';

const App = () => {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState( localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : [] );
  const [editarGasto, setEditarGasto] = useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if(Object.keys(editarGasto).length > 0){
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  },[editarGasto])


  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0 
    if(presupuestoLS > 0){
      setIsValidPresupuesto(true);
    }
  }, [])

  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoriaGasto === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  const handleNuevoGasto = () => {
    setEditarGasto({});
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  }

  const guardarGasto = gasto => {

    if(gasto.id){
      const gastosActualizados = gastos.map(gastoTemp => gastoTemp.id === gasto.id ? gasto : gastoTemp)
      setGastos(gastosActualizados)
      setEditarGasto({});
    }else{
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);

  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastosActualizados)
  }

  return(
    <div className={modal ? 'fijar' : ''}>
      <Header setGastos={setGastos} gastos={gastos} isValidPresupuesto={isValidPresupuesto} setIsValidPresupuesto={setIsValidPresupuesto} presupuesto={presupuesto} setPresupuesto={setPresupuesto} />
      {
        isValidPresupuesto && (
          <>
            <main>
              <Filtros filtro={filtro} setFiltro={setFiltro} />
              <ListadoGastos filtro={filtro} gastosFiltrados={gastosFiltrados} eliminarGasto={eliminarGasto} gastos={gastos} setEditarGasto={setEditarGasto} />
            </main>
            <div className='nuevo-gasto'>
              <img alt="Img-nuevo-gasto" src={IconoNuevoGasto} onClick={handleNuevoGasto} />
            </div>
          </>
        )
      }
      {
        modal && <Modal setEditarGasto={setEditarGasto} editarGasto={editarGasto} guardarGasto={guardarGasto} setModal={setModal} animarModal={animarModal} setAnimarModal={setAnimarModal} />
      }
    </div>
  )
}

export default App;