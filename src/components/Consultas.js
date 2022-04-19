import React from 'react'
import '../styles/Consultas.css'

export const Consultas = () => {
  return (
    <div className='Content'>
      <h1> Consultas que se aplican directamente a la Base de datos</h1>
      <hr></hr>
      <ol>
        <li><h2> SELECT Nombre, MAX(Stock) FROM `productos` </h2></li>
        <li><h2> SELECT id, MAX(Cant) FROM `ventas` </h2></li>
      </ol>
    </div>
  )
}
