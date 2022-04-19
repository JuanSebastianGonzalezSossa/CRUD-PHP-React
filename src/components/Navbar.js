import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

export const Navbar = () => {
    return (
        <header className="titulares header">
            <div className="logo">Juan Gonzalez</div>
            <nav className="menu">
                <ul>
                    <li><i className="fa-solid fa-house"></i><Link to="/Inicio">Inicio</Link></li>
                    <li><i className="fa-solid fa-magnifying-glass"></i><Link to="/Consultas">Consultas</Link></li>
                    <li><i className="fa-solid fa-briefcase"></i><Link to="/Productos">Productos</Link></li>
            </ul>
        </nav>
        </header >
    )
}