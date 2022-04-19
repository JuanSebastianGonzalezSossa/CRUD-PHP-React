import React from 'react';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Navbar } from '../components/Navbar';
import { Home } from '../components/Home';
import { Consultas } from '../components/Consultas';
import { Productos } from '../components/Productos';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route exact path="/Inicio" element={<Home />} />
                <Route exact path="/Consultas" element={<Consultas />} />
                <Route exact path="/Productos" element={<Productos />} />
                <Route path='*' element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}